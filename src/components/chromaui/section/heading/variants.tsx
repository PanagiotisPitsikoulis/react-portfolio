import { cn } from "@/lib/utils";
import React from "react";

interface BaseHeadingProps {
  className?: string;
  children: React.ReactNode;
}

interface HighlightedHeadingProps extends BaseHeadingProps {
  variant: "highlighted";
  highlightText?: string;
  highlightClassName?: string;
}

interface SimpleHeadingProps extends BaseHeadingProps {
  variant: "simple";
}

interface LargeHeadingProps extends BaseHeadingProps {
  variant: "large";
}

interface DisplayHeadingProps extends BaseHeadingProps {
  variant: "display";
}

type HeadingVariantProps =
  | HighlightedHeadingProps
  | SimpleHeadingProps
  | LargeHeadingProps
  | DisplayHeadingProps;

const HighlightedHeading = ({
  children,
  className,
  highlightText,
  highlightClassName,
}: Omit<HighlightedHeadingProps, "variant">) => {
  const renderContent = () => {
    if (typeof children === "string" && highlightText) {
      const parts = children.split(highlightText);
      if (parts.length === 2) {
        return (
          <>
            {parts[0]}
            <span
              className={cn("text-muted-foreground/50", highlightClassName)}
            >
              {highlightText}
            </span>
            {parts[1]}
          </>
        );
      }
    }
    return children;
  };

  return (
    <h1
      className={cn(
        "text-foreground mb-12 text-4xl font-medium tracking-tighter md:text-6xl",
        className,
      )}
    >
      {renderContent()}
    </h1>
  );
};

const SimpleHeading = ({
  children,
  className,
}: Omit<SimpleHeadingProps, "variant">) => (
  <h1
    className={cn(
      "text-foreground text-2xl font-semibold tracking-tight",
      className,
    )}
  >
    {children}
  </h1>
);

const LargeHeading = ({
  children,
  className,
}: Omit<LargeHeadingProps, "variant">) => (
  <h1
    className={cn(
      "text-foreground text-3xl font-bold tracking-tight md:text-4xl",
      className,
    )}
  >
    {children}
  </h1>
);

const DisplayHeading = ({
  children,
  className,
}: Omit<DisplayHeadingProps, "variant">) => (
  <h1
    className={cn(
      "text-foreground text-5xl font-bold tracking-tighter md:text-7xl lg:text-8xl",
      className,
    )}
  >
    {children}
  </h1>
);

export const HeadingVariants = (props: HeadingVariantProps) => {
  switch (props.variant) {
    case "highlighted":
      return (
        <HighlightedHeading
          className={props.className}
          highlightText={props.highlightText}
          highlightClassName={props.highlightClassName}
        >
          {props.children}
        </HighlightedHeading>
      );
    case "simple":
      return (
        <SimpleHeading className={props.className}>
          {props.children}
        </SimpleHeading>
      );
    case "large":
      return (
        <LargeHeading className={props.className}>
          {props.children}
        </LargeHeading>
      );
    case "display":
      return (
        <DisplayHeading className={props.className}>
          {props.children}
        </DisplayHeading>
      );
  }
};
