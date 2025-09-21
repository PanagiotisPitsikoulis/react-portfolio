import { AppIcon } from "@/components/app-icon";
import CommandBar from "@/components/command-bar";
import { ThemeToggle } from "@/components/theme-toggle";
import { listContent } from "@/lib/md/mdx";
import Link from "next/link";
import {
  copyright,
  legalLinks,
  sidebarData,
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
  const sitePages = sidebarData.navMain;

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
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-12 gap-6 lg:gap-8 py-24 w-full">
          <div className="col-span-full mb-8 lg:col-span-4 lg:mb-0 flex flex-col gap-4 justify-between h-full items-start w-full">
            <div className="flex flex-row gap-4 w-full">
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
                  Quick find and social
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
                <nav
                  aria-label="Social links"
                  className="mt-6 sm:mt-4 space-y-4"
                >
                  <ul className="flex flex-wrap gap-2 sm:gap-3 justify-start text-muted-foreground">
                    {socialLinks.map((s) => (
                      <li key={s.label}>
                        <Link
                          href={s.href}
                          aria-label={s.label}
                          title={s.label}
                          rel="noopener noreferrer"
                          target={
                            s.href.startsWith("http") ? "_blank" : undefined
                          }
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary shadow text-secondary-foreground hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
                        >
                          <span aria-hidden="true">{s.icon}</span>
                          <span className="sr-only">{s.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </section>
            </div>
          </div>

          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20 col-span-full lg:col-span-8">
            {footerColumns.map((col) => (
              <div key={col.title} className="text-left">
                <h4 className="mb-4 text-lg font-bold text-foreground">
                  {col.title}
                </h4>
                <ul className="text-sm text-muted-foreground space-y-3">
                  {col.items.length > 0 ? (
                    col.items.map((p) => (
                      <li
                        key={p.href}
                        className="hover:text-primary font-medium"
                      >
                        <Link href={p.href}>{p.label}</Link>
                      </li>
                    ))
                  ) : col.fallback ? (
                    <li className="hover:text-primary font-medium">
                      <Link href={col.fallback.href}>{col.fallback.label}</Link>
                    </li>
                  ) : null}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="py-2 bg-primary text-primary-foreground">
        <div className="flex justify-between flex-col lg:justify-between lg:flex-row gap-4 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 items-center">
          <span className="text-xs text-left">{copyright}</span>
          <div className="flex items-center gap-6 mt-2 lg:mt-0">
            <ul className="flex items-center gap-3">
              {legalLinks.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="text-xs hover:text-primary-foreground hover:underline underline-offset-4"
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
