"use client";

import { useTheme } from "@/contexts/ThemeContext";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${className}`}
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      <span suppressHydrationWarning>{theme === "dark" ? "🌙" : "☀️"}</span>
    </button>
  );
}
