"use client";

import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type HeroImage = { src: string; alt: string };
type HeroCta = {
  label: string;
  href: string;
  variant?: "default" | "secondary" | "outline";
};

export interface HeroProps {
  badgeText: string;
  badgeHref: string;
  title: string;
  subtitle: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  images: HeroImage[];
}

const Hero: React.FC<HeroProps> = ({
  badgeText,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  images,
  badgeHref,
}) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const css = `
  .mySwiperHero231 {
    width: 100%;
    height: 100%;
    padding-bottom: 50px;
    overflow: visible;
  }

  .mySwiperHero231 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 240px;
    margin-top: 24px;
    height: 320px;
    position: relative;
  }

  .mySwiperHero231 .swiper-slide img {
    display: block;
    width: 100%;
  }

  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  .swiper-pagination {
    bottom: 10px !important;
    width: 100% !important;
    left: 0% !important;
    position: relative;
    z-index: 20;
  }
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background-color: hsl(var(--foreground) / 0.8);
    border: 2px solid hsl(var(--background));
    border-radius: 9999px;
  }
  
  .swiper-pagination-bullet-active {
    background-color: hsl(var(--primary));
    border: 2px solid hsl(var(--background));
  }

  @media (min-width: 768px) {
    .swiper-pagination {
      width: fit-content !important;
      left: 80% !important;
    }
    .mySwiperHero231 .swiper-slide {
      width: 300px;
      margin-top: 60px;
      height: 420px;
    }
  }

  `;

  return (
    <section className="relative z-40">
      <style>{css}</style>
      <div className="mt-4 flex flex-col items-center justify-center gap-4 overflow-hidden text-left xl:mt-14 xl:flex-row xl:overflow-visible">
        <div className="w-full space-y-10 xl:w-1/2">
          <Link href={badgeHref}>
            <Button
              variant="secondary"
              className="items-left bg-muted/70 group flex w-fit justify-center gap-3 rounded-full px-5 py-1"
            >
              <span className="bg-foreground size-2.5 rounded-full" />
              {badgeText}
            </Button>
          </Link>
          <h1 className="text-foreground mt-12 text-5xl font-medium tracking-tight md:text-6xl">
            {title}
          </h1>
          <p className="text-muted-foreground/90 mt-2 max-w-lg text-xl">
            {subtitle}
          </p>
          <div className="flex gap-4 xl:mt-32">
            <Link href={secondaryCta.href}>
              <Button
                variant={secondaryCta.variant ?? "secondary"}
                className="group flex w-fit items-center justify-center gap-2 rounded-full px-4 py-1 tracking-tight"
              >
                <span>{secondaryCta.label}</span>
                <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:ml-3 group-hover:rotate-0" />
              </Button>
            </Link>
            <Link href={primaryCta.href}>
              <Button
                variant={primaryCta.variant ?? "default"}
                className="group flex w-fit items-center justify-center gap-2 rounded-full px-4 py-1 tracking-tight"
              >
                <span>{primaryCta.label}</span>
                <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:ml-3 group-hover:rotate-0" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="h-145 relative w-full xl:mt-0 xl:w-3/5">
          <div className="mx-auto flex h-full items-center justify-center overflow-hidden">
            {domLoaded && (
              <Swiper
                spaceBetween={20}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView="auto"
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 1.5,
                }}
                className="mySwiperHero231"
                modules={[EffectCoverflow, Autoplay, Pagination]}
                pagination={{ clickable: true }}
                breakpoints={{
                  768: {
                    slidesPerView: 2.438,
                    spaceBetween: 50,
                    coverflowEffect: {
                      rotate: 0,
                      stretch: 0,
                      depth: 100,
                      modifier: 2.5,
                    },
                  },
                }}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      fill
                      className="h-full w-full overflow-hidden rounded-3xl object-cover shadow-lg max-md:mt-20"
                      src={image.src}
                      alt={image.alt}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          <div className="-z-10 bg-muted xl:h-155 xl:w-9/10 absolute right-0 top-0 h-full w-full rounded-3xl xl:top-1/2 xl:mt-4 xl:-translate-y-1/2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
