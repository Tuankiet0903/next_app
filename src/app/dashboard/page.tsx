"use client";

import { useSession, signOut } from "next-auth/react";
import { useTheme } from "@/contexts/ThemeContext";
import { redirect } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import HomeIcon from "@/components/HomeIcon";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const { theme, toggleTheme } = useTheme();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <nav className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <HomeIcon />
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle className="bg-indigo-700 hover:bg-indigo-800" />
            <div className="flex items-center gap-4">
              <div className="text-sm">
                Welcome, {session?.user?.name || session?.user?.email}
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-8">
        <div
          className={`p-6 rounded-lg shadow-lg ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Email:</span> {session?.user?.email}
            </p>
            <p>
              <span className="font-medium">Name:</span>{" "}
              {session?.user?.name || "Not provided"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
