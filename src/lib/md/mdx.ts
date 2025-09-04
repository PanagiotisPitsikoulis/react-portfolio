import matter from "gray-matter";
import fs from "node:fs/promises";
import path from "node:path";

export type ContentType = "blog" | "projects";

export interface ContentFrontmatter {
  slug: string;
  title: string;
  date?: string;
  summary?: string;
  cover?: string;
  url?: string;
  categories?: string[];
  published?: boolean;
  tags?: string[];
  tech?: string[];
  authorName?: string;
  authorAvatar?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface ContentItem {
  type: ContentType;
  slug: string;
  frontmatter: ContentFrontmatter;
  body: string;
  filePath: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

function typeDir(type: ContentType) {
  return path.join(CONTENT_DIR, type);
}

export async function listContent(type: ContentType): Promise<ContentItem[]> {
  try {
    const dir = typeDir(type);
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = entries.filter((e) => e.isFile() && /\.mdx?$/.test(e.name));

    console.log(`Found ${files.length} ${type} files in ${dir}`);

    const items = await Promise.all(
      files.map(async (file) => {
        try {
          const filePath = path.join(dir, file.name);
          const raw = await fs.readFile(filePath, "utf8");
          const { data, content } = matter(raw);
          const fm = (data || {}) as ContentFrontmatter;
          const slug = fm.slug || file.name.replace(/\.(md|mdx)$/i, "");

          return {
            type,
            slug,
            frontmatter: { ...fm, slug },
            body: content,
            filePath,
          } satisfies ContentItem;
        } catch (error) {
          console.error(`Error processing ${file.name}:`, error);
          return null;
        }
      })
    );

    // Filter out null items and sort
    const validItems = items.filter(
      (item): item is ContentItem => item !== null
    );

    // Sort desc by date if present, otherwise by title
    validItems.sort((a, b) => {
      const ad = a.frontmatter.date
        ? new Date(a.frontmatter.date).getTime()
        : 0;
      const bd = b.frontmatter.date
        ? new Date(b.frontmatter.date).getTime()
        : 0;
      if (ad !== 0 || bd !== 0) return bd - ad;
      return (a.frontmatter.title || "").localeCompare(
        b.frontmatter.title || ""
      );
    });

    console.log(`Successfully loaded ${validItems.length} ${type} items`);
    return validItems;
  } catch (error) {
    console.error(`Error loading ${type} content:`, error);
    return [];
  }
}

export async function getContent(
  type: ContentType,
  slug: string
): Promise<ContentItem | null> {
  try {
    const dir = typeDir(type);
    const tryNames = [`${slug}.mdx`, `${slug}.md`];

    for (const name of tryNames) {
      const filePath = path.join(dir, name);
      try {
        const raw = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(raw);
        const fm = (data || {}) as ContentFrontmatter;
        return {
          type,
          slug: fm.slug || slug,
          frontmatter: { ...fm, slug: fm.slug || slug },
          body: content,
          filePath,
        };
      } catch (error) {
        console.log(`File ${name} not found or not readable`);
      }
    }

    console.log(`No content found for ${type}/${slug}`);
    return null;
  } catch (error) {
    console.error(`Error getting content for ${type}/${slug}:`, error);
    return null;
  }
}

export async function getRelatedPosts(
  currentPost: ContentItem,
  limit = 3
): Promise<ContentItem[]> {
  try {
    const allPosts = await listContent(currentPost.type);

    // Filter out the current post and find posts with similar tags
    const relatedPosts = allPosts
      .filter((post) => post.slug !== currentPost.slug)
      .filter((post) => {
        // If current post has tags, find posts with overlapping tags
        if (
          currentPost.frontmatter.tags &&
          currentPost.frontmatter.tags.length > 0
        ) {
          return post.frontmatter.tags?.some((tag) =>
            currentPost.frontmatter.tags?.includes(tag)
          );
        }
        // If no tags, return posts of the same type
        return true;
      })
      .sort((a, b) => {
        // Sort by tag overlap count first, then by date
        const aTagOverlap =
          currentPost.frontmatter.tags?.filter((tag) =>
            a.frontmatter.tags?.includes(tag)
          ).length || 0;
        const bTagOverlap =
          currentPost.frontmatter.tags?.filter((tag) =>
            b.frontmatter.tags?.includes(tag)
          ).length || 0;

        if (aTagOverlap !== bTagOverlap) {
          return bTagOverlap - aTagOverlap;
        }

        // Then sort by date (newest first)
        const aDate = a.frontmatter.date
          ? new Date(a.frontmatter.date).getTime()
          : 0;
        const bDate = b.frontmatter.date
          ? new Date(b.frontmatter.date).getTime()
          : 0;
        return bDate - aDate;
      })
      .slice(0, limit);

    return relatedPosts;
  } catch (error) {
    console.error("Error getting related posts:", error);
    return [];
  }
}
