import Link from "next/link";
import { listContent } from "@/lib/mdx";
import { siteMetadata } from "@/lib/data";
import { Metadata } from "next";
import PostViewer from "@/sections/post-viewer";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Blog | ${siteMetadata.title}`,
    description: siteMetadata.description,
  };
}

export default async function BlogPage() {
  return (
    <PostViewer
      title="Blog, Panagiotis Pitsikoulis Portfolio"
      description="Learn about my journey as a software engineer and developer."
      contentType="blog"
    />
  );
}
