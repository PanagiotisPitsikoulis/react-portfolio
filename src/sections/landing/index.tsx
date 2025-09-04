import SectionHeading from "@/components/section-heading";
import { listContent } from "@/lib/md/mdx";
import { cn } from "@/lib/utils";
import fs from "node:fs/promises";
import path from "node:path";
import { landingPageData } from "../../../content/data/landing-page";
import Features from "./features";
import Hero from "./hero";
import LandingCarousel from "./landing-carousel";
import TimelineCard from "./timeline-card";

async function getScreenshotOrCover(
  slug: string,
  cover?: string,
  mobile?: boolean
): Promise<string> {
  const desktopName = `${slug}.png`;
  const mobileName = `${slug}.mobile.png`;
  const candidate = path.join(
    process.cwd(),
    "public",
    "screenshots",
    desktopName
  );
  try {
    await fs.access(candidate);
    return `/screenshots/${mobile ? mobileName : desktopName}`;
  } catch {
    return cover || "/images/window.png";
  }
}

export default async function HomePage() {
  const projects = await listContent("projects");
  const heroImages = await Promise.all(
    projects.slice(0, 8).map(async (p) => ({
      src: await getScreenshotOrCover(p.slug, p.frontmatter.cover, true),
      alt: p.frontmatter.title || p.slug,
    }))
  );

  const carouselItems = await Promise.all(
    projects.slice(0, 6).map(async (p) => ({
      image: await getScreenshotOrCover(p.slug, p.frontmatter.cover),
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

        {/* Divider: Skills */}
        <div className="my-6">
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs uppercase tracking-wide">Skills</span>
            <div className="h-px flex-1 bg-border" />
          </div>
        </div>

        <div>
          <SectionHeading>
            <>{landingPageData.sectionHeadings.features.title}</>
            <>{landingPageData.sectionHeadings.features.subtitle}</>
          </SectionHeading>
          <Features featuresData={landingPageData.featuresData} />
        </div>

        {/* Divider: Projects */}
        <div className="my-6">
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs uppercase tracking-wide">Projects</span>
            <div className="h-px flex-1 bg-border" />
          </div>
        </div>

        <div>
          <SectionHeading>
            <>{landingPageData.sectionHeadings.carousel.title}</>
            <>{landingPageData.sectionHeadings.carousel.subtitle}</>
          </SectionHeading>
          <LandingCarousel items={carouselItems} />
        </div>

        {/* Divider: Timeline */}
        <div className="my-6">
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs uppercase tracking-wide">Timeline</span>
            <div className="h-px flex-1 bg-border" />
          </div>
        </div>

        <div>
          <SectionHeading>
            <>{landingPageData.sectionHeadings.timeline.title}</>
            <>{landingPageData.sectionHeadings.timeline.subtitle}</>
          </SectionHeading>

          <TimelineCard
            data={landingPageData.timeline.data}
            defaultActiveTime={landingPageData.timeline.defaultActiveTime}
          />
        </div>
      </div>
    </>
  );
}
