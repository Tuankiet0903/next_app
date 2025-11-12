import { Metadata } from "next";
import Link from "next/link";
import HomeIcon from "@/components/HomeIcon";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      {/* Top bar with home icon */}
      <div className="p-4">
        <HomeIcon />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8 text-center">
          {/* 404 icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-.966-5.618-2.479C5.668 11.592 5 10.397 5 9s.668-2.592 1.382-3.521C7.71 3.966 9.66 3 12 3s4.29.966 5.618 2.479C18.332 6.408 19 7.603 19 9s-.668 2.592-1.382 3.521z"
                />
              </svg>
            </div>
          </div>

          {/* Error message */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
              Page Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. The
              page might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/" className="btn-primary px-6 py-3 text-center">
                Go to LandingPage
              </Link>
              <Link
                href="/home"
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-center"
              >
                Go to Home
              </Link>
            </div>

            <div className="flex justify-center">
              <ThemeToggle />
            </div>
          </div>

          {/* Additional help */}
          <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              If you believe this is an error, please contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
