import { cn } from "@/lib/utils";
import { ScreenShare } from "lucide-react";

export interface AppIconProps {
  className?: string;
  iconClassName?: string;
}

export function AppIcon({ className, iconClassName }: AppIconProps) {
  return (
    <div
      className={cn(
        "bg-black dark:bg-white text-white dark:text-black flex aspect-square size-8 items-center justify-center rounded-full",
        className
      )}
    >
      <ScreenShare className={cn("size-4", iconClassName)} />
    </div>
  );
}
