"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import type { ContentItem, ContentType } from "@/lib/md/mdx";
import { buildMosaicImages } from "@/lib/utils";
import { backgroundImages } from "../../../content/data";
import { theme } from "@/components/chromaui/themes";

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
    <section
      className="relative border border-b w-screen overflow-hidden lg:pb-32 bg-background text-foreground lg:h-[50svh]"
      style={theme.primary}
    ></section>
  );
};

export default PostViewerHero;
