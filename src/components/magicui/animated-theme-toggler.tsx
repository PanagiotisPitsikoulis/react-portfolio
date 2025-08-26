"use client";

import { cn } from "@/lib/utils";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Moon, SunDim } from "lucide-react";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type props = {
  className?: string;
};

export const AnimatedThemeToggler = ({ className }: props) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const changeTheme = async () => {
    if (!buttonRef.current) return;

    await document.startViewTransition(() => {
      flushSync(() => {
        const dark = document.documentElement.classList.toggle("dark");
        setIsDarkMode(dark);
      });
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const y = top + height / 2;
    const x = left + width / 2;

    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            ref={buttonRef}
            onClick={changeTheme}
            variant={"outline"}
            size={"icon"}
            aria-label="Toggle theme"
            className={cn(
              className,
              "bg-sidebar dark:bg-sidebar dark:hover:bg-sidebar"
            )}
          >
            {isDarkMode ? (
              <SunDim className="size-4 text-muted-foreground hover:text-foreground" />
            ) : (
              <Moon className="size-4 text-muted-foreground hover:text-foreground" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isDarkMode ? "Change to Light mode" : "Change to Dark mode"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
