import { cn } from "@/lib/utils";

export const DottedDiv = ({
  children,
  className,
  hideTopLines = false,
}: {
  children: React.ReactNode;
  className?: string;
  hideTopLines?: boolean;
}) => (
  <div className={cn("relative p-10", className)}>
    <div className="-left-25 bg-muted absolute top-4 h-[1.5px] w-[115%]" />
    <div className="-left-25 bg-muted absolute bottom-4 h-[1.5px] w-[115%]" />
    <div
      className={cn(
        "-top-25 bg-muted absolute left-4 h-[130%] w-[1.5px]",
        hideTopLines && "top-0 h-[110%]",
      )}
    />
    <div
      className={cn(
        "-top-25 bg-muted absolute right-4 h-[130%] w-[1.5px]",
        hideTopLines && "top-0 h-[110%]",
      )}
    />
    <div className="bg-foreground absolute left-[12.5px] top-[12.5px] z-10 size-2 rounded-full" />
    <div className="bg-foreground absolute right-[12.5px] top-[12.5px] z-10 size-2 rounded-full" />
    <div className="bg-foreground absolute bottom-[12.5px] left-[12.5px] z-10 size-2 rounded-full" />
    <div className="bg-foreground absolute bottom-[12.5px] right-[12.5px] z-10 size-2 rounded-full" />
    {children}
  </div>
);
DottedDiv;
