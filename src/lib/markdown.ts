import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdx from "remark-mdx";
import remarkMath from "remark-math";
import remarkEmoji from "remark-emoji";
import remarkBreaks from "remark-breaks";
import remarkToc from "remark-toc";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";

export async function renderMarkdownToHtml(markdown: string) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkGfm)
    .use(remarkFrontmatter, ["yaml"])
    .use(remarkMath)
    .use(remarkEmoji)
    .use(remarkBreaks)
    .use(remarkToc, { heading: "toc|table[ -]of[ -]contents?", tight: true })
    .use(remarkUnwrapImages)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "append" })
    .use(rehypeExternalLinks, {
      rel: ["nofollow", "noopener", "noreferrer"],
      target: "_blank",
    })
    .use(rehypeStringify);

  const file = await processor.process(markdown);
  return String(file);
}

// Utility function to extract table of contents from markdown content
export function extractTableOfContents(
  content: string,
): { id: string; title: string; level: number }[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: { id: string; title: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    toc.push({ id, title, level });
  }

  return toc;
}

// Utility function to estimate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
