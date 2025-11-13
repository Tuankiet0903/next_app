"use client";

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, getSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import HomeIcon from "@/components/HomeIcon";
import FormInput from "@/components/FormInput";
import { loginSchema, type LoginFormData } from "@/lib/schemas";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  const registered = searchParams.get("registered");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await signIn("credentials", {
        email: data.email.trim(),
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        setError("root", { message: "Invalid credentials" });
        toast.error("Invalid credentials");
        return;
      }

      // Get the updated session to check a role
      const session = await getSession();

      toast.success("Login successful!");
      router.refresh();

      // Check if there's a callbackUrl in the URL parameters
      const callbackUrl = searchParams.get("callbackUrl");
      if (callbackUrl) {
        // Redirect to the callback URL
        router.push(callbackUrl);
      } else {
        // Redirect based on a role
        if (session?.user?.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/home");
        }
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An error occurred during sign in";
      setError("root", { message });
      toast.error(message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200"
    >
      {/* Top bar with home icon */}
      <div className="p-4">
        <HomeIcon />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="w-full max-w-md space-y-8 rounded-lg p-8 shadow-lg bg-white dark:bg-gray-800 transition-colors duration-200"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center text-3xl font-bold"
              >
                Sign in to your account
              </motion.h2>
              {registered && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center text-green-600 dark:text-green-400 mt-2"
                >
                  Registration successful! Please sign in.
                </motion.p>
              )}
            </div>
            <ThemeToggle />
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {errors.root && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-md bg-red-50 dark:bg-red-900/50 p-4 text-red-600 dark:text-red-200"
              >
                {errors.root.message}
              </motion.div>
            )}

            <div className="space-y-4">
              <FormInput
                id="email"
                label="Email address"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                error={errors.email}
                {...register("email")}
              />

              <FormInput
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                error={errors.password}
                showPasswordToggle
                showPassword={showPassword}
                onPasswordToggle={() => setShowPassword(!showPassword)}
                {...register("password")}
              />
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary w-full ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </motion.div>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-center text-sm"
          >
            Don&apos;t have an account?{" "}
            <button
              onClick={() => router.push("/register")}
              className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Register here
            </button>
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
