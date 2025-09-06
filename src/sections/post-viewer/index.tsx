import { ContentType, listContent } from "@/lib/md/mdx";
import { Suspense } from "react";
import PostViewerClient from "./post-viewer-client";

export default async function PostViewer(props: {
  contentType: ContentType;
  title: string;
  description: string;
}) {
  const posts = await listContent(props.contentType);
  // Use featured projects for hero only; show all in main grid
  const heroSource =
    props.contentType === "projects"
      ? posts.filter((p) => Boolean(p.frontmatter.featured))
      : posts;

  const heroImages = heroSource
    .flatMap((p) => {
      if (props.contentType !== "projects") {
        return [p.frontmatter.cover || "/default-cover.png"] as Array<
          string | { src: string; href?: string }
        >;
      }
      // Desktop-only screenshots in hero
      const shots = (p.screenshots?.desktop ? [p.screenshots.desktop] : []).map(
        (src) => ({
          src,
          href: p.frontmatter.url ? `/projects/${p.slug}` : undefined,
        })
      );
      const routeShots = (p.screenshots?.routes || [])
        .map((r) => r.desktop)
        .filter(Boolean)
        .map((src) => ({
          src: src as string,
          href: p.frontmatter.url ? `/projects/${p.slug}` : undefined,
        }));
      const carousel = ((p.frontmatter as any).carousel || []).map(
        (src: string) => ({
          src,
          href: p.frontmatter.url ? `/projects/${p.slug}` : undefined,
        })
      );
      const cover = p.frontmatter.cover
        ? [
            {
              src: p.frontmatter.cover,
              href: p.frontmatter.url ? `/projects/${p.slug}` : undefined,
            },
          ]
        : [];

      // If project has no URL and only a cover (no screenshots/carousel), skip it in hero
      const hasUrl = Boolean(p.frontmatter.url);
      if (
        !hasUrl &&
        shots.length === 0 &&
        routeShots.length === 0 &&
        carousel.length === 0
      ) {
        return [];
      }

      const all = [...shots, ...routeShots, ...carousel, ...cover];
      return all.length > 0 ? all : ["/default-cover.png"];
    })
    .slice(0, 60);

  return (
    <Suspense fallback={<></>}>
      <PostViewerClient {...props} posts={posts} heroImages={heroImages} />
    </Suspense>
  );
}
