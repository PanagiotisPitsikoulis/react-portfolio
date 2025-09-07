"use client";

import { Safari } from "@/components/magicui/safari";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import { SectionDivider } from "@/components/section-divider";
import type { ContentItem } from "@/lib/md/mdx";

export interface PostCarouselProps {
  post: ContentItem;
}

export default function PostCarousel({ post }: PostCarouselProps) {
  const images = post.imagesDesktop || [];
  console.log(images);
  const projectUrl =
    post.postType === "project" ? post.frontmatter.url : undefined;
  if (!images || images.length === 0) return null;

  return (
    <>
      <SectionDivider label="Screenshots" />
      <Carousel className="w-full" plugins={[Autoplay({ delay: 2000 })]}>
        <CarouselContent>
          {images.map((src: string, idx: number) => (
            <CarouselItem key={src + idx}>
              <div className="relative mt-0 flex w-full items-center justify-center overflow-hidden p-4">
                <Safari
                  imageSrc={src}
                  width={1400}
                  height={900}
                  url={projectUrl}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
