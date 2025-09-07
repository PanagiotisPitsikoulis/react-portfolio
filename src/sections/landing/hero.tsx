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
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { backgroundImages, socialLinks } from "../../../content/data";

type HeroImage = { src: string; alt: string; href?: string };
type HeroCta = {
  label: string;
  href: string;
  variant?: "default" | "secondary" | "outline";
};

export interface HeroProps {
  title: string;
  subtitle: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  images: HeroImage[];
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  images,
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

  const isMobile = useIsMobile();

  return (
    <section className="relative z-40 -mb-20 py-10">
      <style>{css}</style>
      <div className="mt-4 flex flex-col items-center justify-center gap-4 overflow-hidden text-left xl:mt-14 xl:flex-row xl:overflow-visible">
        <div className="w-full space-y-10 xl:w-1/2 xl:mr-10">
          <div className="flex items-center gap-2 text-muted-foreground">
            {socialLinks.map((s, i) => (
              <Link
                key={i}
                href={s.href}
                aria-label={s.label}
                className="hover:text-primary p-2 rounded-full bg-muted border"
              >
                {(() => {
                  const icon =
                    (s as any).icon?.toLowerCase() || s.label.toLowerCase();
                  if (icon.includes("github"))
                    return <FaGithub className="size-4" />;
                  if (icon.includes("twitter") || icon.includes("x"))
                    return <FaTwitter className="size-4" />;
                  if (icon.includes("linkedin"))
                    return <FaLinkedin className="size-4" />;
                  if (icon.includes("instagram"))
                    return <FaInstagram className="size-4" />;
                  return <FaLinkedin className="size-4" />;
                })()}
              </Link>
            ))}
          </div>

          <h1 className="text-foreground -mt-3 text-5xl xl:text-6xl font-medium tracking-tight">
            {title}
          </h1>
          <p className="text-muted-foreground/90 mt-2 max-w-lg text-xl">
            {subtitle}
          </p>
          <div className="flex gap-4">
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
                  <>
                    {image.src && (
                      <SwiperSlide
                        key={index}
                        className="max-md:p-5 max-md:mt-20"
                      >
                        <div className="cardEnhance relative overflow-hidden rounded-4xl shadow">
                          <Image
                            src={
                              backgroundImages.length
                                ? backgroundImages[
                                    index % backgroundImages.length
                                  ]
                                : backgroundImages[0]
                            }
                            alt={image.alt + " bg"}
                            fill
                            className="object-cover relative -z-10 saturate-0"
                          />
                          <div className="relative z-10 p-3">
                            {image.href ? (
                              <Link
                                href={image.href}
                                aria-label={image.alt}
                                prefetch={false}
                              >
                                <Iphone15Pro
                                  className="h-full w-full dark"
                                  src={image.src}
                                />
                              </Link>
                            ) : (
                              <Iphone15Pro
                                className="h-full w-full dark"
                                src={image.src}
                              />
                            )}
                          </div>
                        </div>
                      </SwiperSlide>
                    )}
                  </>
                ))}
              </Swiper>
            )}
          </div>
          <div className="absolute inset-0 flex h-full w-full items-center justify-between -z-10 rounded-3xl overflow-clip">
            {Array.from({ length: isMobile ? 8 : 18 }).map((_, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                key={index}
                className="to-muted/50 h-full w-10 bg-gradient-to-l from-transparent"
              ></motion.div>
            ))}
          </div>
          <div className="-z-10 bg-muted dark:bg-muted xl:h-[20rem] xl:w-9/10 absolute right-0 top-0 h-full w-full rounded-3xl xl:top-1/2 xl:mt-4 xl:-translate-y-1/2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
