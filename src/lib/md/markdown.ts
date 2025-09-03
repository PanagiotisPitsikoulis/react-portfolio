import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { rehype } from "rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  readTime: number;
  categories: string[];
  featured: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
};

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getAllPostSlugs() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"))
      .map((name) => name.replace(/\.(md|mdx)$/, ""));
  } catch (error) {
    console.warn("Posts directory not found, returning empty array");
    return [];
  }
}

export async function processMarkdownContent(content: string): Promise<string> {
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);

  // Further process with rehype for additional plugins
  const finalContent = await rehype()
    .use(rehypeSlug)
    .use(rehypeHighlight)
    .process(processedContent.toString());

  return finalContent.toString();
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const mdPath = path.join(postsDirectory, `${slug}.md`);
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`);

    let fullPath: string;
    let fileContents: string;

    if (fs.existsSync(mdxPath)) {
      fullPath = mdxPath;
      fileContents = fs.readFileSync(fullPath, "utf8");
    } else if (fs.existsSync(mdPath)) {
      fullPath = mdPath;
      fileContents = fs.readFileSync(fullPath, "utf8");
    } else {
      return null;
    }

    const { data, content } = matter(fileContents);

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: content, // Keep raw markdown content for client-side processing
      coverImage: data.coverImage,
      date: data.date,
      readTime: data.readTime,
      categories: data.categories,
      featured: data.featured || false,
      seo: {
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        keywords: data.keywords,
      },
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): Post[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((post) => post.featured);
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((post) =>
    post.categories.some((cat) => cat.toLowerCase() === category.toLowerCase())
  );
}

export function getRelatedPosts(currentPost: Post, limit = 3): Post[] {
  const allPosts = getAllPosts();

  return allPosts
    .filter(
      (post) =>
        post.id !== currentPost.id &&
        post.categories.some((cat) => currentPost.categories.includes(cat))
    )
    .slice(0, limit);
}

// Utility function to extract table of contents from markdown content
export function extractTableOfContents(
  content: string
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
