import { NextResponse } from "next/server";
import { siteMetadata } from "../../../../content/data";

// Cache time in seconds (1 day)
const CACHE_MAX_AGE = 60 * 60 * 24;

export async function GET() {
  try {
    const baseUrl = siteMetadata.siteUrl;

    const browserConfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="${baseUrl}/mstile-150x150.webp"/>
      <square310x310logo src="${baseUrl}/mstile-310x310.webp"/>
      <wide310x150logo src="${baseUrl}/mstile-310x150.webp"/>
      <TileColor>#0066cc</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;

    return new NextResponse(browserConfig, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": `public, max-age=${CACHE_MAX_AGE}`,
      },
    });
  } catch (error) {
    console.error("Error generating browserconfig:", error);

    // Return a basic browserconfig in case of error
    return new NextResponse(
      `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/favicon.ico"/>
      <TileColor>#0066cc</TileColor>
    </tile>
  </msapplication>
</browserconfig>`,
      {
        status: 200,
        headers: {
          "Content-Type": "application/xml",
          "Cache-Control": "public, max-age=3600",
        },
      }
    );
  }
}
