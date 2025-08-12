"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Hero = () => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
      alt: "Portrait of Joanna Doe in urban setting",
      name: "Joanna Doe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
      alt: "Portrait of Joan Doe in natural lighting",
      name: "Joan Doe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
      alt: "Portrait of Sarah Chen in studio setting",
      name: "Sarah Chen",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
      alt: "Portrait of Joanna Doe in urban setting",
      name: "Joanna Doe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
      alt: "Portrait of Joan Doe in natural lighting",
      name: "Joan Doe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
      alt: "Portrait of Sarah Chen in studio setting",
      name: "Sarah Chen",
    },
  ];

  const css = `
  .mySwiperHero231 {
    width: 100%;
    height: 100%;
    padding-bottom: 50px;
  }

  .mySwiperHero231 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    margin-top: 60px;
    height: 420px;
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
  }
  .swiper-pagination-bullet-active {
    background-color: var(--primary);
  }

  @media (min-width: 768px) {
    .swiper-pagination {
      width: fit-content !important;
      left: 80% !important;
    }
  }

  `;

  return (
    <section>
      <style>{css}</style>
      <div className="container mt-4 flex flex-col items-center justify-center gap-4 overflow-hidden text-left xl:mt-14 xl:flex-row xl:overflow-visible">
        <div className="w-full space-y-10 xl:w-1/2">
          <Button
            variant="secondary"
            className="items-left bg-muted/70 group flex w-fit justify-center gap-3 rounded-full px-5 py-1"
          >
            <span className="bg-foreground size-2.5 rounded-full" />
            Flexible Plan customized for you
          </Button>
          <h1 className="font-calSans text-foreground mt-12 text-5xl font-medium tracking-tight md:text-7xl">
            Blocks Built <br /> With Shadcn & Tailwind.
          </h1>
          <p className="text-muted-foreground/80 mt-3 max-w-lg">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
            id voluptates sed doloremque voluptas dolor laudantium eaque ex.
          </p>
          <div className="flex gap-4 xl:mt-32">
            <Button
              variant="secondary"
              className="group flex w-fit items-center justify-center gap-2 rounded-full px-4 py-1 tracking-tight"
            >
              <span>Documentation</span>
              <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:ml-3 group-hover:rotate-0" />
            </Button>
            <Button
              variant="default"
              className="group flex w-fit items-center justify-center gap-2 rounded-full px-4 py-1 tracking-tight"
            >
              <span>Get Started</span>
              <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:ml-3 group-hover:rotate-0" />
            </Button>
          </div>
        </div>
        <div className="h-145 relative w-full xl:mt-0 xl:w-3/5">
          <div className="mx-auto flex h-full items-center justify-center">
            {domLoaded && (
              <Swiper
                spaceBetween={50}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={2.438}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                className="mySwiperHero231"
                modules={[EffectCoverflow, Autoplay, Pagination]}
                pagination={{ clickable: true }}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className="h-full w-full overflow-hidden rounded-3xl object-cover shadow-lg"
                      src={image.src}
                      alt={image.alt}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          <div className="-z-1 bg-muted xl:h-155 xl:w-9/10 absolute right-0 top-0 h-full w-full rounded-3xl xl:top-1/2 xl:mt-4 xl:-translate-y-1/2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
