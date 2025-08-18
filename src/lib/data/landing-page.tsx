import { TimelineIcons } from "@/sections/landing/timeline-card";
import type { ArcTimelineItem } from "@/components/magicui/arc-timeline";
import type { HeroProps } from "@/sections/landing/hero";
import type {
  BentoGridProps,
  BentoAvatar,
  BentoImageTile,
  BentoPricing,
  BentoStat,
} from "@/sections/landing/bento-grid";
import type { LandingCarouselItem } from "@/sections/landing/landing-carousel";

export interface LandingPageData {
  hero: HeroProps;
  bentoGrid: BentoGridProps;
  carousel: { items: LandingCarouselItem[] };
  timeline: { data: ArcTimelineItem[]; defaultActiveTime: string };
  blogCard: {
    sectionTitle: string;
    sectionSubtitle: string;
    readMoreLabel: string;
    readMoreHref: string;
    authorAvatarSrc: string;
    labels: {
      tooltipGoToBlog: string;
      tooltipOpenPost: string;
      tooltipViewPost: string;
    };
  };
}

export const landingPageData: LandingPageData = {
  hero: {
    badgeText: "Available for freelance work",
    badgeHref: "/#contact",
    title: "Web Developer — Panos Pitsikoulis",
    subtitle:
      "I build fast, accessible web apps with modern React, TypeScript, and Next.js.",
    primaryCta: {
      label: "View Projects",
      href: "/projects",
      variant: "default",
    },
    secondaryCta: {
      label: "Contact Me",
      href: "/#contact",
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
  },
  bentoGrid: {
    leadTile: {
      imageSrc:
        "https://images.pexels.com/photos/4069292/pexels-photo-4069292.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Minimal workspace with shadows",
      headline: "Crafting delightful web experiences",
    },
    secondaryTile: {
      imageSrc:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Team collaborating over UI designs",
      headline: "Design systems, performant UI, and maintainable code.",
    },
    stat: {
      value: "10+",
      labelLines: ["Client satisfaction", "and on-time delivery"],
    },
    avatarStrip: [
      {
        imageSrc:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop&crop=faces",
        fallback: "P1",
      },
      {
        imageSrc:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop&crop=faces",
        fallback: "P2",
      },
      {
        imageSrc:
          "https://images.pexels.com/photos/1130624/pexels-photo-1130624.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop&crop=faces",
        fallback: "P3",
      },
      {
        imageSrc:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop&crop=faces",
        fallback: "P4",
      },
      {
        imageSrc:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop&crop=faces",
        fallback: "P5",
      },
    ],
    wideImageTile: {
      imageSrc:
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Code editor on laptop at desk",
    },
    highlightTile: {
      imageSrc:
        "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Developer working on interface design",
      titleTop: "Rapid Development",
      titleBottom: "Ship features faster with tested components",
    },
    pricing: {
      price: "Custom",
      label: "Project-based pricing available",
      cta: { label: "Get a quote", href: "/#contact" },
    },
  },
  carousel: {
    items: [
      {
        image:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw12.jpeg",
        title: "Next.js Apps",
        description: "SSR, ISR, and full-stack APIs",
        link: "/projects/nextjs",
        ctaLabel: "See builds",
      },
      {
        image:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw13.jpeg",
        title: "Design Systems",
        description: "Shadcn/UI, Tailwind, Radix",
        link: "/projects/design-systems",
        ctaLabel: "Explore",
      },
      {
        image:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw14.jpeg",
        title: "TypeScript Excellence",
        description: "Type-safe, scalable codebases",
        link: "/blog",
        ctaLabel: "Read posts",
      },
    ],
  },
  timeline: {
    defaultActiveTime: "2025 Q2",
    data: [
      {
        time: "2023",
        steps: [
          {
            icon: <TimelineIcons.RocketIcon width={20} height={20} />,
            content: "Started freelancing in web development.",
          },
          {
            icon: <TimelineIcons.GearIcon width={20} height={20} />,
            content: "Shipped first production Next.js app.",
          },
        ],
      },
      {
        time: "2024",
        steps: [
          {
            icon: <TimelineIcons.StarIcon width={20} height={20} />,
            content: "Built design system for a startup.",
          },
          {
            icon: <TimelineIcons.GlobeIcon width={20} height={20} />,
            content: "Collaborated with remote teams across EU.",
          },
        ],
      },
      {
        time: "2025 Q1",
        steps: [
          {
            icon: <TimelineIcons.MagicWandIcon width={20} height={20} />,
            content: "Introduced component library and docs site.",
          },
          {
            icon: <TimelineIcons.LightningBoltIcon width={20} height={20} />,
            content: "Optimized performance across projects.",
          },
        ],
      },
      {
        time: "2025 Q2",
        steps: [
          {
            icon: <TimelineIcons.CubeIcon width={20} height={20} />,
            content: "Launched this portfolio v2.",
          },
        ],
      },
    ],
  },
  blogCard: {
    sectionTitle: "Tech Insights",
    sectionSubtitle:
      "Exploring cutting-edge technologies shaping tomorrow's digital landscape",
    readMoreLabel: "Read More",
    readMoreHref: "/blog",
    authorAvatarSrc: "/author.jpeg",
    labels: {
      tooltipGoToBlog: "Go to blog",
      tooltipOpenPost: "Open post",
      tooltipViewPost: "View post",
    },
  },
};
