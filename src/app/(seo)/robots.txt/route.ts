import { siteMetadata } from "@/lib/data";
import { NextResponse } from "next/server";

// Cache time in seconds (1 day)
const CACHE_MAX_AGE = 60 * 60 * 24;

export async function GET() {
  const baseUrl = siteMetadata.siteUrl;

  const robotsTxt = `# Robots.txt for ${siteMetadata.title}
# ${baseUrl}

# Allow all crawlers to access the site
User-agent: *
Allow: /

# Optimize crawling for blog content
Allow: /blog/
Allow: /blog/*.html
Allow: /blog/*.md

# Allow important pages
Allow: /#about
Allow: /#contact
Allow: /#testimonials

# Prevent crawling of admin/private areas (if any)
Disallow: /admin/
Disallow: /private/
Disallow: /_next/
Disallow: /api/

# Crawl delay (optional - helps with server load)
Crawl-delay: 1

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# RSS Feed
# ${baseUrl}/feed.xml

# Additional information for search engines
# This is a fishing cruise business website
# Main keywords: fishing cruises, mani peninsula, greece fishing, mediterranean fishing
# Location: Agios Nikolaos, West Mani, Greece
# Contact: thiresiamast@gmail.com
`;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": `public, max-age=${CACHE_MAX_AGE}`,
    },
  });
}
