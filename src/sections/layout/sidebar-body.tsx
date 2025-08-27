"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export default function SidebarBody({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { state } = useSidebar();
  return (
    <main
      className={cn(
        "min-h-[100svh]",
        state === "expanded" ? "lg:max-w-[78svw]" : "lg:max-w-[95svw]",
        className
      )}
    >
      {children}
    </main>
  );
}
