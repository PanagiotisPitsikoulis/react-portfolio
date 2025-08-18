import * as React from "react";
import TimelineCard from "./timeline-card";
import Hero from "./hero";
import LandingCarousel from "./landing-carousel";
import BentoGrid from "./bento-grid";
import { cn } from "@/lib/utils";
import BlogCard from "./blog-card";
import { landingPageData } from "@/lib/data/landing-page";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  return (
    <>
      <div className={cn("flex flex-1 flex-col gap-20 px-6 lg:px-12 pb-32")}>
        <Hero
          badgeText={landingPageData.hero.badgeText}
          badgeHref={landingPageData.hero.badgeHref}
          title={landingPageData.hero.title}
          subtitle={landingPageData.hero.subtitle}
          primaryCta={landingPageData.hero.primaryCta}
          secondaryCta={landingPageData.hero.secondaryCta}
          images={landingPageData.hero.images}
        />
        <BentoGrid
          leadTile={landingPageData.bentoGrid.leadTile}
          secondaryTile={landingPageData.bentoGrid.secondaryTile}
          stat={landingPageData.bentoGrid.stat}
          avatarStrip={landingPageData.bentoGrid.avatarStrip}
          wideImageTile={landingPageData.bentoGrid.wideImageTile}
          highlightTile={landingPageData.bentoGrid.highlightTile}
          pricing={landingPageData.bentoGrid.pricing}
        />
        <LandingCarousel items={landingPageData.carousel.items} />
        <BlogCard
          sectionTitle={landingPageData.blogCard.sectionTitle}
          sectionSubtitle={landingPageData.blogCard.sectionSubtitle}
          readMoreLabel={landingPageData.blogCard.readMoreLabel}
          readMoreHref={landingPageData.blogCard.readMoreHref}
          authorAvatarSrc={landingPageData.blogCard.authorAvatarSrc}
          labels={landingPageData.blogCard.labels}
        />
        <TimelineCard
          data={landingPageData.timeline.data}
          defaultActiveTime={landingPageData.timeline.defaultActiveTime}
        />
      </div>
    </>
  );
};

export default HomePage;
