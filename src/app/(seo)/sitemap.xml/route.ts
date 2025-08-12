import { generateSitemap } from "@/lib/seo/generate-sitemap";
import { NextResponse } from "next/server";
import { siteMetadata } from "@/lib/data";

// Cache time in seconds (configurable via site data; fallback 1 day)
const CACHE_MAX_AGE = 60 * 60 * 24;

export async function GET() {
  try {
    // Use the sitemap generator which reads from site data
    const xml = await generateSitemap();

    // Return the XML with proper headers
    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": `public, max-age=${CACHE_MAX_AGE}`,
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);

    // Return a 500 error
    return new NextResponse("Error generating sitemap", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
