"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label={`Switch to ${nextTheme} mode`}
        onClick={() => setTheme(nextTheme)}
        className={cn(
          "text-xs hover:text-primary-foreground hover:underline underline-offset-4",
          className
        )}
      >
        Light Mode
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={`Switch to ${nextTheme} mode`}
      onClick={() => setTheme(nextTheme)}
      className={cn(
        "text-xs hover:text-primary-foreground hover:underline underline-offset-4",
        className
      )}
    >
      {isDark ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
