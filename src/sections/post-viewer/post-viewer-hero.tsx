"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import type { ContentItem, ContentType } from "@/lib/md/mdx";
import { buildMosaicImages } from "@/lib/utils";
import Image from "next/image";
import { backgroundImages } from "../../../content/data";

export interface PostViewerHeroProps {
  title: string;
  description: string;
  posts: ContentItem[];
  contentType: ContentType;
}

const PostViewerHero = ({
  title,
  description,
  posts,
  contentType,
}: PostViewerHeroProps) => {
  const images = posts
    .flatMap((p) => {
      const src = p.heroImageDesktop || p.frontmatter.cover;
      return src || [];
    })
    .slice(0, 30);
  return (
    <section className="relative pt-20">
      <Image
        fill
        alt="background"
        src="/square-alt-grid.svg"
        className="absolute  inset-0 z-0 select-none [mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
        draggable={false}
      />
      <div className="flex flex-col items-center justify-center gap-5 text-center">
        <p className="bg-muted w-fit rounded-full px-4 py-1 text-xs uppercase tracking-wide">
          {title}
        </p>
        <h2 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight lg:max-w-3xl lg:text-4xl">
          {description}
        </h2>
        <div className="mt-8 flex h-full w-full items-center justify-center rounded-3xl overflow-clip">
          <ThreeDMarquee
            className="rounded-none"
            images={buildMosaicImages(images, backgroundImages, { length: 30 })}
          />
        </div>
      </div>
    </section>
  );
};

export default PostViewerHero;
