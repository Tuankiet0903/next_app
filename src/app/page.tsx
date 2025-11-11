"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  useTheme();

  useEffect(() => {
    if (session) {
      // Check if there's a callbackUrl in the URL parameters
      const callbackUrl = searchParams.get("callbackUrl");
      if (callbackUrl) {
        // Redirect to the callback URL
        router.push(callbackUrl);
      } else {
        // Default redirect to dashboard
        router.push("/dashboard");
      }
    }
  }, [session, router, searchParams]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">
            Welcome to Next.js Authentication
          </h1>
          <p className="text-xl mb-8">
            Secure your application with NextAuth.js and enjoy a seamless
            authentication experience.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => router.push("/login")}
              className="btn-primary"
            >
              Log In
            </button>
            <button
              onClick={() => router.push("/register")}
              className="btn-primary bg-green-600 hover:bg-green-700"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
