import type { ArcTimelineItem } from "@/components/magicui/arc-timeline";
import { TimelineIcons } from "@/sections/landing/timeline-card";
import { BadgeCheck, Pyramid, Sparkle, Zap } from "lucide-react";

export interface LandingPageData {
  hero: {
    title: string;
    titleHighlighted: string;
    subtitle: string;
    primaryCta: {
      label: string;
      href: string;
      variant?: "default" | "secondary" | "outline";
    };
    secondaryCta: {
      label: string;
      href: string;
      variant?: "default" | "secondary" | "outline";
    };
    stats?: Array<{ value: string; label: string }>;
  };
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
  featuresCta: { label: string; href: string };
  portfolio: {
    title: string;
    subtitle: string;
    cta: { label: string; href: string };
  };
  about: {
    id?: string;
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
    cta: { label: string; href: string };
    stats: Array<{ label: string; value: string }>;
    rightPanelImage: string;
  };
  timeline: { data: ArcTimelineItem[]; defaultActiveTime: string };
}

const sectionHeadings = {
  features: {
    title: "Relevant Skills and Programming Languages",
    subtitle: "Practical skills I use to ship reliable full‑stack products",
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
} as const;

const heroData: LandingPageData["hero"] = {
  title: "Hi, I'm Panos Pitsikoulis",
  titleHighlighted: "a full-stack developer",
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
  stats: [
    { value: "20+", label: "Projects" },
    { value: "4+ yrs", label: "Experience" },
    { value: "5+", label: "Programming Languages" },
  ],
};

const featuresData: LandingPageData["featuresData"] = [
  {
    title: "Frontend (React + Next.js)",
    description:
      "React, Next.js App Router, TypeScript, Tailwind CSS, Radix UI, shadcn/ui",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    icon: <Zap className="size-5" />,
  },
  {
    title: "Backend & APIs",
    description: "Node.js, Next.js Route Handlers, REST, GraphQL, tRPC, Prisma",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    icon: <BadgeCheck className="size-5" />,
  },
  {
    title: "Data & Cloud",
    description:
      "PostgreSQL (SQL), Redis, ORMs (Prisma/Drizzle), Vercel, AWS basics",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    icon: <Pyramid className="size-5" />,
  },
  {
    title: "Tooling & Quality",
    description:
      "Git, CI/CD (GitHub Actions), Jest/Playwright, Docker, Performance",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
    icon: <Sparkle className="size-5" />,
  },
];

const timelineData: LandingPageData["timeline"] = {
  defaultActiveTime: "2025",
  data: [
    {
      time: "Summer 2025",
      steps: [
        {
          icon: <TimelineIcons.StarIcon width={20} height={20} />,
          content: "Mani Fishing Cruises — freelance work.",
        },
      ],
    },
    {
      time: "2025",
      steps: [
        {
          icon: <TimelineIcons.CubeIcon width={20} height={20} />,
          content: "BSc CS — advanced coursework.",
        },
        {
          icon: <TimelineIcons.RocketIcon width={20} height={20} />,
          content: "Personal projects — iterate and ship.",
        },
      ],
    },
    {
      time: "2024",
      steps: [
        {
          icon: <TimelineIcons.CubeIcon width={20} height={20} />,
          content: "BSc CS — React, PHP, SQL focus.",
        },
        {
          icon: <TimelineIcons.MagicWandIcon width={20} height={20} />,
          content: "Personal projects — UI/UX prototypes.",
        },
      ],
    },
    {
      time: "2023",
      steps: [
        {
          icon: <TimelineIcons.CubeIcon width={20} height={20} />,
          content: "Metropolitan College — enrolled BSc CS.",
        },
        {
          icon: <TimelineIcons.RocketIcon width={20} height={20} />,
          content: "Personal projects — full‑stack apps.",
        },
      ],
    },
    {
      time: "2021 – 2023",
      steps: [
        {
          icon: <TimelineIcons.CubeIcon width={20} height={20} />,
          content: "International Hellenic University — CS fundamentals.",
        },
      ],
    },
    {
      time: "2021",
      steps: [
        {
          icon: <TimelineIcons.StarIcon width={20} height={20} />,
          content: "ECPE English • CS exam 100/100.",
        },
      ],
    },
    {
      time: "2018 – 2020",
      steps: [
        {
          icon: <TimelineIcons.StarIcon width={20} height={20} />,
          content: "High school — early tools & practice.",
        },
      ],
    },
  ],
};

export const landingContent: LandingPageData = {
  // Pull hero copy from folder content
  hero: heroData,
  // Use section headings from folder
  sectionHeadings,
  // Use features from folder
  featuresData,
  // Provide CTA aligned to features heading
  featuresCta: { label: "Contact Me", href: "/contact" },
  // Map carousel heading to portfolio block
  portfolio: {
    title: sectionHeadings.carousel.title,
    subtitle: sectionHeadings.carousel.subtitle,
    cta: { label: heroData.primaryCta.label, href: heroData.primaryCta.href },
  },
  // Developer‑focused About copy
  about: {
    id: "about",
    eyebrow: "A little about me",
    title: "I design and build reliable full‑stack web apps",
    description:
      "Modern React, TypeScript, and Next.js with an eye for performance and UX.",
    bullets: [
      "React + Next.js App Router",
      "TypeScript, Tailwind, Radix UI, shadcn/ui",
      "APIs: REST, GraphQL, tRPC with Prisma",
      "CI/CD, testing, and performance tuning",
    ],
    cta: {
      label: heroData.secondaryCta.label,
      href: heroData.secondaryCta.href,
    },
    stats: [
      { label: "Projects", value: "20+" },
      { label: "Posts", value: "10+" },
      { label: "Rating", value: "4.9" },
    ],
    rightPanelImage: "https://pagedone.io/asset/uploads/1724412669.png",
  },
  timeline: timelineData,
};
