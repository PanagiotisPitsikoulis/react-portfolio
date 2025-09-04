"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";

import { Safari } from "@/components/magicui/safari";
import { Button } from "@/components/ui/button";

interface PostHeroProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  url?: string;
  isProject: boolean;
  hasExternalUrl: boolean;
  tags?: string[];
}

export default function PostHero({
  title,
  subtitle,
  imageSrc,
  url,
  isProject,
  hasExternalUrl,
  tags,
}: PostHeroProps) {
  const isMobile = useIsMobile();

  const hasButton = isProject && hasExternalUrl;
  const primaryCtaHref = isProject && hasExternalUrl ? url : undefined;

  return (
    <section className="relative grid overflow-hidden pt-5 rounded-t-3xl my-5 w-full">
      <div className="relative z-10 h-full grid-cols-1 items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="bg-muted-foreground/5 text-muted-foreground mb-10 flex items-center flex-wrap justify-center gap-3 rounded-full p-1 pr-4 text-sm font-medium tracking-tight">
            <div className="bg-muted-foreground/10 flex items-center gap-3 rounded-full px-4 py-1.5">
              <span className="inline-block size-2 rounded-full bg-blue-500" />
              <span>{isProject ? "Project" : "Blog"}</span>
            </div>
            {(tags as string[]).map((tag: string) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1 text-xs capitalize"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="max-w-2xl text-5xl font-semibold tracking-tighter lg:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-muted-foreground mt-10 max-w-lg">{subtitle}</p>
          ) : null}

          {hasButton && (
            <div className="mt-10 flex w-full flex-col items-center justify-center gap-2">
              <Button
                asChild={Boolean(primaryCtaHref)}
                className="text-background rounded-2xl px-8 py-6 shadow-[0px_1px_3px_#0000001a,inset_0px_2px_0px_#ffffff40] md:rounded-3xl md:px-8 md:py-7 md:text-base"
              >
                <a
                  href={primaryCtaHref!}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {isProject && hasExternalUrl ? (
                    <ExternalLink className="mr-2 size-5" />
                  ) : null}
                  {title}
                </a>
              </Button>
            </div>
          )}
        </div>
        <div className="relative mt-10 flex w-full items-center justify-center overflow-hidden p-4">
          <Safari
            className="mx-auto h-full w-full"
            imageSrc={imageSrc}
            url={url}
          />
        </div>
      </div>
      <div className="absolute inset-0 flex h-full w-full items-center justify-between">
        {Array.from({ length: isMobile ? 8 : 18 }).map((_, index) => (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            key={index}
            className="to-muted/50 h-full w-10 bg-gradient-to-l from-transparent"
          ></motion.div>
        ))}
      </div>
    </section>
  );
}
