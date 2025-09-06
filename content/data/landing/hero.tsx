import type { HeroProps } from "@/sections/landing/hero";

export const heroData: HeroProps = {
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
  images: [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw12.jpeg",
      alt: "Monochrome architectural detail",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw13.jpeg",
      alt: "Black and white texture pattern",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw14.jpeg",
      alt: "Abstract grayscale composition",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw16.jpeg",
      alt: "Minimalist black and white scene",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw17.jpeg",
      alt: "High-contrast urban geometry",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
      alt: "Portrait in soft lighting",
    },
  ],
};
