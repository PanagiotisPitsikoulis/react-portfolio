import { cn } from "@/lib/utils";
import React from "react";

function Wrapper({
  className,
  children,
  fullWidth = false,
}: {
  className?: string;
  children?: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={cn(
        className,
        fullWidth && "w-full",
        !fullWidth && "mx-auto max-w-6xl px-6 lg:px-12",
      )}
    >
      {children}
    </div>
  );
}

export default Wrapper;
