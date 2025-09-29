"use client";

import { PostLayout } from "@/components/chromaui/layout/content-page/post-layout";
import { ToC } from "@/components/chromaui/markdown/toc";
import {
  CommonHeroProps,
  Hero,
} from "@/components/chromaui/section/hero/component";
import { Section } from "@/components/chromaui/section/section";
import type { ContentItem } from "@/lib/md/mdx";
import { MDXContent } from "@/lib/md/render-mdx";
import { useEffect, useState } from "react";
import { Logos10 } from "./logos";
import { Safari } from "@/components/ui/safari";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Iphone } from "@/components/ui/iphone";
import { DottedDiv } from "@/components/chromaui/section/dotted-div/component";
import Image from "next/image";

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

  // Extract post data for Hero component
  const title = post.frontmatter.title || post.slug;
  const subtitle = post.frontmatter.summary || "";
  const hasExternalUrl = Boolean(isProject && post.frontmatter.url);
  const url = isProject ? post.frontmatter.url : undefined;
  const tags = post.mergedTags || [...(post.frontmatter.tags || [])];
  const date = post.frontmatter.date
    ? String(post.frontmatter.date)
    : undefined;
  const formattedDate = date
    ? new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : undefined;

  const hasButton = isProject && hasExternalUrl;
  const primaryCtaHref = hasButton ? url : undefined;

  const mobileImages = (post.imagesMobile || []).filter(Boolean) as string[];
  const baseImages =
    mobileImages.length > 0 ? mobileImages : [post.frontmatter.cover || ""];
  // Ensure we have enough images for smooth scrolling
  const marqueeImages =
    baseImages.length > 0
      ? [...baseImages, ...baseImages, ...baseImages, ...baseImages]
      : Array(8)
          .fill(post.frontmatter.cover || "")
          .filter(Boolean);

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
  const cta: Pick<CommonHeroProps, "cta">[] = [
    hasButton && {
      label: "Visit project",
      href: primaryCtaHref!,
      external: true,
      variant: "default" as const,
      size: "lg" as const,
    },
    post.frontmatter.github && {
      label: "GitHub",
      href: post.frontmatter.github!,
      external: true,
      variant: "outline" as const,
      size: "lg" as const,
    },
  ].filter(Boolean) as any;

  return (
    <PostLayout
      hero={
        <Hero
          title={title}
          enableParallax={true}
          backgroundImages={[
            {
              src: post.frontmatter.backgroundImage || "",
              alt: "Background image",
              className: "object-cover absolute -z-30 opacity-70",
              parallax: {
                enabled: true,
                direction: "up",
                speed: 0.5,
                yRange: ["-50%", "50%"],
              },
            },
            {
              src: "/texture.svg",
              alt: "Decorative Texture Overlay",
              className: "object-fit absolute -z-20 opacity-80",
              parallax: {
                enabled: true,
                direction: "up",
                speed: 0.5,
                yRange: ["-50%", "50%"],
              },
            },
          ]}
          subtitle={subtitle}
          badges={badges}
          metadata={metadata}
          cta={cta as any}
          variant="heading-left-content-right"
        />
      }
      toc={<ToC content={post.body} />}
      tocContent={post.body}
      contentAbove={
        <>
          <Section
            variant="secondary"
            padding="lg"
            heading={{
              title:
                "Discover how our tools have unlocked new levels of creativity and efficiency",
              variant: "highlighted",
              highlightText: "levels of creativity",
            }}
          >
            <DottedDiv className="mb-20" hideTopLines>
              <Safari
                url={post.frontmatter.url}
                imageSrc={post.frontmatter.cover}
                className="max-lg:hidden"
              />
              <Iphone
                src={post.frontmatter.screenshotMobile}
                className="lg:hidden"
              />
            </DottedDiv>
          </Section>
          <Section
            variant="background"
            fullWidthChildren
            className="border-y"
            padding="lg"
            heading={{
              title:
                "Technology and tools used to build " + post.frontmatter.title,
              variant: "highlighted",
              highlightText: post.frontmatter.title,
            }}
          >
            <Logos10 />
          </Section>
        </>
      }
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
