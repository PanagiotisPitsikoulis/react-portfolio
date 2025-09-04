"use client";

import { cn } from "@/lib/utils";

import { LandingPageData } from "../../../content/data/landing-page";

const Features = ({
  featuresData,
}: {
  featuresData: LandingPageData["featuresData"];
}) => {
  return (
    <section>
      <div>
        {/* Feature Cards Section */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className={cn("mt-0 flex flex-col border-l px-6 sm:mt-4 md:mt-6")}
            >
              {/* Masked Text */}
              <div className="relative z-40">
                <h1 className="mb-16 bg-linear-to-r from-background to-transparent bg-clip-text text-9xl">
                  0{index + 1}
                </h1>
                <div className="absolute inset-0 bg-linear-to-r from-background to-transparent opacity-100"></div>
              </div>

              <div className="mt-4 mb-2 flex items-center gap-3">
                <span className="inline-flex shrink-0 size-9 items-center justify-center rounded-full bg-muted ring-1 ring-border text-primary">
                  {feature.icon}
                </span>
                <p className="text-md font-semibold">{feature.title}</p>
              </div>
              <p className="text-md mb-6 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
