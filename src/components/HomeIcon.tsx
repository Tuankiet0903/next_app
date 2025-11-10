"use client";

import { useRouter } from "next/navigation";

interface HomeIconProps {
  className?: string;
}

export default function HomeIcon({ className = "" }: HomeIconProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      className={`flex items-center gap-2 hover:opacity-80 transition-opacity ${className}`}
      aria-label="Go to home"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
      <span className="font-bold text-xl">MCP</span>
    </button>
  );
}
