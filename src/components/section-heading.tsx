import { cn } from "@/lib/utils";

export default function SectionHeading({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode[];
}) {
  return (
    <div className={cn(className)}>
      <h1 className="text-foreground mt-12 text-4xl font-medium tracking-tight lg:text-7xl">
        {children?.[0]}
      </h1>
      <h2 className="text-muted-foreground/90 mt-6 max-w-lg text-xl lg:text-3xl">
        {children?.[1]}
      </h2>
    </div>
  );
}
