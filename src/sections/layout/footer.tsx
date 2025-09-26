import { AppIcon } from "@/components/app-icon";
import CommandBar from "@/components/command-bar";
import { ThemeToggle } from "@/components/theme-toggle";
import { listContent } from "@/lib/md/mdx";
import Link from "next/link";
import {
  copyright,
  legalLinks,
  pageData,
  socialLinks,
} from "../../../content/data";

interface FooterLinkItem {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  items: FooterLinkItem[];
  fallback?: FooterLinkItem;
}

const Footer = async () => {
  const sitePages = pageData.navMain;

  const projects = await listContent("projects");
  const blog = await listContent("blog");

  const sitePageItems: FooterLinkItem[] = sitePages.map((p) => ({
    label: p.title,
    href: p.url,
  }));

  const featuredProjects: FooterLinkItem[] = projects.slice(0, 6).map((p) => ({
    label: p.frontmatter.title || p.slug,
    href: p.canonicalPath ?? `/projects/${p.frontmatter.slug || p.slug}`,
  }));

  const recentPosts: FooterLinkItem[] = blog.slice(0, 6).map((b) => ({
    label: b.frontmatter.title || b.slug,
    href: b.canonicalPath ?? `/blog/${b.frontmatter.slug || b.slug}`,
  }));

  const footerColumns: FooterColumn[] = [
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
  ];

  return (
    <footer className="w-full bg-background relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-12 gap-4 lg:gap-6 py-12 w-full">
          {/* Logo + Command bar */}
          <div className="col-span-full lg:col-span-4 flex flex-col gap-10">
            <div className="flex flex-row gap-3 w-full mb-5">
              <Link
                href={"/"}
                className="flex justify-start rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={"Back to Home"}
                title="Back to Home"
              >
                <AppIcon />
              </Link>
              <section
                className="flex flex-col w-full"
                aria-labelledby="footer-primary-heading"
              >
                <h2 id="footer-primary-heading" className="sr-only">
                  Quick find
                </h2>
                {(() => {
                  const projectItems = projects.map((p) => ({
                    title: p.frontmatter.title || p.slug,
                    url: `/projects/${p.frontmatter.slug}`,
                  }));
                  const blogItems = blog.map((b) => ({
                    title: b.frontmatter.title || b.slug,
                    url: `/blog/${b.frontmatter.slug}`,
                  }));
                  return (
                    <CommandBar projects={projectItems} blog={blogItems} />
                  );
                })()}
              </section>
            </div>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-2 w-full gap-6 md:grid-cols-4 lg:gap-12 col-span-full lg:col-span-full">
            {/* Social */}
            <div>
              <h4 className="mb-2 text-base font-semibold text-foreground">
                Follow
              </h4>
              <nav aria-label="Social links">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {socialLinks.map((s) => (
                    <li key={s.label}>
                      <Link
                        href={s.href}
                        rel="noopener noreferrer"
                        target={
                          s.href.startsWith("http") ? "_blank" : undefined
                        }
                        className="hover:text-primary transition-colors"
                      >
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            {footerColumns.map((col) => (
              <div key={col.title} className="text-left">
                <h4 className="mb-2 text-base font-semibold text-foreground">
                  {col.title}
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {col.items.length > 0 ? (
                    col.items.map((p) => (
                      <li key={p.href} className="hover:text-primary">
                        <Link href={p.href}>{p.label}</Link>
                      </li>
                    ))
                  ) : col.fallback ? (
                    <li className="hover:text-primary">
                      <Link href={col.fallback.href}>{col.fallback.label}</Link>
                    </li>
                  ) : null}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-1 bg-primary text-primary-foreground">
        <div className="flex justify-between flex-col lg:flex-row gap-2 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 items-center">
          <span className="text-xs">{copyright}</span>
          <div className="flex items-center gap-4">
            <ul className="flex items-center gap-2">
              {legalLinks.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="text-xs hover:underline underline-offset-2"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
