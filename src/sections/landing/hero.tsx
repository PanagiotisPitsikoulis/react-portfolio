import { ArrowRight } from "lucide-react";
import React from "react";

import ProjectPreview from "@/components/sidelib/project-preview";
import { Button } from "@/components/ui/button";
import { ContentItem } from "@/lib/md/mdx";
import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { socialLinks } from "../../../content/data";

export type HeroImage = { src: string; alt: string; href?: string };
type HeroCta = {
  label: string;
  href: string;
  variant?: "default" | "secondary" | "outline";
};

export interface HeroProps {
  title: string;
  subtitle: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  items: ContentItem[];
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  items,
}) => {
  return (
    <section className="relative z-40 -mb-20 py-10">
      <div className="mt-4 flex flex-col items-center justify-center gap-4 overflow-hidden text-left xl:mt-14 xl:flex-row xl:overflow-visible">
        <div className="w-full space-y-10 xl:w-1/2 xl:mr-10">
          <div className="flex items-center gap-2 text-muted-foreground">
            {socialLinks.map((s, i) => (
              <Link
                key={i}
                href={s.href}
                aria-label={s.label}
                className="hover:text-primary p-2 rounded-full bg-muted"
              >
                {(() => {
                  const icon =
                    (s as any).icon?.toLowerCase() || s.label.toLowerCase();
                  if (icon.includes("github"))
                    return <FaGithub className="size-4" />;
                  if (icon.includes("twitter") || icon.includes("x"))
                    return <FaTwitter className="size-4" />;
                  if (icon.includes("linkedin"))
                    return <FaLinkedin className="size-4" />;
                  if (icon.includes("instagram"))
                    return <FaInstagram className="size-4" />;
                  return <FaLinkedin className="size-4" />;
                })()}
              </Link>
            ))}
          </div>

          <h1 className="text-foreground -mt-3 text-5xl xl:text-6xl font-medium tracking-tight">
            {title}
          </h1>
          <p className="text-muted-foreground/90 mt-2 max-w-lg text-xl">
            {subtitle}
          </p>
          <div className="flex gap-4">
            <Link href={secondaryCta.href}>
              <Button
                variant={secondaryCta.variant ?? "secondary"}
                className="group flex w-fit items-center justify-center gap-2 rounded-full px-4 py-1 tracking-tight"
              >
                <span>{secondaryCta.label}</span>
                <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:ml-3 group-hover:rotate-0" />
              </Button>
            </Link>
            <Link href={primaryCta.href}>
              <Button
                variant={primaryCta.variant ?? "default"}
                className="group flex w-fit items-center justify-center gap-2 rounded-full px-4 py-1 tracking-tight"
              >
                <span>{primaryCta.label}</span>
                <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:ml-3 group-hover:rotate-0" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="min-h-145 relative w-full xl:mt-0 xl:w-3/5">
          <div className="mx-auto flex h-full items-center justify-center">
            <ProjectPreview items={items} forceMobile isLink />
          </div>
          <div className="absolute inset-0 flex h-full w-full items-center justify-between -z-10 rounded-4xl overflow-hidden bg-background">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="to-muted h-full w-10 bg-gradient-to-l from-transparent"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
