// SEO utilities for Mani Fishing Cruises
export {
  generateBlogPostMetadata,
  generatePageMetadata,
  generateStructuredData,
  type PageMetadataProps,
} from "./generate-metadata";

export { generateRSSFeed, type RSSEntry } from "./generate-rss-feed";

export { generateSitemap, type SitemapEntry } from "./generate-sitemap";

// Common SEO types and constants
export const SEO_CONSTANTS = {
  DEFAULT_CACHE_TIME: 60 * 60 * 24, // 24 hours
  RSS_CACHE_TIME: 60 * 60, // 1 hour
  SITEMAP_CACHE_TIME: 60 * 60 * 24, // 24 hours
  THEME_COLOR: "#0066cc",
  BACKGROUND_COLOR: "#ffffff",
} as const;

// Helper function to validate URLs
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Helper function to generate canonical URLs
export function generateCanonicalUrl(baseUrl: string, path: string): string {
  const cleanBase = baseUrl.replace(/\/$/, "");
  const cleanPath = path.replace(/^\//, "");
  return cleanPath ? `${cleanBase}/${cleanPath}` : cleanBase;
}
