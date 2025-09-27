"use client";

import { GalleryThreeD } from "@/components/chromaui/gallery/gallery-three-d";
import { PostLayout } from "@/components/chromaui/layout/content-page/post-layout";
import { ToC } from "@/components/chromaui/markdown/toc";
import { Carousel } from "@/components/chromaui/section/carousel/component";
import { Divider } from "@/components/chromaui/section/divider/divider";
import { Hero } from "@/components/chromaui/section/hero/component";
import type { ContentItem } from "@/lib/md/mdx";
import { MDXContent } from "@/lib/md/render-mdx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TechCloud } from "./tech-cloud";

export default function PostPageClient({
  post,
  mdx,
}: {
  post: ContentItem;
  mdx: any;
}) {
  const isProject =
    post.postType ? post.postType === "project" : post.type === "projects";

  const images = [
    post.heroImageDesktop,
    ...(post.imagesDesktop || []),
    post.frontmatter.cover,
  ].filter(Boolean) as string[];

  // Extract post data for Hero component
  const title = post.frontmatter.title || post.slug;
  const subtitle =
    post.frontmatter.summary || post.frontmatter.metaDescription || "";
  const hasExternalUrl = Boolean(isProject && post.frontmatter.url);
  const imageSrc =
    hasExternalUrl ?
      post.screenshots?.mobile || post.frontmatter.cover || ""
    : post.frontmatter.cover || post.screenshots?.desktop || "";
  const url = isProject ? post.frontmatter.url : undefined;
  const tags = post.mergedTags || [
    ...(post.frontmatter.tags || []),
    ...(post.frontmatter.categories || []),
  ];
  const date =
    post.frontmatter.date ? String(post.frontmatter.date) : undefined;
  const formattedDate =
    date ?
      new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : undefined;

  const hasButton = isProject && hasExternalUrl;
  const primaryCtaHref = hasButton ? url : undefined;

  const mobileImages = (post.imagesMobile || []).filter(Boolean) as string[];
  const marqueeImages = mobileImages.length > 0 ? mobileImages : [imageSrc];

  // Convert tags to badge format
  const badges = tags.map((tag: string) => ({
    label: tag,
    variant: "secondary" as const,
  }));

  // Convert metadata
  const metadata = [
    {
      label: isProject ? "Project" : "Blog",
      value: isProject ? "Project" : "Blog",
    },
    ...(formattedDate ? [{ label: "", value: formattedDate }] : []),
  ];

  // Convert CTA
  const cta =
    hasButton ?
      {
        label: "Visit project",
        href: primaryCtaHref!,
        external: true,
        variant: "default" as const,
        size: "lg" as const,
      }
    : undefined;

  // Create carousel images for mobile shots
  const carouselImages = marqueeImages.map((src, index) => ({
    src,
    alt: `Project mobile screenshot ${index + 1}`,
    className: "aspect-[9/16] object-cover min-h-[10svh] lg:min-h-[30svh]",
  }));

  return (
    <PostLayout
      hero={
        <div className="relative">
          <div className="object-cover absolute -z-40 bg-background w-full h-svh" />
          <div className="object-cover absolute -z-10 w-full h-svh" />
          <Hero
            title={title}
            backgroundImages={[
              {
                src: imageSrc,
                alt: "Background image",
              },
            ]}
            subtitle={subtitle}
            badges={badges}
            metadata={metadata}
            cta={cta}
            variant="heading-left-content-right"
            content={
              <Carousel
                images={carouselImages}
                variant="double"
                direction="vertical"
                pauseOnHover={true}
                duration="18s"
                desktopHeight="lg:h-svh"
                className="relative flex w-full flex-row items-center justify-center overflow-hidden"
              />
            }
            headingClassName="flex flex-col"
            contentClassName="relative z-10"
          />
        </div>
      }
      isHeroDark={true}
      widgets={[
        <div key="title-section">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {post.frontmatter.title}
          </h1>
          <p className="text-foreground mb-6">{post.frontmatter.summary}</p>
        </div>,
        <TechCloud key="tech-cloud" tech={post.frontmatter.tags || []} />,
        <Divider key="gallery-divider" className="my-10" label="Gallery" />,
        <GalleryThreeD key="gallery" images={images} />,
        <Divider
          key="content-divider"
          label={post.frontmatter.title}
          className="mt-20 mb-10"
        />,
        ...(isProject && post.frontmatter.github ?
          [
            <div key="github-card" className="my-10">
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
            </div>,
          ]
        : []),
      ]}
      toc={<ToC content={post.body} />}
    >
      <ClientOnlyMDX mdx={mdx} />
    </PostLayout>
  );
}

function ClientOnlyMDX({ mdx }: { mdx: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <MDXContent source={mdx as any} />;
}
