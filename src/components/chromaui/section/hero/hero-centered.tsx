"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Heading } from "../heading/component";
import Wrapper from "../wrapper/component";

interface HeroCenteredProps {
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

export const HeroCentered = ({
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
  backgroundGradient,
  backgroundImages = [],
  padding = "lg",
  height = "screen",
  reverseOnMobile = false,
  hideContentOnMobile = false,
  hideSlotOnMobile = false,
}: HeroCenteredProps) => {
  const backgroundStyle =
    backgroundImage ? { backgroundImage: `url(${backgroundImage})` }
    : backgroundGradient ? { background: backgroundGradient }
    : {};

  const renderBackgroundImages = () => {
    return backgroundImages.map((image, index) => {
      const {
        src,
        alt,
        zIndex = -10,
        opacity = 1,
        className: imageClassName = "",
        objectPosition = "center",
        objectFit = "cover",
      } = image;

      const imageStyle = {
        opacity,
        zIndex,
      };

      return (
        <Image
          key={`bg-image-${index}`}
          src={src}
          alt={alt}
          fill
          className={cn("absolute", imageClassName)}
          style={{
            ...imageStyle,
            objectPosition,
            objectFit,
          }}
        />
      );
    });
  };

  return (
    <section
      className={cn(
        "overflow-hidden relative",
        height === "auto" && "h-auto",
        height === "screen" && "h-screen",
        height === "full" && "h-full",
        height === "fit" && "h-fit",
        backgroundImage && "bg-cover bg-center bg-no-repeat",
        backgroundGradient && "bg-gradient-to-r",
        className
      )}
      style={backgroundStyle}
    >
      {/* Background Images */}
      {renderBackgroundImages()}

      <Wrapper
        className={cn(
          "flex h-full w-full items-center justify-center",
          wrapperClassName
        )}
      >
        <div
          className={cn(
            "flex h-full w-full flex-col space-y-8 lg:space-y-12",
            className
          )}
        >
          {/* Heading Section */}
          <div
            className={cn(
              "flex flex-col justify-center order-1 pt-20 lg:pt-0",
              hideContentOnMobile && "hidden lg:block",
              headingClassName
            )}
          >
            <Heading
              title={title}
              subtitle={subtitle}
              description={description}
              badges={badges}
              metadata={metadata}
              cta={cta}
              className="w-full"
              variant="centered"
            />
          </div>

          {/* Content Section - User can pass any content */}
          {content && (
            <div
              className={cn(
                "flex items-center justify-center order-2",
                hideSlotOnMobile && "hidden lg:block",
                contentClassName
              )}
            >
              {content}
            </div>
          )}
        </div>
      </Wrapper>
    </section>
  );
};
