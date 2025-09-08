"use client";
import { ContentItem } from "@/lib/md/mdx";
import RenderResponsively from "../misc/render-responsively";
import CarouselIphone from "./carousel-iphone";
import CarouselSafari from "./carousel-safari";

export type ProjectPreviewItems = ContentItem[] | ContentItem;

export type ProjectPreviewProps = {
  items: ProjectPreviewItems;
  forceMobile?: boolean;
  className?: string;
};

export default function ProjectPreview({
  items,
  forceMobile,
  className,
}: ProjectPreviewProps) {
  return (
    <RenderResponsively forceMobile={forceMobile} className={className}>
      <CarouselIphone items={items} />
      <CarouselSafari items={items} />
    </RenderResponsively>
  );
}
