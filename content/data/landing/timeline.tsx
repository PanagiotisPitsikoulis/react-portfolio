import type { ArcTimelineItem } from "@/components/magicui/arc-timeline";
import { TimelineIcons } from "@/sections/landing/timeline-card";

export const timelineData: {
  data: ArcTimelineItem[];
  defaultActiveTime: string;
} = {
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
