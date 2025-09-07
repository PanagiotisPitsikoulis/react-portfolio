"use client";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import { backgroundImages } from "../../../content/data";
import { HeroImage } from "./hero";

const HeroCarousel = ({ images }: { images: HeroImage[] }) => {
  const css = `
  .swiper {
  width: 250px;
  height: 480px;
  border-radius: 30px;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
}
`;

  return (
    <section className="dark -mt-10">
      <style>{css}</style>
      <div className="relative">
        <div
          className="absolute -bottom-10 -right-10 z-0"
          style={{ width: 250, height: 480 }}
        >
          <div className="relative w-full h-full">
            <Image
              src={backgroundImages[0]}
              alt={"Decorative background"}
              fill
              className="object-cover shadow"
              draggable={false}
              priority={false}
            />
          </div>
        </div>
        <div className="relative mt-16 flex h-full items-center justify-center">
          <div className="relative mx-auto border-stone-950 dark:border-stone-900 bg-stone-950 border-[14px] rounded-[2.5rem] h-[510px] w-[275px]">
            <div className="h-[32px] w-[3px] bg-stone-950 dark:bg-stone-700 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-stone-950 dark:bg-stone-700 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-stone-950 dark:bg-stone-700 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] bg-stone-950 dark:bg-stone-700 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-[250px] h-[480px] bg-white dark:bg-stone-900">
              <Swiper
                loop={true}
                grabCursor={true}
                className="bg-muted"
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: true,
                }}
                effect="creative"
                pagination={{
                  clickable: true,
                }}
                creativeEffect={{
                  prev: {
                    shadow: true,
                    origin: "left center",
                    translate: ["-5%", 0, -200],
                    rotate: [0, 100, 0],
                  },
                  next: {
                    origin: "right center",
                    translate: ["5%", 0, -200],
                    rotate: [0, -100, 0],
                  },
                }}
                modules={[EffectCreative, Pagination, Autoplay]}
              >
                {images.map((image, idx) => (
                  <SwiperSlide key={idx}>
                    <Image
                      width={250}
                      height={480}
                      className="h-full w-full object-top object-cover bg-black p-2"
                      src={image.src}
                      alt={image.alt}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
