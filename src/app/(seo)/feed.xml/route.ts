import { generateRSSFeed } from "@/lib/seo/generate-rss-feed";
import { NextResponse } from "next/server";
import { siteMetadata } from "@/lib/data";

// Cache time in seconds (fallback 1 hour)
const CACHE_MAX_AGE = 60 * 60;

export async function GET() {
  try {
    // Generate RSS feed using site data + content
    const xml = await generateRSSFeed();

    // Return the XML with proper headers
    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": `public, max-age=${CACHE_MAX_AGE}`,
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);

    // Return a 500 error
    return new NextResponse("Error generating RSS feed", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
