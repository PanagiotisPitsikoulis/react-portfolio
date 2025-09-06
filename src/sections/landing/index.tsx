import { listContent } from "@/lib/md/mdx";
import { getScreenshotOrCover } from "@/lib/server-files";
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
  // Build hero images: one mobile screenshot per featured project
  const heroImages = (
    await Promise.all(
      featuredProjects.map(async (p) => {
        const src = await getScreenshotOrCover(p.slug, p.frontmatter.cover, {
          mobile: true,
        });
        return {
          src,
          alt: p.frontmatter.title || p.slug,
          href: `/projects/${p.slug}`,
        } as { src: string; alt: string; href?: string };
      })
    )
  ).slice(0, 24);

  const carouselItems = await Promise.all(
    featuredProjects.slice(0, 6).map(async (p) => ({
      image: await getScreenshotOrCover(p.slug, p.frontmatter.cover, {
        mobile: false,
      }),
      title: p.frontmatter.title || p.slug,
      description: p.frontmatter.summary || "",
      link: `/projects/${p.slug}`,
      ctaLabel: "View project",
    }))
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
          images={heroImages}
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
          <LandingCarousel items={carouselItems} />
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
