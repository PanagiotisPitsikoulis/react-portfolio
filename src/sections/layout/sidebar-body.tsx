"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export default function SidebarBody({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { state } = useSidebar();
  const isMobile = useIsMobile();
  return (
    <main
      className={cn(
        "min-h-[100svh] mx-auto",
        state === "expanded" && !isMobile
          ? "md:w-[calc(100svw-20rem)]"
          : "md:w-[95svw]",
        isMobile && "w-full",
        className
      )}
    >
      {children}
    </main>
  );
}
