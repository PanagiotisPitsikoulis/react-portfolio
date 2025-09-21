import React from "react";

import { Button } from "@/components/ui/button";
import { ContentItem } from "@/lib/md/mdx";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { LandingPageData } from "../../../content/data/landing";

export type HeroImage = { src: string; alt: string; href?: string };

const Hero: React.FC<LandingPageData["hero"] & { items: ContentItem[] }> = ({
  title,
  subtitle,
  titleHighlighted,
  primaryCta,
  secondaryCta,
  items,
  stats,
}) => {
  return (
    <div className="lg:h-svh relative">
      <div className="h-screen 2xl:w-[37%] xl:w-[33%] fixed right-0 hidden xl:block -z-10">
        <img
          src="https://pagedone.io/asset/uploads/1694846989.png"
          alt="Gradient background image"
          className="h-screen object-cover"
        />
      </div>
      <section className="relative pt-20 sm:pt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-24 gap-6 items-center overflow-visible">
            <div className="w-full lg:col-span-6 lg:pb-0 pb-10 md:order-first relative">
              <div className="text-center lg:text-left lg:max-w-xl">
                <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl text-foreground font-manrope">
                  {title}{" "}
                  <span className="text-primary">{titleHighlighted}</span>
                </h1>

                <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl lg:text-left">
                  {subtitle}
                </p>
                <div className="flex flex-col md:flex-row lg:justify-start justify-center mb-16 md:mb-24 gap-4 md:gap-5 relative max-lg:px-5">
                  <div className="absolute -bottom-[1rem] -right-[1rem] max-lg:-right-[6rem]">
                    <svg
                      width="168"
                      height="104"
                      viewBox="0 0 268 104"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M264.777 3.33834C222.044 14.8431 176.014 33.1588 152.064 73.076C148.329 79.3006 141.654 95.5162 151.662 99.8183C160.445 103.594 176.952 98.3859 182.062 90.8054C195.361 71.0756 206.095 41.7823 175.873 31.4217C142.973 20.1427 98.192 26.4825 64.8209 33.7983C48.6344 37.3468 29.4277 42.8976 14.8854 50.9718C5.23178 56.3317 14.5116 54.7798 21.5226 55.0521C31.4939 55.4393 54.5187 56.3335 32.4429 55.4762C23.4728 55.1278 13.6122 56.1584 5.47517 58.1452C-3.22441 60.2693 10.2074 50.6527 11.5709 48.8256C15.8694 43.0655 20.8662 33.6755 21.15 26.3685"
                        stroke="var(--primary)"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <Button asChild size={"lg"}>
                    <Link
                      href={primaryCta.href}
                      className="flex items-center gap-2"
                    >
                      {primaryCta.label}
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" size={"lg"}>
                    <Link
                      href={secondaryCta.href}
                      className="flex items-center gap-2"
                    >
                      {secondaryCta.label}
                    </Link>
                  </Button>
                </div>
                {stats && stats.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                    {stats.map((s, i) => (
                      <div
                        key={s.label}
                        className={cn(
                          `relative flex flex-col w-full items-center bg-muted rounded-3xl justify-center py-8`,
                          i === 2 && "col-span-2",
                        )}
                      >
                        <h4 className="text-lg text-foreground font-bold">
                          {s.value}
                        </h4>
                        <span className="text-xs font-normal text-muted-foreground">
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full lg:col-span-6 flex justify-start lg:justify-start -mt-14 relative -z-10 h-svh items-end">
              <Image
                src="/mobile.png"
                sizes="(max-width: 768px) 100vw, 900px"
                width={2000}
                height={2000}
                alt="Welcome back image"
                className="h-[100svh] object-cover object-top w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
