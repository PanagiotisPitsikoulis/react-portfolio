"use client";

import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

import { Safari } from "@/components/magicui/safari";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { backgroundImages } from "../../../content/data";

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
                  <Link
                    href={img.link}
                    className="group block"
                    rel="noopener noreferrer"
                  >
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-md backdrop-blur-[2px] transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 md:p-8">
                      <Image
                        src={backgroundImages[index]}
                        alt={img.title + " bg"}
                        fill
                        className="object-cover relative -z-10"
                      />
                      <div className="relative z-10">
                        <Safari
                          className="mx-auto h-full w-full max-md:mt-10 dark"
                          imageSrc={img.image}
                        />
                      </div>
                      {/* bottom overlay title/desc/cta */}
                      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 md:p-6">
                        <h3 className="line-clamp-1 text-lg font-semibold tracking-tight text-white md:text-xl">
                          {img.title}
                        </h3>
                        <p className="line-clamp-2 text-xs text-white/80 md:text-sm">
                          {img.description}
                        </p>
                        <div className="mt-3">
                          <Button
                            variant="default"
                            className="text-xs group inline-flex items-center gap-2 rounded-full px-3 py-1 tracking-tight md:text-sm"
                          >
                            {img.ctaLabel}
                            <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:ml-1.5 group-hover:rotate-0" />
                          </Button>
                        </div>
                      </div>
                      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
                    </div>
                  </Link>
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
