// app/(sidebar)/_footer.tsx
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ContentNavItem } from "./app-sidebar";
import Link from "next/link";
import { ScreenShare } from "lucide-react";
import { metadata } from "@/lib/data";

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

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "#", label: "Instagram" },
  { icon: <FaFacebook className="size-5" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="size-5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
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
  copyright = `© ${new Date().getFullYear()} My Next.js App. All rights reserved.`,
  legalLinks = defaultLegalLinks,
}: FooterProps) => {
  // Define sections dynamically, including Projects and Blog
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
    {
      title: "Company",
      links: defaultCompanyLinks,
    },
  ];

  return (
    <section className="pt-10 pb-5">
      <div className="px-6 lg:px-12">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <Link href="/" className="flex flex-row gap-2">
              <div className="bg-black dark:bg-white text-white dark:text-black flex aspect-square size-8 items-center justify-center rounded-full">
                <ScreenShare className="size-4" />
              </div>
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
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
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
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="text-muted-foreground mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-primary">
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Footer;
