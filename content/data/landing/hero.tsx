import type { HeroProps } from "@/sections/landing/hero";

export const heroData: Omit<HeroProps, "items"> = {
  title: "Hi, I'm Panos Pitsikoulis",
  subtitle:
    "I build fast, accessible web apps with modern React, TypeScript, and Next.js.",
  primaryCta: {
    label: "View Projects",
    href: "/projects",
    variant: "default",
  },
  secondaryCta: {
    label: "Contact Me",
    href: "/contact",
    variant: "secondary",
  },
};
