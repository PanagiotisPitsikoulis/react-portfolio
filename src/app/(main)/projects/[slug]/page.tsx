import { getContent, listContent } from "@/lib/mdx";
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
  const project = await getContent("projects", slug);

  if (!project) {
    return {
      title: "Project not found",
      description: "This project does not exist.",
    };
  }

  const frontmatter = project.frontmatter;

  // build canonical url dynamically
  const canonical = `${siteMetadata.siteUrl}/projects/${slug}`;

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

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await getContent("projects", slug);
  if (!project) {
    redirect("/projects");
  }

  const projectSchema = generateStructuredData("Article", {
    title: project.frontmatter.title,
    description: project.frontmatter.summary,
    image: project.frontmatter.cover,
    publishedTime: new Date(project.frontmatter.date as string).toISOString(),
    modifiedTime: new Date(project.frontmatter.date as string).toISOString(),
    author: project.frontmatter.authorName,
    url: siteMetadata.siteUrl + `/projects/${project.slug}`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectSchema),
        }}
      />
      <PostPage contentType="projects" slug={slug} />
    </>
  );
}

export async function generateStaticParams() {
  const projects = await listContent("projects");
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
