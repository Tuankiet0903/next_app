/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const saved = localStorage.getItem("theme") as Theme | null;
  if (saved) return saved;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Step 1: Start with null to avoid SSR/client mismatch
  const [theme, setTheme] = useState<Theme | null>(null);

  // Step 2: Determine theme on a client only
  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  // Step 3: Update DOM and localStorage when theme changes
  useEffect(() => {
    if (theme === null) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    if (!theme) return;
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Step 4: Wait until theme is known to render children
  if (theme === null) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
