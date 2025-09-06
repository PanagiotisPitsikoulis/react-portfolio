import { BadgeCheck, Pyramid, Sparkle, Zap } from "lucide-react";

export const featuresData = [
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
