"use client";

import { FormEvent, useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";
import HomeIcon from "@/components/HomeIcon";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const registered = searchParams.get("registered");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (response?.error) {
        setError("Invalid credentials");
        return;
      }

      router.refresh();
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred during sign in");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-200"
      style={{
        backgroundColor: theme === "dark" ? "#111827" : "#F9FAFB",
        color: theme === "dark" ? "#ffffff" : "#111827",
      }}
    >
      {/* Top bar with home icon */}
      <div className="p-4">
        <HomeIcon />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center">
        <div
          className="w-full max-w-md space-y-8 rounded-lg p-8 shadow-lg transition-colors duration-200"
          style={{
            backgroundColor: theme === "dark" ? "#1F2937" : "#ffffff",
          }}
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1">
              <h2 className="text-center text-3xl font-bold">
                Sign in to your account
              </h2>
              {registered && (
                <p className="text-center text-green-600 dark:text-green-400 mt-2">
                  Registration successful! Please sign in.
                </p>
              )}
            </div>
            <ThemeToggle />
          </div>

          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 dark:bg-red-900/50 p-4 text-red-600 dark:text-red-200">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input-field bg-transparent dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="input-field pr-10 bg-transparent dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`btn-primary w-full ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => router.push("/register")}
              className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
