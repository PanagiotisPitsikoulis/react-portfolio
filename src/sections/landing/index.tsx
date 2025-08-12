import * as React from "react";
import TimelineCard from "./_timeline-card";
import Hero from "./_hero";
import LandingCarousel from "./_landing-carousel";
import BentoGrid from "./_bento-grid";
import { cn } from "@/lib/utils";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  return (
    <>
      <div className={cn("flex flex-1 flex-col gap-20 px-6 lg:px-12 pb-32")}>
        <Hero />
        <LandingCarousel />
        <BentoGrid />
        <TimelineCard />
      </div>
    </>
  );
};

export default HomePage;
