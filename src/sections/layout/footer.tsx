"use client";
import { AppIcon } from "@/components/app-icon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import {
  author,
  backgroundImages,
  socialLinks as dataSocialLinks,
  metadata,
} from "../../../content/data";
import { ContentNavItem } from "./app-sidebar";

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  projects?: ContentNavItem[];
  blog?: ContentNavItem[];
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const mapIcon = (icon?: string, label?: string) => {
  const l = (icon || label || "").toLowerCase();
  if (l.includes("instagram")) return <FaInstagram className="size-5" />;
  if (l.includes("facebook")) return <FaFacebook className="size-5" />;
  if (l.includes("twitter") || l.includes("x"))
    return <FaTwitter className="size-5" />;
  if (l.includes("github")) return <FaGithub className="size-5" />;
  if (l.includes("linkedin")) return <FaLinkedin className="size-5" />;
  return <FaLinkedin className="size-5" />;
};

const defaultSocialLinks = dataSocialLinks.map((s) => ({
  icon: mapIcon((s as any).icon, s.label),
  href: s.href,
  label: s.label,
}));

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "/blog/terms" },
  { name: "Privacy Policy", href: "/blog/privacy" },
];

const defaultCompanyLinks = [
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

const Footer = ({
  logo = {
    url: "https://www.example.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "My Next.js App",
  },
  projects = [],
  blog = [],
  description = "A collection of projects and blog posts for your inspiration.",
  socialLinks = defaultSocialLinks,
  copyright = `© ${new Date().getFullYear()} ${
    author.name
  }. All rights reserved.`,
  legalLinks = defaultLegalLinks,
}: FooterProps) => {
  const sections = [
    {
      title: "Projects",
      links: projects.map((item) => ({
        name: item.title,
        href: item.url,
      })),
    },
    {
      title: "Blog",
      links: blog.map((item) => ({
        name: item.title,
        href: item.url,
      })),
    },
  ];

  return (
    <section className="pt-10 pb-5 page-container">
      <div>
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left border-t mt-2 pt-6">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <Link href="/" className="flex flex-row gap-2">
              <AppIcon />
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">{metadata.title as string}</span>
                <span className="text-muted-foreground/90 text-sm">
                  {metadata.description}
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground max-w-[70%] text-sm">
              {description}
            </p>
            <ul className="text-muted-foreground flex items-center space-x-6">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="hover:text-primary font-medium">
                  <Link href={social.href} aria-label={social.label}>
                    {social.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="text-muted-foreground space-y-3 text-sm">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-primary font-medium"
                    >
                      <Link href={link.href}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="text-muted-foreground mt-8 flex flex-col justify-between gap-4 border-t pt-2 text-xs font-medium md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-primary">
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto flex items-center justify-center">
          <Carousel
            plugins={[Autoplay({ delay: 1500 })]}
            opts={{ loop: true, align: "start" }}
          >
            <CarouselContent>
              {backgroundImages.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="translate-y-18 relative flex basis-1/2 cursor-grab justify-center active:cursor-grabbing sm:basis-1/4 md:basis-1/3 lg:basis-1/5 h-[200px]"
                >
                  <div className="easeOut hover:-translate-y-18 mt-auto w-full overflow-hidden rounded-t-3xl border transition-all">
                    <img
                      src={image}
                      alt={image}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Footer;
