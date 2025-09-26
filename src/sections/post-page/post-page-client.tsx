"use client";

import type { ContentItem } from "@/lib/md/mdx";
import { MDXContent } from "@/lib/md/render-mdx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PostHero from "./post-hero";
import { GalleryThreeD } from "@/components/chromaui/gallery/gallery-three-d";
import { ToC } from "@/components/chromaui/md/toc";
import { SectionDivider } from "@/components/section-divider";
import { TechCloud } from "./tech-cloud";

export default function PostPageClient({
  post,
  mdx,
}: {
  post: ContentItem;
  mdx: any;
}) {
  const isProject = post.postType
    ? post.postType === "project"
    : post.type === "projects";

  const images = [
    post.heroImageDesktop,
    ...(post.imagesDesktop || []),
    post.frontmatter.cover,
  ].filter(Boolean) as string[];

  return (
    <article>
      <div className="dark">
        <PostHero post={post} />
      </div>

      <div className="bg-background pt-10 pb-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-row gap-10 relative">
          <div className="max-w-2xl">
            <h1 className="my-6 text-4xl font-bold text-foreground">
              {post.frontmatter.title}
            </h1>
            <p className="text-foreground mb-8">{post.frontmatter.summary}</p>
            <TechCloud tech={post.frontmatter.tags || []} />
            <SectionDivider className="my-10" label="Gallery" />
            <GalleryThreeD images={images} />
            <SectionDivider
              label={post.frontmatter.title}
              className="mt-20 mb-10"
            />

            <ClientOnlyMDX mdx={mdx} />
            {isProject && (
              <div className="my-10">
                {post.frontmatter.github && (
                  <Link href={post.frontmatter.github} target="_blank">
                    <Image
                      src={`https://opengraph.githubassets.com/1/${
                        post.frontmatter.github?.split("/")[3]
                      }/${post.frontmatter.github?.split("/")[4]}`}
                      width={1200}
                      height={600}
                      className="rounded-3xl shadow-xl w-1/2"
                      alt="GitHub Repository Preview"
                    />
                  </Link>
                )}
              </div>
            )}
          </div>
          <ToC content={post.body} />
        </div>
      </div>
    </article>
  );
}

function ClientOnlyMDX({ mdx }: { mdx: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <MDXContent source={mdx as any} />;
}
