import { cn } from "@/lib/utils";

interface DividerProps {
  label?: string;
  className?: string;
}

export const Divider = ({ label, className = "" }: DividerProps) => {
  return (
    <div className={cn("relative my-8", className)}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border" />
      </div>
      {label && (
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-2 text-muted-foreground">
            {label}
          </span>
        </div>
      )}
    </div>
  );
};
