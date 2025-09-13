"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export default function SidebarBody({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { state, toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  return (
    <div className="relative">
      <main
        className={cn(
          "min-h-[100svh] mx-auto xl:max-w-5xl relative xl:flex xl:flex-row",
          state === "expanded" && !isMobile
            ? "md:w-[calc(100svw-20rem)]"
            : "md:w-[95svw]",
          isMobile && "w-full",
          className
        )}
      >
        <div
          className={cn(
            "sticky h-20 top-[45svh] xl:block hidden z-50",
            state === "expanded" ? "xl:-ml-[4svw]" : "xl:-ml-[11svw]"
          )}
        >
          <div className="flex flex-col w-10 items-center justify-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"outline"}
                    onClick={toggleSidebar}
                    size={"icon"}
                    className="shrink-0"
                  >
                    {state === "collapsed" ? (
                      <ArrowRightIcon className="size-4" />
                    ) : (
                      <ArrowLeftIcon className="size-4" />
                    )}
                    <span className="sr-only">Toggle Sidebar</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {state === "collapsed"
                    ? "Expand Sidebar"
                    : "Collapse Sidebar"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <kbd className="pointer-events-none w-fit px-1.5 text-[10px] font-medium border rounded-md bg-secondary">
              ⌘B
            </kbd>
          </div>
        </div>
        <div
          className={cn(
            "w-full",
            state === "expanded" ? "xl:ml-[4svw]" : "xl:ml-[11svw]"
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
