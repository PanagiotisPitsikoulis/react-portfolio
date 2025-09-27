"use client";

import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

interface CarouselImage {
  src: string;
  alt?: string;
  className?: string;
}

interface CarouselProps {
  images: CarouselImage[];
  variant?: "single" | "double" | "triple";
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  pauseOnHover?: boolean;
  duration?: string;
  className?: string;
  imageClassName?: string;
  showGradients?: boolean;
  gradientPosition?: "top" | "bottom" | "both";
  mobileHeight?: string;
  desktopHeight?: string;
}

export const Carousel = ({
  images,
  variant = "double",
  direction = "vertical",
  reverse = false,
  pauseOnHover = true,
  duration = "20s",
  className = "",
  imageClassName = "",
  showGradients = false,
  gradientPosition = "both",
  mobileHeight = "h-[50svh]",
  desktopHeight = "lg:h-full",
}: CarouselProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const defaultImageClassName =
    "w-full rounded-3xl object-cover h-auto object-top";
  const finalImageClassName = cn(defaultImageClassName, imageClassName);

  const renderImage = (
    image: CarouselImage,
    index: number,
    keyPrefix: string
  ) => (
    <motion.img
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      transition={{
        duration: 0.2,
        ease: "easeOut",
        delay: index * 0.1 + 0.5,
      }}
      animate={{
        filter:
          hoveredIndex !== null && hoveredIndex !== index ?
            "blur(10px)"
          : "blur(0px)",
        transition: {
          duration: 0.3,
          ease: "easeOut",
          delay: 0,
        },
      }}
      key={`${keyPrefix}-${image.src}-${index}`}
      src={image.src}
      alt={image.alt || ""}
      className={cn(finalImageClassName, image.className)}
    />
  );

  const renderMarquee = (keyPrefix: string, isReverse = false) => (
    <Marquee
      reverse={isReverse}
      pauseOnHover={pauseOnHover}
      vertical={direction === "vertical"}
      className={`[--duration:${duration}]`}
    >
      {images.map((image, index) => renderImage(image, index, keyPrefix))}
    </Marquee>
  );

  const renderGradients = () => {
    if (!showGradients) return null;

    const gradients = [];

    if (gradientPosition === "top" || gradientPosition === "both") {
      gradients.push(
        <div
          key="top-gradient"
          className="from-muted pointer-events-none absolute inset-x-0 top-0 block h-1/4 bg-gradient-to-b lg:hidden"
        />
      );
    }

    if (gradientPosition === "bottom" || gradientPosition === "both") {
      gradients.push(
        <div
          key="bottom-gradient"
          className="from-muted pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"
        />
      );
    }

    return gradients;
  };

  return (
    <div
      className={cn(
        "relative flex flex-row items-center justify-end overflow-hidden",
        mobileHeight,
        desktopHeight,
        className
      )}
    >
      {variant === "single" && renderMarquee("marquee1", reverse)}

      {variant === "double" && (
        <>
          {renderMarquee("marquee1", false)}
          {renderMarquee("marquee2", true)}
        </>
      )}

      {variant === "triple" && (
        <>
          {renderMarquee("marquee1", false)}
          {renderMarquee("marquee2", true)}
          {renderMarquee("marquee3", false)}
        </>
      )}

      {renderGradients()}
    </div>
  );
};
