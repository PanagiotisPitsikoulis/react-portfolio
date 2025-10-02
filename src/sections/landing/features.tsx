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
import Link from "next/link";
import {
  MediumAnimation,
  SlowAnimation,
} from "@/components/chromaui/section/animation/component";

const Features = (props: HomePageProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const content = props.landingContent.features;

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(content.data.length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, content.data.length]);

  return (
    <section
      className="overflow-hidden border-b pt-12 pb-20 bg-background text-foreground"
      style={theme.primary}
    >
      <Wrapper className="relative flex flex-col items-center md:px-0 lg:pt-8">
        <div className="relative z-10 w-full mb-10 items-center justify-between lg:flex">
          <MediumAnimation>
            <h1 className="max-w-2xl text-5xl font-semibold tracking-tighter md:text-6xl">
              {content.title}
            </h1>
          </MediumAnimation>
          <SlowAnimation delay={0.2}>
            <p className="text-muted-foreground mt-8 max-w-lg tracking-tight text-lg lg:mt-0">
              {content.subtitle}{" "}
              <Link href={content.cta.href}>
                <span className="text-accent group inline-flex cursor-pointer items-center font-medium transition-all ease-in-out">
                  {content.cta.label}
                  <ChevronRight
                    size={17}
                    className="ml-1 mt-px transition-all ease-in-out group-hover:ml-2"
                  />{" "}
                </span>
              </Link>
            </p>
          </SlowAnimation>
        </div>
        <div className="mt-8 flex w-full items-center justify-center px-2 py-10">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent className="m-0 flex w-full">
              {content.data.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="px-2 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="group relative flex h-full max-h-[700px] w-full flex-col items-end justify-between text-ellipsis">
                    <div className="h-full bg-foreground w-full rounded-3xl flex items-center justify-center p-10 mb-5">
                      <img
                        className="w-full opacity-100 transition-all ease-in-out group-hover:scale-90 group-hover:opacity-60"
                        src={item.image}
                        alt={item.title}
                      />
                    </div>
                    <div className="flex w-full items-center text-foreground justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <h5 className="text-xl font-medium leading-6 tracking-tighter transition-all ease-in-out group-hover:translate-x-4">
                          {item.title}
                        </h5>
                        <p className="text-sm text-foreground/80 line-clamp-2 transition-all ease-in-out group-hover:translate-x-4">
                          {item.description}
                        </p>
                      </div>
                      <div className="relative z-10 cursor-pointer">
                        <Button
                          variant="outline"
                          size={"icon"}
                          className="hover:bg-accent/90 bg-foreground text-background h-8 w-8 rounded-full transition-all ease-in-out"
                        >
                          {item.icon}
                        </Button>
                      </div>
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

              <div className="relative mr-10 flex gap-2 mt-10">
                <CarouselPrevious className="h-10 w-10 bg-background text-accent hover:text-background hover:bg-accent/90 border border-accent" />
                <CarouselNext
                  variant="default"
                  className="h-10 w-10 bg-accent text-background hover:bg-accent/90"
                />
              </div>
            </div>
          </Carousel>
        </div>
      </Wrapper>
    </section>
  );
};

export default Features;
