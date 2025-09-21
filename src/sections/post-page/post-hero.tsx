"use client";

import { ExternalLink } from "lucide-react";
import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import type { ContentItem } from "@/lib/md/mdx";
import Image from "next/image";

interface PostHeroProps {
  post: ContentItem;
}

export default function PostHero({ post }: PostHeroProps) {
  const title = useMemo(() => post.frontmatter.title || post.slug, [post]);
  const subtitle = useMemo(
    () => post.frontmatter.summary || post.frontmatter.metaDescription || "",
    [post],
  );
  const isProject = useMemo(
    () =>
      post.postType ? post.postType === "project" : post.type === "projects",
    [post],
  );
  const hasExternalUrl = useMemo(
    () => Boolean(isProject && post.frontmatter.url),
    [isProject, post.frontmatter.url],
  );
  const imageSrc = useMemo(
    () =>
      hasExternalUrl
        ? post.screenshots?.mobile ||
          post.frontmatter.cover ||
          "/images/Silhouette Flower Art.webp"
        : post.frontmatter.cover ||
          post.screenshots?.desktop ||
          "/images/Silhouette Flower Art.webp",
    [
      hasExternalUrl,
      post.screenshots?.mobile,
      post.screenshots?.desktop,
      post.frontmatter.cover,
    ],
  );
  const url = useMemo(
    () => (isProject ? post.frontmatter.url : undefined),
    [isProject, post.frontmatter.url],
  );
  const tags = useMemo(
    () =>
      post.mergedTags || [
        ...(post.frontmatter.tags || []),
        ...(post.frontmatter.categories || []),
      ],
    [post.mergedTags, post.frontmatter.tags, post.frontmatter.categories],
  );
  const date = useMemo(
    () => (post.frontmatter.date ? String(post.frontmatter.date) : undefined),
    [post.frontmatter.date],
  );
  const formattedDate = useMemo(
    () =>
      date
        ? new Date(date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })
        : undefined,
    [date],
  );

  const hasButton = isProject && hasExternalUrl;
  const primaryCtaHref = hasButton ? url : undefined;

  const mobileImages = useMemo(
    () => (post.imagesMobile || []).filter(Boolean) as string[],
    [post.imagesMobile],
  );
  const marqueeImages = useMemo(
    () => (mobileImages.length > 0 ? mobileImages : [imageSrc]),
    [mobileImages, imageSrc],
  );
  const { visibleTags, hiddenTags } = useMemo(() => {
    const tagList = (tags ?? []) as string[];
    return {
      visibleTags: tagList.slice(0, 3),
      hiddenTags: tagList.slice(3),
    };
  }, [tags]);

  return (
    <div className="lg:h-svh relative overflow-hidden">
      <section className="relative pt-20">
        <div className="object-cover absolute -z-30 bg-background w-full h-svh -mt-[5rem]" />
        <div className="object-cover absolute -z-10 w-full h-svh -mt-[5rem]" />
        <Image
          src={"/gradients/blue-circle.svg"}
          alt={"Background gradient"}
          fill
          className="object-fit absolute rotate-180 -z-20"
        />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-24 gap-6 items-center overflow-visible">
            <div className="w-full lg:col-span-6 lg:pb-0 pb-10 md:order-first relative">
              <div className="flex flex-col">
                <div className="text-left lg:max-w-xl">
                  <div className="text-muted-foreground flex items-center flex-wrap justify-center lg:justify-start gap-2 rounded-full p-1 pr-3 text-sm font-medium tracking-tight">
                    <div className="bg-secondary/40 rounded-full px-3 py-1.5 text-xs space-x-2">
                      <span className="inline-block size-2 rounded-full bg-primary" />
                      <span>{isProject ? "Project" : "Blog"}</span>
                    </div>
                    {formattedDate ? (
                      <div className="bg-secondary/40 rounded-full px-3 py-1.5 text-xs">
                        {formattedDate}
                      </div>
                    ) : null}
                  </div>
                  {tags?.length ? (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {visibleTags.map((t: string) => {
                        return (
                          <Badge
                            key={t}
                            variant="secondary"
                            className={`capitalize text-[10px] py-0.5 px-2 rounded-full font-medium bg-secondary/40 text-foreground`}
                          >
                            {t}
                          </Badge>
                        );
                      })}
                      {hiddenTags.length > 0 ? (
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Badge
                              variant="secondary"
                              className="text-[10px] py-0.5 px-2 rounded-full font-medium bg-secondary/40 text-foreground"
                            >
                              +{hiddenTags.length}
                            </Badge>
                          </HoverCardTrigger>
                          <HoverCardContent className="p-2 space-x-1">
                            <div className="flex flex-wrap gap-1">
                              {hiddenTags.map((t: string) => {
                                return (
                                  <Badge
                                    key={t}
                                    variant="secondary"
                                    className={`capitalize text-[10px] py-0.5 px-2 rounded-full font-medium bg-secondary/40 text-foreground`}
                                  >
                                    {t}
                                  </Badge>
                                );
                              })}
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      ) : null}
                    </div>
                  ) : null}
                </div>
                <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl text-foreground font-manrope">
                  {title}
                </h1>

                {subtitle ? (
                  <p className="text-foreground mb-8 max-w-sm lg:text-left text-lg">
                    {subtitle}
                  </p>
                ) : null}

                {hasButton && (
                  <div className="flex flex-col md:flex-row lg:justify-start justify-center mt-5 relative">
                    <Button
                      size={"lg"}
                      variant={"default"}
                      asChild={Boolean(primaryCtaHref)}
                    >
                      <Link
                        href={primaryCtaHref!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        Visit project
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full lg:col-span-6 flex justify-start lg:justify-start relative z-10 h-[50svh] sm:h-[60svh] lg:h-svh">
              <MarqueeHero images={marqueeImages} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import Link from "next/link";

function MobileShot({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className={cn(
        "relative w-[15svw] aspect-[9/19.5] rounded-4xl border-stone-900 border-8 shadow-xl",
        "shrink-0",
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 28vw, (max-width: 1024px) 18vw, 14vw"
        className="object-cover rounded-3xl border-8 border-black"
        priority={false}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export function MarqueeHero({ images }: { images: string[] }) {
  const firstRow = images
    .filter(Boolean)
    .slice(0, Math.ceil(images.length / 2));
  const secondRow = images.filter(Boolean).slice(Math.ceil(images.length / 2));
  const alt = "Project mobile screenshot";
  return (
    <div className="relative flex w-full flex-row items-center justify-center overflow-hidden -mt-[20rem]">
      <Marquee pauseOnHover vertical className="[--duration:18s]">
        {firstRow.map((src, idx) => (
          <MobileShot key={src + idx} src={src} alt={alt} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="[--duration:18s]">
        {secondRow.length > 0
          ? secondRow.map((src, idx) => (
              <MobileShot key={src + idx} src={src} alt={alt} />
            ))
          : firstRow.map((src, idx) => (
              <MobileShot key={src + idx} src={src} alt={alt} />
            ))}
      </Marquee>
    </div>
  );
}
