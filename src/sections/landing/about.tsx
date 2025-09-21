import { LandingPageData } from "../../../content/data/landing";
import TimelineCard from "./timeline-card";

interface AboutProps {
  about: LandingPageData["about"];
  timeline: LandingPageData["timeline"];
  heading: LandingPageData["sectionHeadings"]["timeline"];
}

function About({ about, timeline, heading }: AboutProps) {
  return (
    <section id={about.id || "about"} className="py-20 sm:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10 lg:mb-16 flex justify-center items-center flex-col gap-x-0 gap-y-6 lg:gap-y-0 lg:flex-row lg:justify-between max-md:max-w-lg max-md:mx-auto">
          <div className="relative w-full text-center lg:text-left lg:w-2/4">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight sm:leading-[3.25rem] lg:mb-6 mx-auto max-w-max lg:max-w-md lg:mx-0">
              {heading.title}
            </h2>
          </div>
          <div className="relative w-full text-center  lg:text-left lg:w-2/4">
            <p className="text-base sm:text-lg font-normal text-muted-foreground mb-5">
              {heading.subtitle}
            </p>
          </div>
        </div>
        <div className="w-full justify-start items-center gap-6 sm:gap-8 grid lg:grid-cols-2 grid-cols-1 bg-muted p-5 sm:p-8 rounded-2xl sm:rounded-3xl">
          <div className="col-span-2">
            <TimelineCard {...timeline} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
