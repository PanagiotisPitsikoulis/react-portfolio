"use client";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ContentItem } from "@/lib/md/mdx";
import Image from "next/image";
import Link from "next/link";
import { ProjectPreviewProps } from ".";
import { backgroundImages } from "../../../content/data";
import RenderConditionally from "../misc/render-conditionally";

const CarouselIphoneMany = ({
  items,
  isLink = false,
}: {
  items: ContentItem[];
  isLink?: boolean;
}) => {
  const css = `
  .swiper {
  width: 400px;
  height: 650px;
  background-color: transparent;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
}

/* Hide Swiper pagination dots */
.swiper .swiper-pagination,
.swiper-pagination {
  display: none !important;
}
`;

  return (
    <section className="-ml-10">
      <style>{css}</style>
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
        {items.map((item, i) => (
          <SwiperSlide className="-mt-14" key={i}>
            <CarouselIphoneSingle item={item} index={i} isLink={isLink} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

const CarouselIphoneSingle = ({
  item,
  index,
  isLink = false,
}: {
  item: ContentItem;
  index?: number;
  isLink?: boolean;
}) => {
  return (
    <div className="relative -mt-10">
      <div
        className="absolute -bottom-10 -right-10 z-0"
        style={{ width: 250, height: 480 }}
      >
        <div className="relative w-full h-full">
          <Image
            src={backgroundImages[index ?? 0 % backgroundImages.length]}
            alt={"Decorative background"}
            fill
            className="object-cover rounded-3xl"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
            draggable={false}
          />
        </div>
      </div>
      <div className="relative mt-16 flex h-full items-center justify-center">
        <div className="relative mx-auto border-stone-950 dark:border-black bg-black border-[14px] rounded-[2.5rem] h-[510px] w-[275px]">
          <div className="h-[32px] w-[3px] bg-stone-950 dark:bg-stone-700 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
          <div className="h-[46px] w-[3px] bg-stone-950 dark:bg-stone-700 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
          <div className="h-[46px] w-[3px] bg-stone-950 dark:bg-stone-700 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
          <div className="h-[64px] w-[3px] bg-stone-950 dark:bg-stone-700 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
          <div className="rounded-[2rem] overflow-hidden w-[250px] h-[480px] bg-white dark:bg-stone-900">
            <RenderConditionally condition={isLink}>
              <Link href={`/projects/${item.slug}`}>
                <Image
                  width={250}
                  height={480}
                  priority={index === 0}
                  className="h-full w-full object-top object-cover bg-black p-2"
                  src={
                    item.heroImageMobile ||
                    item.frontmatter.cover ||
                    "/images/Silhouette Flower Art.webp"
                  }
                  alt={item.frontmatter.title || ""}
                />
              </Link>
              <Image
                width={250}
                height={480}
                priority={index === 0}
                className="h-full w-full object-top object-cover bg-black p-2"
                src={
                  item.heroImageMobile ||
                  item.frontmatter.cover ||
                  "/images/Silhouette Flower Art.webp"
                }
                alt={item.frontmatter.title || ""}
              />
            </RenderConditionally>
          </div>
        </div>
      </div>
    </div>
  );
};

const CarouselIphone: React.FC<ProjectPreviewProps & { isLink?: boolean }> = ({
  items,
  isLink = false,
}) => {
  return (
    <RenderConditionally
      condition={Array.isArray(items) && items.length > 1}
      className="dark max-w-lg mx-auto overflow-hidden"
    >
      <CarouselIphoneMany
        items={Array.isArray(items) ? items : [items]}
        isLink={isLink}
      />
      <CarouselIphoneSingle
        item={Array.isArray(items) ? items[0] : items}
        isLink={isLink}
      />
    </RenderConditionally>
  );
};

export default CarouselIphone;
