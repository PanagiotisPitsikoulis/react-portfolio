import { NotebookPen, PresentationIcon, Send, Home } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio - Panos",
  description: "Full-stack developer",
};

// Site-level SEO metadata consumed by seo utilities
export const siteMetadata = {
  // Core
  title: "Portfolio - Panos",
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

  // Social / Branding
  twitter: {
    handle: "@panos_dev_",
    cardType: "summary_large_image" as const,
  },
  images: {
    ogImage: "/og-image.jpg", // host-relative, resolved against siteUrl
    logo: "/logo.svg",
  },

  // Content sections
  blogBasePath: "/blog",
  projectsBasePath: "/projects",
  includeBlogInSitemap: true,
  includeProjectsInSitemap: true,

  // Optional: static paths to include in sitemap root
  staticPaths: ["/" , "/blog" , "/projects"],

  // Feeds / endpoints
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
      items: [
        {
          title: "Wordflow CMS",
          url: "/projects/wordflow-cms",
          isActive: true,
        },
        {
          title: "C-ESG Compass",
          url: "/projects/c-esg-compass",
        },
        {
          title: "Simply Drive",
          url: "/projects/simply-drive",
        },
        {
          title: "AZ Kids Travel",
          url: "/projects/az-kids-travel",
        },
        {
          title: "AZ Kids Store",
          url: "/projects/az-kids-store",
        },
        {
          title: "Blink Calendar",
          url: "/projects/blink-calendar",
        },
        {
          title: "Portfolio",
          url: "/projects/portfolio",
        },
      ],
    },
    {
      title: "Blog",
      icon: <NotebookPen />,
      url: "/blog",
      items: [
        {
          title: "AI in Education Seminar",
          url: "/activities/ai-in-education",
        },
        {
          title: "Student Research Symposium",
          url: "/activities/student-research-symposium",
        },
        {
          title: "Helexpo Conference",
          url: "/activities/helexpo-conference",
        },
      ],
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
          url: "https://github.com/PanagiotisPitsikouli",
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
