import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Checking and seeding default data...');

  // Check and create an admin role if not exists
  let adminRole = await prisma.role.findUnique({
    where: { name: 'admin' },
  });

  if (!adminRole) {
    adminRole = await prisma.role.create({
      data: { name: 'admin' },
    });
    console.log('Admin role created');
  } else {
    console.log('Admin role already exists');
  }

  // Check and create a user role if not exists
  const userRole = await prisma.role.findUnique({
    where: { name: 'user' },
  });

  if (!userRole) {
    await prisma.role.create({
      data: { name: 'user' },
    });
    console.log('User role created');
  } else {
    console.log('User role already exists');
  }

  // Check and create default admin if not exists
  const adminEmail = 'admin@admin.com';
  const adminPassword = 'admin123'; // Change this in production

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Admin',
        roleId: adminRole.id,
      },
    });
    console.log('Default admin created');
  } else {
    console.log('Admin already exists');
  }

  console.log('Seeding completed successfully');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
