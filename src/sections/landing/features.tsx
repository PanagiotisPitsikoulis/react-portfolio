"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { theme } from "@/components/chromaui/themes";

import { ChevronRight, Plus } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Wrapper from "@/components/chromaui/section/wrapper/component";
import { HomePageProps } from ".";

const Features = (props: HomePageProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const testimonials = [
    {
      title: "Just Copy Paste Shadcn Blocks",
      imgSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/illustrations/tokyo-exchange-between-the-user-and-the-global-network.svg",
      href: "#",
    },
    {
      title: "Build Modern UI/UX",
      imgSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/illustrations/tokyo-letters-and-arrows-flying-out-of-a-black-hole.svg",
      href: "#",
    },
    {
      title: "Streamline Your Workflow",
      imgSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/illustrations/tokyo-loading-the-next-page.svg",
      href: "#",
    },
    {
      title: "Collaborate Effectively",
      imgSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/illustrations/tokyo-many-browser-windows-with-different-information.svg",
      href: "#",
    },
  ];

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(testimonials.length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, testimonials.length]);

  return (
    <section
      className="overflow-hidden border-b pt-12 pb-20 bg-background text-foreground"
      style={theme.primary}
    >
      <Wrapper className="relative flex flex-col items-center md:px-0 lg:pt-8">
        <div className="relative z-10 w-full items-center justify-between lg:flex">
          <h1 className="max-w-2xl text-5xl font-semibold tracking-tighter md:text-7xl">
            Made for modern UI/UX teams
          </h1>
          <p className="text-muted-foreground/80 mt-8 max-w-lg tracking-tight md:text-xl lg:mt-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation.{" "}
            <span className="text-foreground group inline-flex cursor-pointer items-center font-medium transition-all ease-in-out">
              Read more here{" "}
              <ChevronRight
                size={17}
                className="ml-1 mt-px transition-all ease-in-out group-hover:ml-2"
              />{" "}
            </span>
          </p>
        </div>
        <DottedDiv className="mt-8 flex w-full items-center justify-center px-2 py-10">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent className="m-0 flex w-full">
              {testimonials.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="px-2 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="bg-foreground group relative flex h-full max-h-96 w-full flex-col items-end justify-between text-ellipsis rounded-xl p-5">
                    <img
                      className="max-h-72 w-full opacity-100 transition-all ease-in-out group-hover:scale-90 group-hover:opacity-60"
                      src={item.imgSrc}
                      alt={item.title}
                    />
                    <div className="flex w-full items-center text-background justify-between gap-4">
                      <h5 className="text-2xl font-medium leading-7 tracking-tighter transition-all ease-in-out group-hover:translate-x-4">
                        {item.title}
                      </h5>
                      <a
                        href={item.href}
                        className="relative z-10 cursor-pointer"
                      >
                        <Button
                          variant="outline"
                          className="hover:bg-muted bg-background h-12 w-12 rounded-full transition-all ease-in-out"
                        >
                          <Plus className="scale-150" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="mt-8 flex w-full items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium">
                  {current.toString().padStart(2, "0")}
                </span>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">
                  {count.toString().padStart(2, "0")}
                </span>
              </div>

              <div className="relative mr-10 flex gap-2">
                <CarouselPrevious className="h-10 w-10" />
                <CarouselNext variant="default" className="h-10 w-10" />
              </div>
            </div>
          </Carousel>
        </DottedDiv>
      </Wrapper>
    </section>
  );
};

export default Features;

const DottedDiv = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("relative", className)}>
    <div className="bg-foreground/20 absolute -left-[12.5px] top-4 h-[1.5px] w-[110%] md:-left-20" />
    <div className="bg-foreground/20 absolute -left-[12.5px] bottom-4 h-[1.5px] w-[110%] md:-left-20" />
    <div className="bg-foreground/20 absolute -top-4 left-0 h-[110%] w-[1.5px]" />
    <div className="bg-foreground/20 absolute -top-4 right-0 h-[110%] w-[1.5px]" />
    <div className="bg-accent absolute left-[-3px] top-[12.5px] z-10 h-2 w-2 rounded-full" />
    <div className="bg-accent absolute right-[-3px] top-[12.5px] z-10 h-2 w-2 rounded-full" />
    <div className="bg-accent absolute bottom-[12.5px] left-[-3px] z-10 h-2 w-2 rounded-full" />
    <div className="bg-accent absolute bottom-[12.5px] right-[-3px] z-10 h-2 w-2 rounded-full" />
    {children}
  </div>
);
