import {
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    "typescript",
    "tailwindcss",
    "frontend",
    "backend",
  ],

  twitter: {
    handle: "@panos_dev_",
    cardType: "summary_large_image" as const,
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

export const pageData = {
  navMain: [
    {
      title: "Home",
      icon: <Home className="text-current" />,
      url: "/",
      items: [],
    },
    {
      title: "Projects",
      icon: <PresentationIcon className="text-current" />,
      url: "/projects",
      items: [],
    },
    {
      title: "Blog",
      icon: <NotebookPen className="text-current" />,
      url: "/blog",
      items: [],
    },
    {
      title: "Contact Me",
      url: "/contact",
      icon: <Send className="text-current" />,
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
  "/images/Bird In Motion Blur.png",
  "/images/Modern Gray Chair.png",
  "/images/Paper on Textured Rock.png",
  "/images/Retro Portable Radio.png",
  "/images/Texture and Color Contrast.png",
];

export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/panagiotis-pitsikoulis-47141733a/",
    icon: <FontAwesomeIcon icon={faLinkedin} className="h-4 w-4" />,
  },
  {
    label: "GitHub",
    href: "https://github.com/PanagiotisPitsikoulis",
    icon: <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />,
  },
  {
    label: "X/Twitter",
    href: "https://x.com/panos_dev_",
    icon: <FontAwesomeIcon icon={faTwitter} className="h-4 w-4" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/panospitsi",
    icon: <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />,
  },
];

export const legalLinks = [
  { name: "Privacy Policy", href: "/blog/privacy", label: "Privacy Policy" },
  {
    name: "Terms and Contitions",
    href: "/blog/terms",
    label: "Terms and Contitions",
  },
];

export const copyright = `© ${new Date().getFullYear()} ${
  author.name
}. All rights reserved.`;
