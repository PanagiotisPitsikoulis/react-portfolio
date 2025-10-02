import React from "react";
import { ArrowRight, Shield, Users, Zap } from "lucide-react";
import Wrapper from "@/components/chromaui/section/wrapper/component";
import { theme } from "@/components/chromaui/themes";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { HomePageProps } from ".";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { author, socialLinks } from "../../../content/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  FastAnimation,
  MediumAnimation,
  SlowAnimation,
} from "@/components/chromaui/section/animation/component";
export type HeroImage = { src: string; alt: string; href?: string };

const stats = [
  {
    icon: <Users className="size-6 stroke-1 opacity-20 md:size-10" />,
    title: "+100k",
    description: "Daily Users",
  },
  {
    icon: <Zap className="size-6 stroke-1 opacity-20 md:size-10" />,
    title: "99.9%",
    description: "Uptime ",
  },
  {
    icon: <Shield className="size-6 stroke-1 opacity-20 md:size-10" />,
    title: "24/7",
    description: " Support",
  },
];

const Hero: React.FC<HomePageProps> = (props) => {
  const circle1Images = [
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/nextjs-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vue-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vite-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/spotify-icon.svg",
  ];

  const circle2Images = [
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/typescript-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-icon.svg",
  ];

  const circle3Images = [
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/notion-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/github-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/slack-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/laravel-icon.svg",
  ];

  const circle4Images = [
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/gatsby-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/dropbox-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/brave-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vscode-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/sketch-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/google-icon.svg",
  ];

  const content = props.landingContent.hero;

  return (
    <section
      className="relative border-b w-screen overflow-hidden lg:pb-32 bg-background text-foreground 2xl:max-h-[calc(100vh-5rem)]"
      style={theme.primary}
    >
      <Wrapper className="relative flex flex-col lg:flex-row py-32 pt-20">
        <div className="space-y-6 lg:w-1/2 relative">
          <FastAnimation>
            <div className="flex flex-row gap-4 items-end">
              <Link href={content.secondaryCta.href}>
                <Button
                  size={"lg"}
                  className="bg-accent text-background hover:bg-accent/90"
                >
                  {content.secondaryCta.label}
                  <ArrowRight />
                </Button>
              </Link>
              <Link href={content.primaryCta.href}>
                <Button
                  className="bg-background text-accent border border-accent hover:text-accent/90 hover:bg-background"
                  size={"lg"}
                >
                  {content.primaryCta.label}
                </Button>
              </Link>
            </div>
          </FastAnimation>

          <MediumAnimation delay={0.1}>
            <h1 className="font-calSans mt-3 text-6xl font-medium lg:text-7xl">
              {content.title}{" "}
              <span className="text-accent">{content.titleColored}</span>
            </h1>
          </MediumAnimation>
          <SlowAnimation delay={0.2}>
            <p className="text-muted-foreground max-w-lg text-xl drop-shadow">
              {content.subtitle}
            </p>
          </SlowAnimation>
          <FastAnimation delay={0.3}>
            <div className="flex mt-14 -space-x-3">
              <Link
                href="https://www.linkedin.com/in/panagiotis-pitsikoulis-47141733a/"
                target="_blank"
              >
                <Avatar className="size-12 ring-2 ring-background z-40 bg-foreground/10 cursor-pointer">
                  <AvatarFallback className="bg-foreground text-background">
                    <FontAwesomeIcon icon={faLinkedin} className="size-5" />
                  </AvatarFallback>
                </Avatar>
              </Link>
              <Link
                href="https://github.com/PanagiotisPitsikoulis"
                target="_blank"
              >
                <Avatar className="size-12 ring-2 ring-background z-30 bg-foreground/10 cursor-pointer">
                  <AvatarFallback className="bg-foreground text-background">
                    <FontAwesomeIcon icon={faGithub} className="size-5" />
                  </AvatarFallback>
                </Avatar>
              </Link>
              <Link href="https://x.com/panos_dev_" target="_blank">
                <Avatar className="size-12 ring-2 ring-background z-20 bg-foreground/10 cursor-pointer">
                  <AvatarFallback className="bg-foreground text-background">
                    <FontAwesomeIcon icon={faTwitter} className="size-5" />
                  </AvatarFallback>
                </Avatar>
              </Link>
              <Link href="https://www.instagram.com/panospitsi" target="_blank">
                <Avatar className="size-12 ring-2 ring-background bg-foreground/10 cursor-pointer z-10">
                  <AvatarFallback className="bg-foreground text-background">
                    <FontAwesomeIcon icon={faInstagram} className="size-5" />
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </FastAnimation>
        </div>
        <div className="h-112 relative lg:w-1/2">
          <div className="rounded-full relative -left-35 lg:left-0 flex h-[1100px] w-[1500px] flex-col items-center justify-center lg:absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              className="pointer-events-none absolute inset-0 size-full"
            >
              <circle
                className="fill-foreground"
                cx="50%"
                cy="50%"
                r={550}
                fill="none"
              />
            </svg>
            <OrbitingCircles iconSize={40} radius={310} speed={2}>
              {circle1Images.map((src, index) => (
                <div key={index} className="size-12">
                  <img src={src} className="size-full object-contain" alt="" />
                </div>
              ))}
            </OrbitingCircles>
            <OrbitingCircles iconSize={40} radius={390} reverse speed={2}>
              {circle2Images.map((src, index) => (
                <div key={index} className="size-12">
                  <img src={src} className="size-full object-contain" alt="" />
                </div>
              ))}
            </OrbitingCircles>
            <OrbitingCircles iconSize={40} radius={470} speed={2}>
              {circle3Images.map((src, index) => (
                <div key={index} className="size-12">
                  <img src={src} className="size-full object-contain" alt="" />
                </div>
              ))}
            </OrbitingCircles>
            <OrbitingCircles iconSize={40} radius={550} reverse speed={1}>
              {circle4Images.map((src, index) => (
                <div key={index} className="size-12">
                  <img src={src} className="size-full object-contain" alt="" />
                </div>
              ))}
            </OrbitingCircles>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Hero;
