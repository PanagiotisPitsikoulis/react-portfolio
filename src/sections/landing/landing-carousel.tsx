"use client";

import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export type LandingCarouselItem = {
  image: string;
  title: string;
  description: string;
  link: string;
  ctaLabel: string;
};

export interface LandingCarouselProps {
  items: LandingCarouselItem[];
}

const LandingCarousel: React.FC<LandingCarouselProps> = ({ items }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const dotCount = useMemo(() => items.length, [items.length]);

  return (
    <section>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            loop: true,
            slidesToScroll: 1,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: true,
              stopOnMouseEnter: true,
            }),
          ]}
        >
          <CarouselContent className="flex w-full gap-4">
            {items.map((img, index) => (
              <CarouselItem key={index} className="w-full basis-[91%]">
                <div className="p-1">
                  <div className="h-166 bg-muted relative flex flex-col items-end justify-between p-8">
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-full">
                      <img
                        src={img.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mt-42 z-10 text-white">
                      <h1 className="max-w-lg text-right text-6xl font-medium tracking-tight">
                        {img.title}
                      </h1>
                      <p className="my-6 max-w-lg text-right text-lg">
                        {img.description}
                      </p>
                    </div>
                    <div className="bg-muted00 z-10 flex w-full justify-between">
                      <a href={img.link}>
                        <Button
                          variant="outline"
                          className="text-md group flex w-fit items-center justify-center gap-2 rounded-full px-4 py-1 tracking-tight"
                        >
                          {img.ctaLabel}
                          <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:ml-3 group-hover:rotate-0" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: dotCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  current === index
                    ? "bg-primary w-4"
                    : "bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </motion.div>
    </section>
  );
};

export default LandingCarousel;
