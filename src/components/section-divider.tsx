import { cn } from "@/lib/utils";

export interface SectionDividerProps {
  label?: string;
  className?: string;
}

export function SectionDivider({ label, className }: SectionDividerProps) {
  return (
    <div className={cn("my-6", className)}>
      <div className="flex items-center gap-3 text-muted-foreground">
        <div className="h-px flex-1 bg-border" />
        {label && (
          <span className="text-xs uppercase tracking-wide">{label}</span>
        )}
        {label && <div className="h-px flex-1 bg-border" />}
      </div>
    </div>
  );
}
