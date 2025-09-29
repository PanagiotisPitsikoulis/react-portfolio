"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { BackgroundSection } from "../background";
import { Heading } from "../heading/component";
import Wrapper from "../wrapper/component";

interface HeroSplitProps {
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

  // Content slot - user can pass any component
  content?: React.ReactNode;

  // Styling
  className?: string;
  wrapperClassName?: string;
  contentClassName?: string;
  headingClassName?: string;

  // Background
  backgroundImage?: string;
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

  // Parallax
  enableParallax?: boolean;
  parallaxContainer?: boolean;

  // Spacing
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  height?: "auto" | "screen" | "full" | "fit";
}

export const HeroSplit = ({
  title,
  subtitle,
  description,
  badges,
  metadata,
  cta,
  content,
  className = "",
  wrapperClassName = "",
  contentClassName = "",
  headingClassName = "",
  backgroundImage,
  backgroundImages = [],
  enableParallax = false,
  parallaxContainer = false,
}: HeroSplitProps) => {
  return (
    <BackgroundSection
      className={cn("lg:h-svh", content ? "h-[150svh]" : "h-svh", className)}
      backgroundImage={backgroundImage}
      backgroundImages={backgroundImages}
      enableParallax={enableParallax}
      parallaxContainer={parallaxContainer}
    >
      <Wrapper
        className={cn(
          "flex h-full w-full items-center justify-center",
          wrapperClassName,
        )}
      >
        <div
          className={cn(
            "flex h-full w-full flex-col lg:flex-row overflow-hidden gap-8 lg:gap-[5svw]",
          )}
        >
          {/* Heading Section */}
          <div
            className={cn(
              "flex flex-col justify-end pt-24 lg:pt-0 lg:pb-20",
              headingClassName,
            )}
          >
            <Heading
              title={title}
              subtitle={subtitle}
              description={description}
              badges={badges}
              metadata={metadata}
              cta={cta}
              className="w-full max-w-lg bg-background p-6 rounded-2xl shadow relative z-10"
            />
          </div>
          {/* Content Section - User can pass any content */}
          {content && (
            <div
              className={cn(
                "flex items-center justify-center w-full lg:w-auto flex-1",
                contentClassName,
              )}
            >
              {content}
            </div>
          )}
        </div>
      </Wrapper>
    </BackgroundSection>
  );
};
