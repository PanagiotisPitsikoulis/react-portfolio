import { Metadata } from "next";
import { siteMetadata } from "../data";

export interface PageMetadataProps {
  title?: string;
  description?: string;
  keywords?: string[] | string;
  image?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  canonical?: string;
}

export function generatePageMetadata({
  title,
  description,
  keywords,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
  canonical,
}: PageMetadataProps = {}): Metadata {
  const metadata: Metadata = {
    title,
    description,
    keywords,
    openGraph: {
      type,
      title,
      description,
      url: canonical,
      images: image ? [image] : undefined,
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        section,
        authors: author ? [author] : undefined,
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image.url] : undefined,
    },
    alternates: canonical ? { canonical } : undefined,
  };

  return metadata;
}

// Helper function for blog posts
export function generateBlogPostMetadata({
  title,
  excerpt,
  canonical,
  date,
  categories,
  coverImage,
  author,
}: {
  title: string;
  excerpt: string;
  canonical: string;
  date: string;
  categories: string[];
  coverImage?: string;
  author?: string;
}) {
  return generatePageMetadata({
    title: title + " - " + siteMetadata.title,
    description: excerpt,
    keywords: categories,
    image: coverImage
      ? {
          url: coverImage,
          alt: title,
        }
      : undefined,
    type: "article",
    publishedTime: new Date(date).toISOString(),
    modifiedTime: new Date(date).toISOString(),
    author,
    section: undefined,
    tags: categories,
    canonical,
  });
}

// Helper function for structured data
export function generateStructuredData(
  type: "Organization" | "Article" | "WebSite",
  data: any,
) {
  const commonData = {
    "@context": "https://schema.org",
    "@type": type,
  };

  switch (type) {
    case "Organization":
      return {
        ...commonData,
        name: data?.name,
        description: data?.description,
        url: data?.url,
        logo: data?.logo,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: data?.telephone,
          contactType: data?.contactType,
          email: data?.email,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: data?.addressLocality,
          addressRegion: data?.addressRegion,
          addressCountry: data?.addressCountry,
        },
        sameAs: data?.sameAs,
      };

    case "WebSite":
      return {
        ...commonData,
        name: data?.name,
        description: data?.description,
        url: data?.url,
        potentialAction: {
          "@type": "SearchAction",
          target: data?.searchTarget,
          "query-input": "required name=search_term_string",
        },
      };

    case "Article":
      return {
        ...commonData,
        headline: data.title,
        description: data.description,
        image: data.image,
        author: {
          "@type": "Person",
          name: data.author,
        },
        publisher: {
          "@type": "Organization",
          name: data.publisherName,
          logo: {
            "@type": "ImageObject",
            url: data.publisherLogo,
          },
        },
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime || data.publishedTime,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": data.url,
        },
      };

    default:
      return commonData;
  }
}
