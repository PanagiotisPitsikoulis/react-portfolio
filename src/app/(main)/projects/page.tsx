import PostViewer from "@/sections/post-viewer";
import { Metadata } from "next";
import { siteMetadata } from "../../../../content/data";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Projects | ${siteMetadata.title}`,
    description: siteMetadata.description,
  };
}

export default async function ProjectsPage() {
  return (
    <PostViewer
      title="Projects, Panagiotis Pitsikoulis Portfolio"
      description="Explore my software engineering projects and experiments."
      contentType="projects"
    />
  );
}
