"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";

interface BackgroundImage {
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
}

interface BackgroundSectionProps {
  children: React.ReactNode;
  className?: string;
  backgroundImage?: string;
  backgroundImages?: BackgroundImage[];
  enableParallax?: boolean;
  parallaxContainer?: boolean;
}

export const BackgroundSection = ({
  children,
  className = "",
  backgroundImage,
  backgroundImages = [],
  enableParallax = false,
  parallaxContainer = false,
}: BackgroundSectionProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Always create container transform hook
  const containerY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const backgroundStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};

  const ContentWrapper =
    parallaxContainer && enableParallax ? motion.div : "div";
  const containerParallax =
    parallaxContainer && enableParallax ? { style: { y: containerY } } : {};

  return (
    <section
      ref={containerRef}
      className={cn(
        "overflow-hidden relative",
        backgroundImage && "bg-cover bg-center bg-no-repeat",
        className,
      )}
      style={backgroundStyle}
    >
      {/* Background Images */}
      {backgroundImages.map((image, index) => {
        const {
          src,
          alt,
          zIndex = -10,
          opacity,
          className: imageClassName = "",
          objectPosition = "center",
          objectFit = "cover",
          parallax,
        } = image;

        const baseImageStyle = {
          zIndex,
          ...(opacity !== undefined && { opacity }),
          objectPosition,
          objectFit,
        };

        // Create individual parallax component for each image
        if (enableParallax && parallax?.enabled) {
          return (
            <ParallaxImage
              key={`bg-image-${index}`}
              src={src}
              alt={alt}
              scrollYProgress={scrollYProgress}
              parallax={parallax}
              imageClassName={imageClassName}
              baseImageStyle={baseImageStyle}
            />
          );
        }

        return (
          <Image
            key={`bg-image-${index}`}
            src={src}
            alt={alt}
            fill
            className={cn(
              "absolute left-0 right-0 top-0 bottom-0",
              imageClassName,
            )}
            style={baseImageStyle}
          />
        );
      })}

      <ContentWrapper className="h-full w-full" {...containerParallax}>
        {children}
      </ContentWrapper>
    </section>
  );
};

// Separate component for parallax images to use hooks correctly
interface ParallaxImageProps {
  src: string;
  alt: string;
  scrollYProgress: any;
  parallax: NonNullable<BackgroundImage["parallax"]>;
  imageClassName: string;
  baseImageStyle: any;
}

const ParallaxImage = ({
  src,
  alt,
  scrollYProgress,
  parallax,
  imageClassName,
  baseImageStyle,
}: ParallaxImageProps) => {
  const direction = parallax.direction ?? "up";
  const scaleRange = parallax.scaleRange ?? [1, 1.1];
  const yRange = parallax.yRange ?? ["-20%", "20%"];
  const xRange = parallax.xRange ?? ["-10%", "10%"];

  const yTransform = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "down" ? [yRange[1], yRange[0]] : [yRange[0], yRange[1]],
  );

  const xTransform = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "right" ? [xRange[1], xRange[0]] : [xRange[0], xRange[1]],
  );

  const scaleTransform = parallax.scale
    ? useTransform(scrollYProgress, [0, 1], scaleRange)
    : undefined;

  const motionStyle: any = {};

  if (direction === "up" || direction === "down") {
    motionStyle.y = yTransform;
  } else {
    motionStyle.x = xTransform;
  }

  if (scaleTransform) {
    motionStyle.scale = scaleTransform;
  }

  return (
    <motion.div className="absolute inset-0" style={motionStyle}>
      <Image
        src={src}
        alt={alt}
        fill
        className={cn("absolute left-0 right-0 top-0 bottom-0", imageClassName)}
        style={baseImageStyle}
      />
    </motion.div>
  );
};
