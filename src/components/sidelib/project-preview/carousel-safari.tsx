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
import { ContentItem } from "@/lib/md/mdx";
import Image from "next/image";
import Link from "next/link";
import { backgroundImages } from "../../../../content/data";
import RenderConditionally from "../render-conditionally";
import { ProjectPreviewProps } from "./index";

export interface CarouselSafariProps {
  items: ContentItem[];
  isLink?: boolean;
}

export interface CarouselSafariPropsSingle {
  item: ContentItem;
  index?: number;
}

const CarouselSafariSingle: React.FC<
  CarouselSafariPropsSingle & { isLink?: boolean }
> = ({ item, index, isLink = false }) => {
  return (
    <div className="p-1">
      <div className="block">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] dark:border-white/10 md:p-8">
          <Image
            src={backgroundImages[index ?? 5 % backgroundImages.length]}
            alt={`${item.frontmatter.title} bg`}
            fill
            className="object-cover -z-10"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
          <div className="relative z-10">
            <RenderConditionally condition={isLink}>
              <Link href={`/projects/${item.slug}`}>
                <Safari
                  priority={index === 0}
                  className="mx-auto h-full w-full max-md:mt-10 max-md:-mx-10"
                  imageSrc={
                    item.heroImageDesktop ||
                    item.frontmatter.cover ||
                    "/images/Silhouette Flower Art.webp"
                  }
                  url={item.frontmatter.url}
                />
              </Link>
              <Safari
                priority={index === 0}
                className="mx-auto h-full w-full max-md:mt-10 max-md:-mx-10"
                imageSrc={
                  item.heroImageDesktop ||
                  item.frontmatter.cover ||
                  "/images/Silhouette Flower Art.webp"
                }
                url={item.frontmatter.url}
              />
            </RenderConditionally>
          </div>
        </div>
      </div>
    </div>
  );
};

const CarouselSafariMany: React.FC<CarouselSafariProps> = ({
  items,
  isLink = false,
}) => {
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
    <section className="pt-6">
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
            {items.map((project, index) => (
              <CarouselItem key={index} className="w-full basis-[91%]">
                <CarouselSafariSingle
                  item={project}
                  index={index}
                  isLink={isLink}
                />
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

const CarouselSafari: React.FC<ProjectPreviewProps & { isLink?: boolean }> = ({
  items,
  isLink = false,
}) => {
  return (
    <RenderConditionally condition={Array.isArray(items) && items.length > 1}>
      <CarouselSafariMany
        items={Array.isArray(items) ? items : [items]}
        isLink={isLink}
      />
      <CarouselSafariSingle
        item={Array.isArray(items) ? items[0] : items}
        isLink={isLink}
      />
    </RenderConditionally>
  );
};

export default CarouselSafari;
