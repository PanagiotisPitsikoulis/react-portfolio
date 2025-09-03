import { getContent, listContent } from "@/lib/md/mdx";
import { generateBlogPostMetadata, generateStructuredData } from "@/lib/seo";
import PostPage from "@/sections/post-page";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { siteMetadata } from "../../../../../content/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getContent("blog", slug);

  if (!post) {
    return {
      title: "Post not found",
      description: "This blog post does not exist.",
    };
  }

  const frontmatter = post.frontmatter;

  // build canonical url dynamically
  const canonical = `${siteMetadata.siteUrl}/blog/${slug}`;

  return generateBlogPostMetadata({
    title: frontmatter.title,
    excerpt: frontmatter.summary || "",
    canonical,
    date: frontmatter.date || new Date().toISOString(),
    categories: frontmatter.tags ?? [],
    coverImage: frontmatter.cover,
    author: frontmatter.authorName,
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getContent("blog", slug);
  if (!post) {
    redirect("/blog");
  }

  const articleSchema = generateStructuredData("Article", {
    title: post.frontmatter.title,
    description: post.frontmatter.summary,
    image: post.frontmatter.cover,
    publishedTime: new Date(post.frontmatter.date as string).toISOString(),
    modifiedTime: new Date(post.frontmatter.date as string).toISOString(),
    author: post.frontmatter.authorName,
    url: siteMetadata.siteUrl + `/blog/${post.slug}`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <PostPage contentType="blog" slug={slug} />
    </>
  );
}

export async function generateStaticParams() {
  const posts = await listContent("blog");
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
