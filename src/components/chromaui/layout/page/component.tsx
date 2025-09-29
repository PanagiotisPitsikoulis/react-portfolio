import { cn } from "@/lib/utils";

export function Page({
  children,
  hero,
  isHeroDark = false,
  className,
  heroClassName,
  contentClassName,
}: {
  children?: React.ReactNode;
  hero?: React.ReactNode;
  isHeroFullScreen?: boolean;
  isHeroDark?: boolean;
  className?: string;
  heroClassName?: string;
  contentClassName?: string;
}) {
  return (
    <section className={cn("min-h-svh", className)}>
      {hero && (
        <section
          aria-label="Hero Section"
          className={cn(isHeroDark && "dark", "min-h-svh", heroClassName)}
        >
          {hero}
        </section>
      )}
      {children && (
        <section
          aria-label="Content Section"
          className={cn(
            "min-h-svh bg-secondary dark:bg-background",
            contentClassName,
          )}
        >
          {children}
        </section>
      )}
    </section>
  );
}
