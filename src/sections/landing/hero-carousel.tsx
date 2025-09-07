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
          className="absolute -bottom-10 -right-10 z-0 rounded-3xl overflow-hidden"
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
        <div className="relative mt-16 flex h-full items-center justify-center rounded-4xl bg-stone-900 p-2 shadow">
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
    </section>
  );
};

export default HeroCarousel;
