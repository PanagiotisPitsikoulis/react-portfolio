import * as React from "react";
import TimelineCard from "./timeline-card";
import Hero from "./hero";
import LandingCarousel from "./landing-carousel";
import Features from "./features";
import { cn } from "@/lib/utils";
import BlogCard from "./blog-card";
import { landingPageData } from "@/lib/data/landing-page";
import SectionHeading from "@/components/section-heading";

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
        <SectionHeading>
          <>Welcome to React Portfolio, a very cool website</>
          <>This is a portfolio website built using React.</>
        </SectionHeading>
        <Features featuresData={landingPageData.featuresData} />
        <SectionHeading>
          <>Welcome to React Portfolio, a very cool website</>
          <>This is a portfolio website built using React.</>
        </SectionHeading>
        <LandingCarousel items={landingPageData.carousel.items} />
        <SectionHeading>
          <>Welcome to React Portfolio, a very cool website</>
          <>This is a portfolio website built using React.</>
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
          <>Welcome to React Portfolio, a very cool website</>
          <>This is a portfolio website built using React.</>
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
