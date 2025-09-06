import type { LandingPageData } from "../landing-page";
import { featuresData } from "./features";
import { heroData } from "./hero";
import { sectionHeadings } from "./sections";
import { timelineData } from "./timeline";

export const landingPageDataSplit: LandingPageData = {
  hero: heroData,
  sectionHeadings,
  featuresData,
  timeline: timelineData,
};
