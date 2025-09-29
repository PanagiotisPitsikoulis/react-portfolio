"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  showText?: boolean;
}

export function ThemeToggle({
  className,
  variant = "secondary",
  size = "icon",
  showText = false,
}: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  if (!mounted) {
    return (
      <Button
        variant={variant}
        size={size}
        aria-label="Switch theme"
        className={cn("gap-2", className)}
        disabled
      >
        <Sun className="h-4 w-4" />
        {showText && size !== "icon" && "Light"}
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
      className={cn("gap-2", className)}
    >
      {isDark ? (
        <>
          <Moon className="h-4 w-4" />
          {showText && size !== "icon" && "Dark"}
        </>
      ) : (
        <>
          <Sun className="h-4 w-4" />
          {showText && size !== "icon" && "Light"}
        </>
      )}
    </Button>
  );
}
