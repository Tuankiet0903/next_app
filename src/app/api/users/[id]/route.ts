import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

/**
 * PUT /api/users/[id]
 * Update a user's role by ID
 */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { roleName } = await req.json();
    if (!roleName) {
      return NextResponse.json({ error: "Role name required" }, { status: 400 });
    }

    const role = await prisma.role.findUnique({
      where: { name: roleName },
    });

    if (!role) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    const user = await prisma.user.update({
      where: { id },
      data: { roleId: role.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: { select: { name: true } },
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ data: user });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/users/[id]
 * Delete a user by ID
 */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
