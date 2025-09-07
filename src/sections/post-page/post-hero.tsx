"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";

import { Safari } from "@/components/magicui/safari";
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
  const isMobile = useIsMobile();
  const title = post.frontmatter.title || post.slug;
  const subtitle =
    post.frontmatter.summary || post.frontmatter.metaDescription || "";
  const isProject = post.postType
    ? post.postType === "project"
    : post.type === "projects";
  const hasExternalUrl = Boolean(isProject && post.frontmatter.url);
  const imageSrc = hasExternalUrl
    ? post.screenshots?.desktop ||
      post.frontmatter.cover ||
      "/images/window.png"
    : post.frontmatter.cover ||
      post.screenshots?.desktop ||
      "/images/window.png";
  const url = isProject ? post.frontmatter.url : undefined;
  const tags = post.mergedTags || [
    ...(post.frontmatter.tags || []),
    ...(post.frontmatter.categories || []),
  ];
  const date = post.frontmatter.date
    ? String(post.frontmatter.date)
    : undefined;

  const hasButton = isProject && hasExternalUrl;
  const primaryCtaHref = hasButton ? url : undefined;

  return (
    <section className="relative grid overflow-hidden pt-5 my-5 w-full">
      <div className="relative z-10 h-full grid-cols-1 items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="bg-muted-foreground/5 text-muted-foreground mb-10 flex items-center flex-wrap justify-center gap-2 rounded-full p-1 pr-3 text-sm font-medium tracking-tight">
            <div className="bg-muted-foreground/10 flex items-center gap-3 rounded-full px-3 py-1.5">
              <span className="inline-block size-2 rounded-full bg-blue-500" />
              <span>{isProject ? "Project" : "Blog"}</span>
            </div>
            {date ? (
              <div className="bg-muted-foreground/10 rounded-full px-3 py-1.5 text-xs">
                {new Date(date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </div>
            ) : null}
            {tags?.length
              ? (() => {
                  const tagList = (tags ?? []) as string[];
                  const visible: string[] = tagList.slice(0, 3);
                  const hidden: string[] = tagList.slice(3);
                  return (
                    <div className="flex flex-wrap gap-1.5">
                      {visible.map((t: string) => (
                        <Badge
                          key={t}
                          variant="secondary"
                          className="capitalize text-[10px] py-0.5 px-1.5"
                        >
                          {t}
                        </Badge>
                      ))}
                      {hidden.length > 0 ? (
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Badge
                              variant="secondary"
                              className="text-[10px] py-0.5 px-1.5"
                            >
                              +{hidden.length}
                            </Badge>
                          </HoverCardTrigger>
                          <HoverCardContent className="p-2 space-x-1">
                            <div className="flex flex-wrap gap-1">
                              {hidden.map((t: string) => (
                                <Badge
                                  key={t}
                                  variant="secondary"
                                  className="capitalize text-[10px] py-0.5 px-1.5"
                                >
                                  {t}
                                </Badge>
                              ))}
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      ) : null}
                    </div>
                  );
                })()
              : null}
          </div>
          <h1 className="max-w-2xl text-5xl font-semibold tracking-tighter lg:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-muted-foreground mt-10 max-w-lg">{subtitle}</p>
          ) : null}

          {hasButton && (
            <div className="mt-10 flex w-full flex-col items-center justify-center gap-2">
              <Button size={"lg"} asChild={Boolean(primaryCtaHref)}>
                <a
                  href={primaryCtaHref!}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {isProject && hasExternalUrl ? (
                    <ExternalLink className="mr-2 size-4" />
                  ) : null}
                  {title}
                </a>
              </Button>
            </div>
          )}
        </div>
        <div className="relative mt-10 flex w-full items-center justify-center overflow-hidden p-4">
          {isProject && hasExternalUrl ? (
            <Safari imageSrc={imageSrc} width={1400} height={900} url={url} />
          ) : (
            <Image
              width={1400}
              height={900}
              src={imageSrc}
              alt={title}
              className="mx-auto h-full w-full rounded-xl border bg-background object-cover aspect-video"
              sizes="(max-width: 768px) 100vw, 1203px"
              priority={false}
              draggable={false}
            />
          )}
        </div>
      </div>
      <div className="absolute inset-0 flex h-full w-full items-center justify-between">
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            key={index}
            className="to-muted/50 dark:to-muted/20 h-full w-10 bg-gradient-to-l from-transparent"
          ></motion.div>
        ))}
      </div>
    </section>
  );
}
