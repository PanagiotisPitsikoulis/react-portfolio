import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-offset-1 ring-offset-background aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/30 shadow-sm hover:shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/30 shadow-sm hover:shadow-md",
        outline:
          "bg-background text-foreground hover:bg-primary/5 shadow-sm hover:shadow-md",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-md",
        tertiary: "text-primary hover:bg-primary/10",
        ghost:
          "text-muted-foreground hover:text-foreground hover:bg-primary/5 focus-visible:ring-primary/20",
        link: "text-primary underline-offset-4 hover:underline decoration-primary/40",
      },
      size: {
        default: "py-2.5 px-6 has-[>svg]:px-5",
        sm: "py-2 px-4 gap-1.5 has-[>svg]:px-3.5",
        lg: "py-3 px-7 has-[>svg]:px-6",
        icon: "size-10",
      },
      radius: {
        pill: "rounded-full",
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "pill",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
