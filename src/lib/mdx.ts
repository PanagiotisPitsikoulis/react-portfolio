import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type ContentType = "blog" | "projects";

export interface ContentFrontmatter {
  slug: string;
  title: string;
  date?: string;
  summary?: string;
  cover?: string;
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
  const dir = typeDir(type);
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile() && /\.mdx?$/.test(e.name));

  const items = await Promise.all(
    files.map(async (file) => {
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
    }),
  );

  // Sort desc by date if present, otherwise by title
  items.sort((a, b) => {
    const ad = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0;
    const bd = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0;
    if (ad !== 0 || bd !== 0) return bd - ad;
    return (a.frontmatter.title || "").localeCompare(b.frontmatter.title || "");
  });

  return items;
}

export async function getContent(
  type: ContentType,
  slug: string,
): Promise<ContentItem | null> {
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
    } catch {}
  }
  return null;
}
