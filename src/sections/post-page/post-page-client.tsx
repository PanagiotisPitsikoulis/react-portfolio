"use client";

import ProjectPreview from "@/components/project-preview";
import { SectionDivider } from "@/components/section-divider";
import type { ContentItem } from "@/lib/md/mdx";
import { MDXContent } from "@/lib/md/render-mdx";
import { useEffect, useState } from "react";
import PostHero from "./post-hero";

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

  return (
    <div className="relative flex flex-col justify-between gap-6 lg:flex-row">
      <article className="w-full max-w-5xl mx-auto">
        <PostHero post={post} />
        {isProject && (post.imagesDesktop?.length || 0) > 0 ? (
          <div className="mt-6">
            <ProjectPreview
              items={post}
              isSingleProjectCarousel={true}
              className="w-full"
              isLink
            />
          </div>
        ) : null}
        <SectionDivider label={post.frontmatter.title} />
        <div className="max-w-2xl">
          {/* Avoid SSR MDX hydration issues */}
          <ClientOnlyMDX mdx={mdx} />
        </div>
      </article>
    </div>
  );
}

function ClientOnlyMDX({ mdx }: { mdx: any }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <MDXContent source={mdx} />;
}
