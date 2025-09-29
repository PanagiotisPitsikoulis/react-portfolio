import { cn } from "@/lib/utils";
import React from "react";
import { HeadingVariants } from "../heading";
import Wrapper from "../wrapper/component";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  fullWidthChildren?: boolean;

  // Background variants
  variant?: "default" | "secondary" | "background" | "muted" | "card";

  // Spacing
  padding?: "none" | "sm" | "md" | "lg" | "xl";

  // Heading configuration
  heading?: {
    title: string;
    variant?: "simple" | "large" | "display" | "highlighted";
    highlightText?: string;
    highlightClassName?: string;
    className?: string;
  };

  // Layout options
  fullWidth?: boolean;
}

const backgroundVariants = {
  default: "",
  secondary: "bg-secondary dark:bg-background",
  background: "bg-background",
  muted: "bg-muted",
  card: "bg-card",
};

const paddingVariants = {
  none: "",
  sm: "py-8",
  md: "py-12",
  lg: "py-24",
  xl: "py-32",
};

export const Section = ({
  children,
  className = "",
  wrapperClassName = "",
  variant = "default",
  padding = "xl",
  heading,
  fullWidth = false,
  fullWidthChildren,
}: SectionProps) => {
  return (
    <section
      className={cn(
        backgroundVariants[variant],
        paddingVariants[padding],
        className,
      )}
    >
      <Wrapper fullWidth={fullWidth} className={wrapperClassName}>
        {heading && (
          <HeadingVariants
            variant={heading.variant || "simple"}
            className={heading.className}
            {...(heading.variant === "highlighted" && {
              highlightText: heading.highlightText,
              highlightClassName: heading.highlightClassName,
            })}
          >
            {heading.title}
          </HeadingVariants>
        )}
      </Wrapper>
      {fullWidthChildren ? (
        children
      ) : (
        <Wrapper fullWidth={fullWidth} className={wrapperClassName}>
          {children}
        </Wrapper>
      )}
    </section>
  );
};
