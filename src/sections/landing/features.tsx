"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { LandingPageData } from "../../../content/data/landing";

const Features = ({
  heading,
  featuresData,
  cta,
}: {
  heading: LandingPageData["sectionHeadings"]["features"];
  featuresData: LandingPageData["featuresData"];
  cta: LandingPageData["featuresCta"];
}) => {
  return (
    <section id="features" className="py-20 sm:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10 lg:mb-16 flex justify-center items-center flex-col gap-x-0 gap-y-6 lg:gap-y-0 lg:flex-row lg:justify-between max-md:max-w-lg max-md:mx-auto">
          <div className="relative w-full text-center lg:text-left lg:w-2/4">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight sm:leading-[3.25rem] lg:mb-6 mx-auto max-w-max lg:max-w-md lg:mx-0">
              {heading.title}
            </h2>
          </div>
          <div className="relative w-full text-center  lg:text-left lg:w-2/4">
            <p className="text-base sm:text-lg font-normal text-muted-foreground mb-3 sm:mb-5">
              {heading.subtitle}
            </p>
            <Link
              href={cta.href}
              className="flex flex-row items-center justify-center gap-2 text-base font-semibold text-primary lg:justify-start hover:text-primary/90 "
            >
              {cta.label} <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {featuresData.map((f, i) => (
            <div
              key={f.title}
              className={cn(
                i === 0 ? "bg-primary" : "hover:bg-primary bg-muted",
                "group relative w-full rounded-3xl p-4 sm:p-5 transition-all duration-500 xl:p-7"
              )}
            >
              <div
                className={cn(
                  i === 0
                    ? "text-primary bg-background"
                    : "bg-primary/20 text-primary group-hover:text-primary group-hover:bg-background",
                  "rounded-full flex justify-center items-center mb-4 sm:mb-5 w-12 h-12 sm:w-14 sm:h-14 "
                )}
              >
                {f.icon}
              </div>
              <h4
                className={cn(
                  i === 0 ? "text-primary-foreground" : "text-foreground",
                  "text-base sm:text-lg font-semibold mb-1 capitalize transition-all duration-500 group-hover:text-white"
                )}
              >
                {f.title}
              </h4>
              <p
                className={cn(
                  i === 0
                    ? "text-primary-foreground/90"
                    : "text-muted-foreground group-hover:text-primary-foreground mt-2",
                  "text-sm font-normal transition-all duration-500 leading-5"
                )}
              >
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
