import { Home, NotebookPen, PresentationIcon, Send } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Panos",
  description: "Full-stack developer",
};

export const author = {
  name: "Panos Pitsikoulis",
  avatar: "/author.jpeg",
};

export const siteMetadata = {
  // Core
  title: "Portfolio Panos",
  description: "Full-stack developer",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  language: "en-us",
  keywords: [
    "portfolio",
    "software engineer",
    "full-stack",
    "react",
    "next.js",
  ],

  twitter: {
    handle: "@panos_dev_",
    cardType: "summary_large_image" as const,
  },
  images: {
    ogImage: "/og-image.jpg",
    logo: "/logo.svg",
  },

  // Content sections
  blogBasePath: "/blog",
  projectsBasePath: "/projects",
  includeBlogInSitemap: true,
  includeProjectsInSitemap: true,

  staticPaths: ["/", "/blog", "/projects"],

  rssPath: "/feed.xml",
  sitemapPath: "/sitemap.xml",
};

export const sidebarData = {
  navMain: [
    {
      title: "Home",
      icon: <Home />,
      url: "/",
      items: [],
    },
    {
      title: "Projects",
      icon: <PresentationIcon />,
      url: "/projects",
      items: [],
    },
    {
      title: "Blog",
      icon: <NotebookPen />,
      url: "/blog",
      items: [],
    },
    {
      title: "Contact Me",
      url: "/contact",
      icon: <Send />,
      items: [
        {
          title: "Contact Page",
          url: "/contact",
        },
        {
          title: "LinkedIn",
          url: "https://www.linkedin.com/in/panagiotis-pitsikoulis-47141733a/",
        },
        {
          title: "GitHub",
          url: "https://github.com/PanagiotisPitsikoulis",
        },
        {
          title: "X/Twitter",
          url: "https://x.com/panos_dev_",
        },
        {
          title: "Instagram",
          url: "https://www.instagram.com/panospitsi",
        },
      ],
    },
  ],
};

export const backgroundImages = [
  "/images/Silhouette Flower Art.png",
  "/images/Matcha Mug on Table.png",
  "/images/Colorful Juice Display.png",
  "/images/Pouring Coconut Water.png",
  "/images/Serene River Landscape.png",
  "/images/Green Powder on Blue.png",
  "/images/Serene Lakeside Scene.png",
];

export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/panagiotis-pitsikoulis-47141733a/",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/PanagiotisPitsikoulis",
    icon: "github",
  },
  { label: "X/Twitter", href: "https://x.com/panos_dev_", icon: "twitter" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/panospitsi",
    icon: "instagram",
  },
];
