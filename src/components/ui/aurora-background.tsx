import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-zinc-900",
          className
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              "--aurora":
                "repeating-linear-gradient(100deg,#000_10%,#666_15%,#ccc_20%,#fff_25%,#333_30%)",
              "--dark-gradient":
                "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
              "--white-gradient":
                "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",

              "--gray-200": "#ccc",
              "--gray-400": "#666",
              "--gray-800": "#333",
              "--black": "#000",
              "--white": "#fff",
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              `after:animate-aurora-background pointer-events-none absolute -inset-[10px] opacity-50 blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--black)_10%,var(--gray-400)_15%,var(--gray-200)_20%,var(--white)_25%,var(--gray-800)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] [background-image:var(--white-gradient),var(--aurora)] [background-position:50%_50%,50%_50%] [background-size:300%,_200%] after:absolute after:inset-0 after:mix-blend-difference after:content-[""] after:[background-attachment:fixed] after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] dark:invert-0 dark:[background-image:var(--dark-gradient),var(--aurora)] after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,

              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
