import { listContent } from "@/lib/md/mdx";
import { landingContent } from "../../../content/data/landing";
import About from "./about";
import Features from "./features";
import Hero from "./hero";
import Portfolio from "./portfolio";

export default async function HomePage() {
  const projects = await listContent("projects");

  const featuredProjects = projects.filter((p) =>
    Boolean(p.frontmatter.featured)
  );

  return (
    <>
      <Hero {...landingContent.hero} items={featuredProjects} />

      <Features
        featuresData={landingContent.featuresData}
        heading={landingContent.sectionHeadings.features}
        cta={landingContent.featuresCta}
      />

      <Portfolio
        projects={featuredProjects}
        heading={landingContent.sectionHeadings.carousel}
        cta={landingContent.portfolio.cta}
      />

      <About heading={landingContent.sectionHeadings.timeline} about={landingContent.about} timeline={landingContent.timeline} />
    </>
  );
}
