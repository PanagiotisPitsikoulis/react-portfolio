import type { ArcTimelineItem } from "@/components/magicui/arc-timeline";
import type { HeroProps } from "@/sections/landing/hero";
import type { LandingCarouselItem } from "@/sections/landing/landing-carousel";
import { TimelineIcons } from "@/sections/landing/timeline-card";
import { BadgeCheck, Pyramid, Sparkle, Zap } from "lucide-react";

export interface LandingPageData {
  hero: HeroProps;
  sectionHeadings: {
    features: {
      title: string;
      subtitle: string;
    };
    carousel: {
      title: string;
      subtitle: string;
    };
    blog: {
      title: string;
      subtitle: string;
    };
    timeline: {
      title: string;
      subtitle: string;
    };
  };
  featuresData: {
    title: string;
    description: string;
    image: string;
    icon: React.ReactNode;
  }[];
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
    badgeHref: "/contact",
    title: "Web Developer Panos Pitsikoulis",
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
  },
  sectionHeadings: {
    features: {
      title: "What I Do as a Full-Stack Developer",
      subtitle:
        "Full-stack development with modern technologies and best practices",
    },
    carousel: {
      title: "Some of my Featured Projects",
      subtitle: "A showcase of my latest projects and technical expertise",
    },
    blog: {
      title: "My Thoughts on the Latest Tech Developments",
      subtitle: "Thoughts on technology, development, and industry trends",
    },
    timeline: {
      title: "My Journey as a Full-Stack Developer",
      subtitle: "Professional milestones and growth over the years",
    },
  },
  featuresData: [
    {
      title: "Seamless Integrations",
      description:
        "Connect your favorite tools and services effortlessly for a unified workflow.",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
      icon: <Zap className="size-5" />,
    },
    {
      title: "Advanced Analytics",
      description:
        "Gain deep insights with powerful analytics to make data-driven decisions.",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
      icon: <Pyramid className="size-5" />,
    },
    {
      title: "Smart Search & Filters",
      description:
        "Find exactly what you need with intelligent search and filtering options.",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
      icon: <Sparkle className="size-5" />,
    },
    {
      title: "Enhanced Security",
      description:
        "Protect your data with top-notch security features and encryption.",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
      icon: <BadgeCheck className="size-5" />,
    },
  ],
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
