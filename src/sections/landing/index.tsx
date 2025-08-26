import SectionHeading from "@/components/section-heading";
import { cn } from "@/lib/utils";
import * as React from "react";
import { landingPageData } from "../../../content/data/landing-page";
import BlogCard from "./blog-card";
import Features from "./features";
import Hero from "./hero";
import LandingCarousel from "./landing-carousel";
import TimelineCard from "./timeline-card";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  return (
    <>
      <div className={cn("flex flex-1 flex-col gap-20 page-container pb-32")}>
        <Hero
          badgeText={landingPageData.hero.badgeText}
          badgeHref={landingPageData.hero.badgeHref}
          title={landingPageData.hero.title}
          subtitle={landingPageData.hero.subtitle}
          primaryCta={landingPageData.hero.primaryCta}
          secondaryCta={landingPageData.hero.secondaryCta}
          images={landingPageData.hero.images}
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

        <LandingCarousel items={landingPageData.carousel.items} />

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
};

export default HomePage;
