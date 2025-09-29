"use client";

import React from "react";
import { HeroSplit } from "./hero-split";

type Variant =
  | "heading-left-content-right"
  | "heading-center-content-below"
  | "heading-right-content-left";

interface HeroProps {
  className?: string;
  title: string;
  subtitle?: string;
  badges?: Array<{
    label: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  }>;
  metadata?: Array<{
    label?: string;
    value?: string;
  }>;
  cta?: {
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
  };
  variant?: Variant;
  content?: React.ReactNode;
  backgroundImages?: Array<{
    src: string;
    alt: string;
    zIndex?: number;
    opacity?: number;
    className?: string;
    objectPosition?: string;
    objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
    parallax?: {
      enabled?: boolean;
      speed?: number;
      direction?: "up" | "down" | "left" | "right";
      scale?: boolean;
      scaleRange?: [number, number];
      yRange?: [string, string];
      xRange?: [string, string];
    };
  }>;
  enableParallax?: boolean;
  parallaxContainer?: boolean;
}

// Common props interface for all hero variants
export interface CommonHeroProps {
  className?: string;
  title: string;
  subtitle?: string;
  badges?: Array<{
    label: string;
  }>;
  metadata?: Array<{
    label?: string;
    value?: string;
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
  backgroundImages?: Array<{
    src: string;
    alt: string;
    zIndex?: number;
    opacity?: number;
    className?: string;
    objectPosition?: string;
    objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
    parallax?: {
      enabled?: boolean;
      speed?: number;
      direction?: "up" | "down" | "left" | "right";
      scale?: boolean;
      scaleRange?: [number, number];
      yRange?: [string, string];
      xRange?: [string, string];
    };
  }>;
  enableParallax?: boolean;
  parallaxContainer?: boolean;
}

export const Hero = ({
  variant = "heading-left-content-right",
  ...props
}: HeroProps) => {
  const commonProps: CommonHeroProps = {
    className: props.className,
    title: props.title,
    subtitle: props.subtitle,
    badges: props.badges,
    metadata: props.metadata,
    cta: props.cta,
    content: props.content,
    backgroundImages: props.backgroundImages,
    enableParallax: props.enableParallax,
    parallaxContainer: props.parallaxContainer,
  };

  return (
    <div className="relative">
      <div className="object-cover absolute -z-40 bg-background w-full h-[150svh] lg:h-svh" />
      <HeroSplit {...commonProps} />
    </div>
  );
};
