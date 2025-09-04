"use client";

import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

import { Safari } from "@/components/magicui/safari";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
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
    <section className="pt-16">
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
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-md backdrop-blur-[2px] transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 md:p-8">
                      <Image
                        src={backgroundImages[index]}
                        alt={img.title + " bg"}
                        fill
                        className="object-cover relative -z-10"
                      />
                      <div className="relative z-10">
                        <Safari
                          className="mx-auto h-full w-full max-md:mt-10"
                          // imageSrc={img.image}
                        />
                      </div>
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
