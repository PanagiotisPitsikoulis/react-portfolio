import { listContent } from "@/lib/md/mdx";
import { cn } from "@/lib/utils";
import { landingPageData } from "../../../content/data/landing-page";
import Features from "./features";
import Hero from "./hero";
import LandingCarousel from "./landing-carousel";
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
          "flex flex-1 flex-col gap-10 page-container pb-32 lg:-mt-20"
        )}
      >
        <Hero
          title={landingPageData.hero.title}
          subtitle={landingPageData.hero.subtitle}
          primaryCta={landingPageData.hero.primaryCta}
          secondaryCta={landingPageData.hero.secondaryCta}
          images={featuredProjects.map((p) => ({
            src:
              p.heroImageMobile ||
              (p as any).heroImageDesktop ||
              p.frontmatter.cover ||
              "/images/window.png",
            alt: p.frontmatter.title,
            href: `/projects/${p.slug}`,
          }))}
        />

        <Section
          id="skills"
          label="Skills"
          title={landingPageData.sectionHeadings.features.title}
          subtitle={landingPageData.sectionHeadings.features.subtitle}
        >
          <Features featuresData={landingPageData.featuresData} />
        </Section>

        <Section
          id="projects"
          label="Projects"
          title={landingPageData.sectionHeadings.carousel.title}
          subtitle={landingPageData.sectionHeadings.carousel.subtitle}
        >
          <LandingCarousel items={featuredProjects} />
        </Section>

        <Section
          id="timeline"
          label="Timeline"
          title={landingPageData.sectionHeadings.timeline.title}
          subtitle={landingPageData.sectionHeadings.timeline.subtitle}
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
