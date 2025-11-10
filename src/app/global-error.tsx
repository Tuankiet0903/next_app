"use client";

import { useEffect } from "react";
import HomeIcon from "@/components/HomeIcon";
import ThemeToggle from "@/components/ThemeToggle";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
          {/* Top bar with home icon */}
          <div className="p-4">
            <HomeIcon />
          </div>

          {/* Main content */}
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="w-full max-w-md space-y-8 text-center">
              {/* Error icon */}
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
              </div>

              {/* Error message */}
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Critical Error
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  A critical error occurred in the application. This is usually
                  a server-side issue.
                </p>

                {process.env.NODE_ENV === "development" && (
                  <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
                    <h3 className="font-semibold text-sm mb-2">
                      Error Details (Development):
                    </h3>
                    <p className="text-sm font-mono text-red-600 dark:text-red-400 break-all">
                      {error.message}
                    </p>
                    {error.digest && (
                      <p className="text-sm font-mono text-gray-500 dark:text-gray-500 mt-1">
                        Digest: {error.digest}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button onClick={reset} className="btn-primary px-6 py-3">
                    Try Again
                  </button>
                  <button
                    onClick={() => (window.location.href = "/")}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Go Home
                  </button>
                </div>

                <div className="flex justify-center">
                  <ThemeToggle />
                </div>
              </div>

              {/* Additional help */}
              <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  If this problem persists, please contact support or try
                  refreshing the page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
