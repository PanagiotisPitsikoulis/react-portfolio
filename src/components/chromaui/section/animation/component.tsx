"use client";

import { InView } from "@/components/ui/in-view";
import { Transition } from "motion/react";

export interface AnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
  speed?: "slow" | "medium" | "fast" | "instant";
  delay?: number;
  threshold?: number;
  once?: boolean;
  as?: React.ElementType;
  blur?: boolean;
}

const AnimationWrapper = ({
  children,
  className = "",
  speed = "medium",
  delay = 0,
  threshold = 0.1,
  once = false,
  as = "div",
  blur = true,
}: AnimationWrapperProps) => {
  const speedConfig = {
    slow: { duration: 0.4, y: 20 },
    medium: { duration: 0.3, y: 16 },
    fast: { duration: 0.25, y: 12 },
    instant: { duration: 0.15, y: 8 },
  };

  const config = speedConfig[speed];

  const slideUpVariants = {
    hidden: {
      opacity: 0,
      y: config.y,
      scale: 0.95,
      ...(blur && { filter: "blur(1px)" }),
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      ...(blur && { filter: "blur(0px)" }),
    },
  };

  const transition: Transition = {
    duration: config.duration,
    delay,
    ease: "easeInOut",
  };

  return (
    <InView
      variants={slideUpVariants}
      transition={transition}
      viewOptions={{
        //@ts-ignore
        threshold,
        margin: "-50px 0px -50px 0px",
      }}
      className={className}
      once={once}
      as={as}
    >
      {children}
    </InView>
  );
};

export default AnimationWrapper;

// Convenience components for different speeds
export const SlowAnimation = ({
  children,
  ...props
}: Omit<AnimationWrapperProps, "speed">) => (
  <AnimationWrapper speed="slow" {...props}>
    {children}
  </AnimationWrapper>
);

export const MediumAnimation = ({
  children,
  ...props
}: Omit<AnimationWrapperProps, "speed">) => (
  <AnimationWrapper speed="medium" {...props}>
    {children}
  </AnimationWrapper>
);

export const FastAnimation = ({
  children,
  ...props
}: Omit<AnimationWrapperProps, "speed">) => (
  <AnimationWrapper speed="fast" {...props}>
    {children}
  </AnimationWrapper>
);

export const InstantAnimation = ({
  children,
  ...props
}: Omit<AnimationWrapperProps, "speed">) => (
  <AnimationWrapper speed="instant" {...props}>
    {children}
  </AnimationWrapper>
);

// One-time animation (plays only once)
export const OnceAnimation = ({
  children,
  ...props
}: AnimationWrapperProps) => (
  <AnimationWrapper once={true} {...props}>
    {children}
  </AnimationWrapper>
);

// Staggered animation wrapper for multiple children
export const StaggeredAnimations = ({
  children,
  className = "",
  speed = "medium",
  staggerDelay = 0.08,
}: {
  children: React.ReactNode[];
  className?: string;
  speed?: "slow" | "medium" | "fast" | "instant";
  staggerDelay?: number;
}) => {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <AnimationWrapper
          key={index}
          speed={speed}
          delay={index * staggerDelay}
        >
          {child}
        </AnimationWrapper>
      ))}
    </div>
  );
};
