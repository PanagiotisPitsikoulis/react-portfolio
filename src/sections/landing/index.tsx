import { ContentItem, listContent } from "@/lib/md/mdx";
import { landingContent, LandingPageData } from "../../../content/data/landing";
import { About } from "./about";
import Features from "./features";
import Hero from "./hero";
import { Portfolio } from "./portfolio";
import { Blog } from "./blog";

export type HomePageProps = {
  projects: ContentItem[];
  blog: ContentItem[];
  landingContent: LandingPageData;
};

export default async function HomePage() {
  const projects = await listContent("projects");
  const blog = await listContent("blog");

  const homePageProps: HomePageProps = {
    projects,
    blog,
    landingContent,
  };

  return (
    <>
      <Hero {...homePageProps} />

      <Features {...homePageProps} />

      <Portfolio {...homePageProps} />

      <About {...homePageProps} />

      <Blog {...homePageProps} />
    </>
  );
}
