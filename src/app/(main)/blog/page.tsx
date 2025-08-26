import PostViewer from "@/sections/post-viewer";
import { Metadata } from "next";
import { siteMetadata } from "../../../../content/data";

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
