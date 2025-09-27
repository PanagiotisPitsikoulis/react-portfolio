"use client";

import React from "react";
import { HeroCentered } from "./hero-centered";
import { HeroRight } from "./hero-right";
import { HeroSplit } from "./hero-split";

type Variant =
  | "heading-left-content-right"
  | "heading-center-content-below"
  | "heading-right-content-left";

interface HeroProps {
  // Content
  title: string;
  subtitle?: string;
  description?: string;

  // Heading props (passed to internal Heading component)
  badges?: Array<{
    label: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
    className?: string;
  }>;
  metadata?: Array<{
    label?: string;
    value?: string;
    className?: string;
  }>;
  cta?:
    | {
        label: string;
        href: string;
        external?: boolean;
        variant?:
          | "default"
          | "destructive"
          | "outline"
          | "secondary"
          | "ghost"
          | "link";
        size?: "default" | "sm" | "lg" | "icon";
        className?: string;
      }
    | Array<{
        label: string;
        href: string;
        external?: boolean;
        variant?:
          | "default"
          | "destructive"
          | "outline"
          | "secondary"
          | "ghost"
          | "link";
        size?: "default" | "sm" | "lg" | "icon";
        className?: string;
      }>;

  // Layout
  variant?: Variant;

  // Content slot - user can pass any component
  content?: React.ReactNode;

  // Styling
  className?: string;
  wrapperClassName?: string;
  contentClassName?: string;
  headingClassName?: string;

  // Background
  backgroundImage?: string;
  backgroundGradient?: string;
  backgroundImages?: Array<{
    src: string;
    alt: string;
    zIndex?: number;
    opacity?: number;
    className?: string;
    objectPosition?: string;
    objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  }>;

  // Spacing
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  height?: "auto" | "screen" | "full" | "fit";

  // Responsive behavior
  reverseOnMobile?: boolean;
  hideContentOnMobile?: boolean;
  hideSlotOnMobile?: boolean;
}

// Common props interface for all hero variants
interface CommonHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  badges?: Array<{
    label: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
    className?: string;
  }>;
  metadata?: Array<{
    label?: string;
    value?: string;
    className?: string;
  }>;
  cta?:
    | {
        label: string;
        href: string;
        external?: boolean;
        variant?:
          | "default"
          | "destructive"
          | "outline"
          | "secondary"
          | "ghost"
          | "link";
        size?: "default" | "sm" | "lg" | "icon";
        className?: string;
      }
    | Array<{
        label: string;
        href: string;
        external?: boolean;
        variant?:
          | "default"
          | "destructive"
          | "outline"
          | "secondary"
          | "ghost"
          | "link";
        size?: "default" | "sm" | "lg" | "icon";
        className?: string;
      }>;
  content?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  contentClassName?: string;
  headingClassName?: string;
  backgroundImage?: string;
  backgroundGradient?: string;
  backgroundImages?: Array<{
    src: string;
    alt: string;
    zIndex?: number;
    opacity?: number;
    className?: string;
    objectPosition?: string;
    objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  }>;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  height?: "auto" | "screen" | "full" | "fit";
  reverseOnMobile?: boolean;
  hideContentOnMobile?: boolean;
  hideSlotOnMobile?: boolean;
}

export const Hero = ({
  variant = "heading-left-content-right",
  ...props
}: HeroProps) => {
  const commonProps: CommonHeroProps = {
    title: props.title,
    subtitle: props.subtitle,
    description: props.description,
    badges: props.badges,
    metadata: props.metadata,
    cta: props.cta,
    content: props.content,
    className: props.className,
    wrapperClassName: props.wrapperClassName,
    contentClassName: props.contentClassName,
    headingClassName: props.headingClassName,
    backgroundImage: props.backgroundImage,
    backgroundGradient: props.backgroundGradient,
    backgroundImages: props.backgroundImages,
    padding: props.padding,
    height: props.height,
    reverseOnMobile: props.reverseOnMobile,
    hideContentOnMobile: props.hideContentOnMobile,
    hideSlotOnMobile: props.hideSlotOnMobile,
  };

  switch (variant) {
    case "heading-left-content-right":
      return <HeroSplit {...commonProps} />;
    case "heading-center-content-below":
      return <HeroCentered {...commonProps} />;
    case "heading-right-content-left":
      return <HeroRight {...commonProps} />;
    default:
      return <HeroSplit {...commonProps} />;
  }
};
