"use client";
import { ContentItem } from "@/lib/md/mdx";
import RenderResponsively from "../misc/render-responsively";
import CarouselDesktop from "./carousel-desktop";
import CarouselMobile from "./carousel-mobile";

export type ProjectPreviewItems = ContentItem[] | ContentItem;

export type ProjectPreviewProps = {
  items: ProjectPreviewItems;
  forceMobile?: boolean;
};

export default function ProjectPreview({
  items,
  forceMobile,
}: ProjectPreviewProps) {
  return (
    <RenderResponsively forceMobile={forceMobile}>
      <CarouselMobile items={items} />
      <CarouselDesktop items={items} />
    </RenderResponsively>
  );
}
