import { siteMetadata } from "@/lib/data";
import { NextResponse } from "next/server";

// Cache time in seconds (1 day)
const CACHE_MAX_AGE = 60 * 60 * 24;

export async function GET() {
  try {
    const baseUrl = siteMetadata.siteUrl;

    // Build the manifest for fishing cruise PWA
    const manifest = {
      name: siteMetadata.title,
      short_name: "Mani Fishing",
      description: siteMetadata.description,
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#0066cc", // Ocean blue theme
      orientation: "portrait-primary",
      scope: "/",
      lang: "en",
      icons: [
        {
          src: "/favicon.ico",
          sizes: "16x16 32x32",
          type: "image/x-icon",
        },
        {
          src: "/icon-192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "/icon-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
      categories: ["travel", "sports", "lifestyle"],
      screenshots: [
        {
          src: `${baseUrl}/screenshot-wide.png`,
          sizes: "1280x720",
          type: "image/png",
          form_factor: "wide",
        },
        {
          src: `${baseUrl}/screenshot-mobile.png`,
          sizes: "750x1334",
          type: "image/png",
          form_factor: "narrow",
        },
      ],
      shortcuts: [
        {
          name: "Book a Trip",
          short_name: "Book",
          description: "Book your fishing adventure",
          url: "/#contact",
          icons: [
            {
              src: "/icon-96.png",
              sizes: "96x96",
            },
          ],
        },
        {
          name: "View Blog",
          short_name: "Blog",
          description: "Read fishing stories",
          url: "/blog",
          icons: [
            {
              src: "/icon-96.png",
              sizes: "96x96",
            },
          ],
        },
      ],
    };

    // Return the manifest as JSON
    return NextResponse.json(manifest, {
      headers: {
        "Content-Type": "application/manifest+json",
        "Cache-Control": `public, max-age=${CACHE_MAX_AGE}`,
      },
    });
  } catch (error) {
    console.error("Error generating manifest:", error);

    // Return a basic manifest in case of error
    return NextResponse.json(
      {
        name: siteMetadata.title,
        short_name: "Mani Fishing",
        description: siteMetadata.description,
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#0066cc",
        icons: [
          {
            src: "/favicon.ico",
            sizes: "32x32",
            type: "image/x-icon",
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/manifest+json",
          "Cache-Control": "public, max-age=3600",
        },
      },
    );
  }
}
