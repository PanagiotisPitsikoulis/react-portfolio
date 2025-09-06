import type { ArcTimelineItem } from "@/components/magicui/arc-timeline";
import type { HeroProps } from "@/sections/landing/hero";

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
  timeline: { data: ArcTimelineItem[]; defaultActiveTime: string };
}

export { landingPageDataSplit as landingPageData } from "./landing";
