import { listContent } from "@/lib/md/mdx";
import {
  copyright,
  legalLinks,
  pageData,
  socialLinks,
} from "../../../content/data";
import { Footer as FooterComponent } from "../../components/chromaui/layout/footer";

const Footer = async () => {
  const sitePages = pageData.navMain;

  const projects = await listContent("projects");
  const blog = await listContent("blog");

  const sitePageItems = sitePages.map((p) => ({
    label: p.title,
    href: p.url,
  }));

  const featuredProjects = projects.slice(0, 6).map((p) => ({
    label: p.frontmatter.title || p.slug,
    href: p.canonicalPath ?? `/projects/${p.frontmatter.slug || p.slug}`,
  }));

  const recentPosts = blog.slice(0, 6).map((b) => ({
    label: b.frontmatter.title || b.slug,
    href: b.canonicalPath ?? `/blog/${b.frontmatter.slug || b.slug}`,
  }));

  const footerConfig = {
    columns: [
      { title: "Site Pages", items: sitePageItems },
      {
        title: "Featured Projects",
        items: featuredProjects,
        fallback: { label: "All Projects", href: "/projects" },
      },
      {
        title: "Recent Posts",
        items: recentPosts,
        fallback: { label: "All Posts", href: "/blog" },
      },
    ],
    socialLinks,
    legalLinks,
    copyright,
    showCommandBar: true,
    showThemeToggle: true,
    showSocialLinks: true,
    showLegalLinks: true,
    maxWidth: "max-w-6xl",
    showBottomBar: true,
  };

  const projectItems = projects.map((p) => ({
    title: p.frontmatter.title || p.slug,
    url: `/projects/${p.frontmatter.slug}`,
  }));

  const blogItems = blog.map((b) => ({
    title: b.frontmatter.title || b.slug,
    url: `/blog/${b.frontmatter.slug}`,
  }));

  return (
    <FooterComponent
      config={footerConfig}
      projects={projectItems}
      blog={blogItems}
    />
  );
};

export default Footer;
