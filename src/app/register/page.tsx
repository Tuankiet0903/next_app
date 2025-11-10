"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { axiosInstance } from "@/lib/axios";
import ThemeToggle from "@/components/ThemeToggle";
import HomeIcon from "@/components/HomeIcon";
import FormInput from "@/components/FormInput";
import { registerSchema, type RegisterFormData } from "@/lib/schemas";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { data: response } = await axiosInstance.post("/api/register", {
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (response) {
        toast.success("Account created successfully!");
        router.push("/login?registered=true");
      }
    } catch (err: unknown) {
      let message = "An error occurred during registration";

      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as { response?: { data?: { error?: string } } };
        if (axiosError.response?.data?.error) {
          message = axiosError.response.data.error;
        }
      } else if (err instanceof Error) {
        message = err.message;
      }

      setError("root", { message });
      toast.error(message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
    >
      {/* Header with home icon */}
      <div className="p-4">
        <HomeIcon />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="max-w-md w-full mx-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
        >
          {/* Header + Theme toggle */}
          <div className="flex justify-between items-center mb-6">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold"
            >
              Create an Account
            </motion.h2>
            <ThemeToggle />
          </div>

          {/* Registration form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              id="name"
              label="Name"
              type="text"
              placeholder="Enter your name"
              error={errors.name}
              {...register("name")}
            />

            <FormInput
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              error={errors.email}
              {...register("email")}
            />

            <FormInput
              id="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              placeholder="Choose a password"
              error={errors.password}
              showPasswordToggle
              showPassword={showPassword}
              onPasswordToggle={() => setShowPassword(!showPassword)}
              {...register("password")}
            />

            {/* Error message */}
            {errors.root && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-500 text-sm text-center"
              >
                {errors.root.message}
              </motion.div>
            )}

            {/* Submit button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-indigo-600 text-white rounded-md py-2 font-medium hover:bg-indigo-700 transition ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Creating account..." : "Register"}
              </button>
            </motion.div>
          </form>

          {/* Redirect link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-center text-sm"
          >
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Sign in
            </button>
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
