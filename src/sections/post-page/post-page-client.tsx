"use client";

import type { ContentItem } from "@/lib/md/mdx";
import { MDXContent } from "@/lib/md/render-mdx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PostHero from "./post-hero";
import { TableOfContents } from "./toc";

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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-row gap-20 relative">
          <div className="max-w-xl">
            <ClientOnlyMDX mdx={mdx} />
            {isProject && (
              <div className="mt-20">
                {post.frontmatter.github && (
                  <Link href={post.frontmatter.github} target="_blank">
                    <Image
                      src={`https://opengraph.githubassets.com/1/${
                        post.frontmatter.github?.split("/")[3]
                      }/${post.frontmatter.github?.split("/")[4]}`}
                      width={1200}
                      height={600}
                      className="rounded-xl shadow"
                      alt="GitHub Repository Preview"
                    />
                  </Link>
                )}
              </div>
            )}
          </div>
          <TableOfContents content={post.body} />
        </div>
      </div>
    </article>
  );
}

function ClientOnlyMDX({ mdx }: { mdx: any }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <MDXContent source={mdx} />;
}
