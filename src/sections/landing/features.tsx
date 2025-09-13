"use client";

import { cn } from "@/lib/utils";

import Image from "next/image";
import { backgroundImages } from "../../../content/data";
import { LandingPageData } from "../../../content/data/landing-page";

const Features = ({
  featuresData,
}: {
  featuresData: LandingPageData["featuresData"];
}) => {
  return (
    <section>
      <div className="relative p-8 flex mt-16">
        <Image
          className="absolute inset-0 rounded-3xl object-cover"
          src={backgroundImages[1]}
          alt="features"
          fill
        />
        <div className="absolute inset-0 rounded-3xl pointer-events-none" />
        {/* Feature Cards Section */}
        <div className="relative z-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuresData.map((feature, index) => (
            <div key={index} className="group relative">
              {/* large index numeral behind card */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-7 -top-7 select-none text-6xl sm:text-7xl md:text-8xl font-black leading-none tracking-tighter text-black/40 z-0 transition-transform duration-300 group-hover:scale-105"
              >
                0{index + 1}
              </div>
              {/* card body (no border) */}
              <div
                className={cn(
                  "z-10 flex h-full flex-col rounded-3xl p-6 bg-card drop-shadow-sm shadow-sm transition-all duration-300 ease-out group-hover:-translate-y-1"
                )}
              >
                {/* icon + title */}
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm ring-1 ring-primary/15">
                    {feature.icon}
                  </span>
                  <h3 className="text-sm sm:text-base font-semibold tracking-tight">
                    {feature.title}
                  </h3>
                </div>

                {/* description */}
                <p className="mb-2 text-sm text-muted-foreground leading-relaxed [text-wrap:balance]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
