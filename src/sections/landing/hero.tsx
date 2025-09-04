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

import Iphone15Pro from "@/components/magicui/iphone-15-pro";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { backgroundImages } from "../../../content/data";

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
    width: 260px;
    margin-top: 24px;
    height: 360px; /* slightly less tall */
    position: relative;
  }

  .mySwiperHero231 .swiper-slide img {
    display: block;
    width: 100%;
  }

  /* Subtle card enhancements */
  .mySwiperHero231 .swiper-slide .cardEnhance {
    transition: transform .25s ease, box-shadow .25s ease, filter .25s ease;
    filter: saturate(.95);
  }
  .mySwiperHero231 .swiper-slide-active .cardEnhance {
    transform: translateY(-4px) scale(1.02);
    filter: saturate(1);
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
      width: 340px; /* wider on desktop */
      margin-top: 60px;
      height: 460px; /* slightly less tall */
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
          {/* Minimal background wave pattern */}
          <div className="mx-auto flex h-full items-center justify-center overflow-hidden">
            {domLoaded && (
              <Swiper
                spaceBetween={28}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={1.35}
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
                  <SwiperSlide key={index} className="max-md:p-5 max-md:mt-20">
                    <div className="cardEnhance relative overflow-hidden rounded-4xl shadow">
                      <Image
                        src={backgroundImages[index]}
                        alt={image.alt + " bg"}
                        fill
                        className="object-cover relative -z-10"
                      />
                      <div className="relative z-10 p-5">
                        <Iphone15Pro
                          className="h-full w-full dark"
                          src={image.src}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          <div className="-z-10 bg-muted dark:bg-muted/30 xl:h-[30rem] xl:w-9/10 absolute right-0 top-0 h-full w-full rounded-3xl xl:top-1/2 xl:mt-4 xl:-translate-y-1/2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
