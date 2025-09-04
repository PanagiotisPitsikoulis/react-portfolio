import SectionHeading from "@/components/section-heading";
import { listContent } from "@/lib/md/mdx";
import { cn } from "@/lib/utils";
import fs from "node:fs/promises";
import path from "node:path";
import { landingPageData } from "../../../content/data/landing-page";
import BlogCard from "./blog-card";
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
          "flex flex-1 flex-col gap-20 page-container pb-32 lg:-mt-20"
        )}
      >
        <Hero
          badgeText={landingPageData.hero.badgeText}
          badgeHref={landingPageData.hero.badgeHref}
          title={landingPageData.hero.title}
          subtitle={landingPageData.hero.subtitle}
          primaryCta={landingPageData.hero.primaryCta}
          secondaryCta={landingPageData.hero.secondaryCta}
          images={heroImages}
        />

        <SectionHeading>
          <>{landingPageData.sectionHeadings.features.title}</>
          <>{landingPageData.sectionHeadings.features.subtitle}</>
        </SectionHeading>

        <Features featuresData={landingPageData.featuresData} />

        <SectionHeading>
          <>{landingPageData.sectionHeadings.carousel.title}</>
          <>{landingPageData.sectionHeadings.carousel.subtitle}</>
        </SectionHeading>

        <LandingCarousel items={carouselItems} />

        <SectionHeading>
          <>{landingPageData.sectionHeadings.blog.title}</>
          <>{landingPageData.sectionHeadings.blog.subtitle}</>
        </SectionHeading>

        <BlogCard
          sectionTitle={landingPageData.blogCard.sectionTitle}
          sectionSubtitle={landingPageData.blogCard.sectionSubtitle}
          readMoreLabel={landingPageData.blogCard.readMoreLabel}
          readMoreHref={landingPageData.blogCard.readMoreHref}
          authorAvatarSrc={landingPageData.blogCard.authorAvatarSrc}
          labels={landingPageData.blogCard.labels}
        />

        <SectionHeading>
          <>{landingPageData.sectionHeadings.timeline.title}</>
          <>{landingPageData.sectionHeadings.timeline.subtitle}</>
        </SectionHeading>

        <TimelineCard
          data={landingPageData.timeline.data}
          defaultActiveTime={landingPageData.timeline.defaultActiveTime}
        />
      </div>
    </>
  );
}
