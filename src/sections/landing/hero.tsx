import React from "react";
import { ArrowRight, Shield, Users, Zap } from "lucide-react";
import Wrapper from "@/components/chromaui/section/wrapper/component";
import { theme } from "@/components/chromaui/themes";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { HomePageProps } from ".";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
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

  const stats = [
    {
      icon: <Users className="size-6 stroke-1.5 text-background md:size-7" />,
      title: "+100k",
      description: "Daily Users",
    },
    {
      icon: <Zap className="size-6 stroke-1.5 text-background md:size-7" />,
      title: "99.9%",
      description: "Uptime ",
    },
    {
      icon: <Shield className="size-6 stroke-1.5 text-background md:size-7" />,
      title: "24/7",
      description: " Support",
    },
  ];

  const content = props.landingContent.hero;

  return (
    <section
      className="relative border-b w-screen overflow-hidden lg:pb-32 bg-background text-foreground 2xl:max-h-[calc(100vh-5rem)]"
      style={theme.primary}
    >
      <Wrapper className="relative flex flex-col lg:flex-row py-32 pt-20">
        <div className="space-y-6 lg:w-1/2">
          <div className="flex flex-row gap-4 items-end">
            <Link href={content.secondaryCta.href}>
              <Button
                size={"lg"}
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                {content.secondaryCta.label}
                <ArrowRight />
              </Button>
            </Link>
            <Link href={content.primaryCta.href}>
              <Button size={"lg"}>{content.primaryCta.label}</Button>
            </Link>
          </div>
          <h1 className="font-calSans mt-3 max-w-lg text-6xl font-medium lg:text-7xl">
            {content.title}
          </h1>
          <p className="text-muted-foreground max-w-lg text-lg">
            {content.subtitle}
          </p>

          <ul className="mt-10 flex flex-wrap gap-12">
            {content.stats.map((stat, index) => (
              <li key={stat.value} className="flex items-center gap-4 mr-4">
                <div className="md:size-16 bg-foreground flex size-12 items-center justify-center rounded-full text-background">
                  {stat.icon}
                </div>
                <div>
                  <h2 className="font-calSans text-2xl font-medium md:text-3xl">
                    {stat.value}
                  </h2>
                  <p className="text-sm md:text-base">{stat.label}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-112 relative lg:w-1/2">
          <div className="relative -left-35 lg:left-0 flex h-[1100px] w-[1500px] flex-col items-center justify-center lg:absolute">
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
