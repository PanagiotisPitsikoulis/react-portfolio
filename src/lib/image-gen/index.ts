import { getContent } from "@/lib/md/mdx";
import fs from "node:fs/promises";
import path from "node:path";
import {
  generateLandscapeImage,
  generatePortraitImage,
  generateSquareImage,
} from "./generators";
import type { OgOrientation } from "./utils";

export async function generateOgForSlug(
  slug: string,
  orientation: OgOrientation,
  origin: string
) {
  const blog = await getContent("blog", slug);
  const project = await getContent("projects", slug);
  const item = blog || project;
  const fm = item?.frontmatter;
  let cover = fm?.cover || origin + "/images/window.png";
  const title = fm?.title || slug;
  const description = fm?.metaDescription || fm?.summary || "";
  // If this is a project and a screenshot exists, prefer the screenshot.
  if (project) {
    const suffix = orientation === "portrait" ? ".mobile" : "";
    const fileName = `${slug}${suffix}.png`;
    const publicFilePath = path.join(
      process.cwd(),
      "public",
      "screenshots",
      fileName
    );
    try {
      await fs.access(publicFilePath);
      cover = origin + `/screenshots/${fileName}`;
    } catch {}
  }

  const params = {
    slug,
    title,
    description,
    coverUrl: cover,
    origin,
  };

  switch (orientation) {
    case "square":
      return generateSquareImage(params);
    case "portrait":
      return generatePortraitImage(params);
    case "landscape":
      return generateLandscapeImage(params);
    default:
      return new Response("invalid orientation", { status: 400 });
  }
}

// Re-export types and functions for convenience
export {
  generateLandscapeImage,
  generatePortraitImage,
  generateSquareImage,
} from "./generators";
export { backgrounds } from "./utils";
export type { OgOrientation } from "./utils";
