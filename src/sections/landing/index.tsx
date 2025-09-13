import ProjectPreview from "@/components/sidelib/project-preview";
import { listContent } from "@/lib/md/mdx";
import { cn } from "@/lib/utils";
import { landingPageData } from "../../../content/data/landing-page";
import Features from "./features";
import Hero from "./hero";
import { Section } from "./section";
import TimelineCard from "./timeline-card";

export default async function HomePage() {
  const projects = await listContent("projects");

  const featuredProjects = projects.filter((p) =>
    Boolean(p.frontmatter.featured)
  );

  return (
    <>
      <div
        className={cn(
          "page-container flex flex-1 flex-col gap-12 md:gap-16 lg:gap-20 pb-28 lg:pb-36 lg:-mt-20"
        )}
      >
        <Hero
          title={landingPageData.hero.title}
          subtitle={landingPageData.hero.subtitle}
          primaryCta={landingPageData.hero.primaryCta}
          secondaryCta={landingPageData.hero.secondaryCta}
          items={featuredProjects}
        />

        <Section
          id="skills"
          label="Skills"
          title={landingPageData.sectionHeadings.features.title}
          subtitle={landingPageData.sectionHeadings.features.subtitle}
          className="scroll-mt-24 md:scroll-mt-28"
        >
          <Features featuresData={landingPageData.featuresData} />
        </Section>

        <Section
          id="projects"
          label="Projects"
          title={landingPageData.sectionHeadings.carousel.title}
          subtitle={landingPageData.sectionHeadings.carousel.subtitle}
          className="scroll-mt-24 md:scroll-mt-28"
        >
          <ProjectPreview
            className="mt-8 md:mt-10"
            items={featuredProjects}
            isLink
          />
        </Section>

        <Section
          id="timeline"
          label="Timeline"
          title={landingPageData.sectionHeadings.timeline.title}
          subtitle={landingPageData.sectionHeadings.timeline.subtitle}
          className="scroll-mt-24 md:scroll-mt-28"
        >
          <TimelineCard
            data={landingPageData.timeline.data}
            defaultActiveTime={landingPageData.timeline.defaultActiveTime}
          />
        </Section>
      </div>
    </>
  );
}
