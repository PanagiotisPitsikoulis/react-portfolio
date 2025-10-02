import type { ArcTimelineItem } from "@/components/magicui/arc-timeline";
import {
  BadgeCheck,
  Clock1,
  Clock10Icon,
  CodeXml,
  Database,
  Figma,
  Languages,
  Laptop2,
  Palette,
  Pyramid,
  Smartphone,
  Sparkle,
  Zap,
  ZapIcon,
} from "lucide-react";

export interface LandingPageData {
  hero: {
    title: string;
    titleColored: string;
    subtitle: string;
    primaryCta: {
      label: string;
      href: string;
    };
    secondaryCta: {
      label: string;
      href: string;
    };
  };
  features: {
    title: string;
    subtitle: string;
    cta: { label: string; href: string };
    data: {
      title: string;
      description: string;
      image: string;
      icon: React.ReactNode;
    }[];
  };
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
  blog: {
    title: string;
    subtitle: string;
  };
  timeline: {
    title: string;
    subtitle: string;
    data: ArcTimelineItem[];
    defaultActiveTime: string;
  };
}

const heroData: LandingPageData["hero"] = {
  title: "Hi, I'm Panos Pitsikoulis,",
  titleColored: "a full-stack developer",
  subtitle:
    "I am a full-stack developer who specializes in building fast, accessible web apps with modern React, TypeScript, and Next.js.",
  primaryCta: {
    label: "View Projects",
    href: "/projects",
  },
  secondaryCta: {
    label: "Contact Me",
    href: "/contact",
  },
};

const featuresData: LandingPageData["features"] = {
  title: "Relevant Skills and Languages",
  subtitle:
    "Practical skills I use to ship reliable full‑stack products. From React and TypeScript on the frontend to Node.js APIs and databases on the backend, I focus on modern tools that deliver results.",
  cta: { label: "More About Me", href: "/#about" },
  data: [
    {
      title: "Frontend (React + Next.js)",
      description:
        "React, Next.js App Router, TypeScript, Tailwind CSS, Radix UI, shadcn/ui, Responsive Design",
      image: "/landing/nextjs.svg",
      icon: <Zap className="size-4" />,
    },
    {
      title: "Mobile (React Native)",
      description:
        "React Native, Expo, Cross-platform mobile apps, iOS & Android development",
      image: "/landing/react-native.svg",
      icon: <Smartphone className="size-4" />,
    },
    {
      title: "Backend & APIs",
      description:
        "Node.js, Laravel, Next.js Route Handlers, REST, GraphQL, tRPC, Prisma",
      image: "/landing/api.svg",
      icon: <BadgeCheck className="size-3" />,
    },
    {
      title: "Databases & Cloud",
      description:
        "PostgreSQL, MySQL, Redis, MongoDB, ORMs (Prisma/Drizzle), Vercel, AWS",
      image: "/landing/database.svg",
      icon: <Database className="size-3" />,
    },
    {
      title: "Design & UI/UX",
      description:
        "Figma, Photoshop, Typography, Color Theory, User Interface Design, Prototyping",
      image: "/landing/design.svg",
      icon: <Palette className="size-3" />,
    },
    {
      title: "Tooling & Quality",
      description:
        "Git, CI/CD (GitHub Actions), Jest/Playwright, Docker, Performance Optimization",
      image: "/landing/tool.svg",
      icon: <Sparkle className="size-3" />,
    },
  ],
};

const timelineData: LandingPageData["timeline"] = {
  title: "My Journey as a Full-Stack Developer",
  subtitle: "Professional milestones and growth over the years",
  defaultActiveTime: "2025",
  data: [
    {
      time: "Summer 2025",
      steps: [
        {
          content: "Mani Fishing Cruises — freelance work.",
        },
      ],
    },
    {
      time: "2025",
      steps: [
        {
          content: "BSc CS — advanced coursework.",
        },
        {
          content: "Personal projects — iterate and ship.",
        },
      ],
    },
    {
      time: "2024",
      steps: [
        {
          content: "BSc CS — React, PHP, SQL focus.",
        },
        {
          content: "Personal projects — UI/UX prototypes.",
        },
      ],
    },
    {
      time: "2023",
      steps: [
        {
          content: "Metropolitan College — enrolled BSc CS.",
        },
        {
          content: "Personal projects — full‑stack apps.",
        },
      ],
    },
    {
      time: "2021 – 2023",
      steps: [
        {
          content: "International Hellenic University — CS fundamentals.",
        },
      ],
    },
    {
      time: "2021",
      steps: [
        {
          content: "ECPE English • CS exam 100/100.",
        },
      ],
    },
    {
      time: "2018 – 2020",
      steps: [
        {
          content: "High school — early tools & practice.",
        },
      ],
    },
  ],
};

export const landingContent: LandingPageData = {
  hero: heroData,
  features: featuresData,
  portfolio: {
    title: "Some of my Featured Projects",
    subtitle: "A showcase of my latest projects and technical expertise",
    cta: { label: heroData.primaryCta.label, href: heroData.primaryCta.href },
  },
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
  blog: {
    title: "My Thoughts on the Latest Tech Developments",
    subtitle: "Thoughts on technology, development, and industry trends",
  },
  timeline: timelineData,
};
