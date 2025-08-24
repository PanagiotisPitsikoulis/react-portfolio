"use client";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { LandingPageData } from "@/lib/data/landing-page";

const Features = ({
  featuresData,
}: {
  featuresData: LandingPageData["featuresData"];
}) => {
  return (
    <section>
      <div className="container">
        {/* Feature Cards Section */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className={cn("mt-0 flex flex-col border-l px-6 sm:mt-4 md:mt-6")}
            >
              {/* Masked Text */}
              <div className="relative">
                <h1 className="mb-16 bg-linear-to-r from-white to-transparent bg-clip-text text-9xl">
                  0{index + 1}
                </h1>
                <div className="absolute inset-0 bg-linear-to-r from-white to-transparent opacity-100"></div>
              </div>

              <p className="text-md mt-4 mb-2 font-semibold">{feature.title}</p>
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
