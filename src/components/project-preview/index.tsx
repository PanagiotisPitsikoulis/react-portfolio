"use client";
import { ContentItem } from "@/lib/md/mdx";
import { useMemo } from "react";
import RenderResponsively from "../misc/render-responsively";
import CarouselIphone from "./carousel-iphone";
import CarouselSafari from "./carousel-safari";

export type ProjectPreviewItems = ContentItem[] | ContentItem;

export type ProjectPreviewProps = {
  items: ProjectPreviewItems;
  forceMobile?: boolean;
  className?: string;
  isSingleProjectCarousel?: boolean;
  isLink?: boolean;
};

export default function ProjectPreview({
  items,
  forceMobile,
  className,
  isSingleProjectCarousel,
  isLink = false,
}: ProjectPreviewProps) {
  if (isSingleProjectCarousel && Array.isArray(items) && items.length > 1) {
    throw new Error(
      "isSingleProjectCarousel is true but items length is greater than 1"
    );
  }

  // Base list when not single-project mode
  const listItems: ContentItem[] = useMemo(() => {
    return Array.isArray(items)
      ? (items as ContentItem[])
      : ([items as ContentItem] as ContentItem[]);
  }, [items]);

  // Build separate feeds for mobile (iPhone) and desktop (Safari) when single-project mode
  const singleMobileItems: ContentItem[] = useMemo(() => {
    if (!isSingleProjectCarousel) return listItems;
    if (Array.isArray(items)) return items as ContentItem[];
    const single = items as ContentItem;
    const mobileList = (
      single.imagesMobile && single.imagesMobile.length > 0
        ? single.imagesMobile
        : [single.frontmatter.cover || "/images/Silhouette Flower Art.webp"]
    ).filter(Boolean) as string[];
    return mobileList.map((src) => ({
      ...single,
      heroImageMobile: src,
      frontmatter: { ...single.frontmatter, cover: src },
    }));
  }, [isSingleProjectCarousel, items, listItems]);

  const singleDesktopItems: ContentItem[] = useMemo(() => {
    if (!isSingleProjectCarousel) return listItems;
    if (Array.isArray(items)) return items as ContentItem[];
    const single = items as ContentItem;
    const desktopList = (
      single.imagesDesktop && single.imagesDesktop.length > 0
        ? single.imagesDesktop
        : [single.frontmatter.cover || "/images/Silhouette Flower Art.webp"]
    ).filter(Boolean) as string[];
    return desktopList.map((src) => ({
      ...single,
      heroImageDesktop: src,
      frontmatter: { ...single.frontmatter, cover: src },
    }));
  }, [isSingleProjectCarousel, items, listItems]);

  return (
    <RenderResponsively forceMobile={forceMobile} className={className}>
      <CarouselIphone
        items={isSingleProjectCarousel ? singleMobileItems : listItems}
        isLink={isLink}
      />
      <CarouselSafari
        items={isSingleProjectCarousel ? singleDesktopItems : listItems}
        isLink={isLink}
      />
    </RenderResponsively>
  );
}
