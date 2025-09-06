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

export interface PostCarouselProps {
  images: string[];
  projectUrl?: string;
}

export default function PostCarousel({
  images,
  projectUrl,
}: PostCarouselProps) {
  if (!images || images.length === 0) return null;

  return (
    <Carousel className="w-full" plugins={[Autoplay({ delay: 2000 })]}>
      <CarouselContent>
        {images.map((src, idx) => (
          <CarouselItem key={src + idx}>
            <div className="relative mt-0 flex w-full items-center justify-center overflow-hidden p-4">
              <Safari
                className="mx-auto h-full w-full"
                imageSrc={src}
                url={projectUrl}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
