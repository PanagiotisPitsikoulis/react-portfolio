import { listContent } from "@/lib/mdx";
import { siteMetadata } from "../../../content/data";

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export async function generateSitemap(): Promise<string> {
  try {
    const baseUrl = siteMetadata.siteUrl;
    const entries: SitemapEntry[] = [];
    const now = new Date();

    // Static pages from site data
    const staticPages = (siteMetadata.staticPaths || []).map((url) => ({
      url: url.replace(/^\//, ""),
      changefreq: "weekly" as const,
      priority: url === "/" ? 1.0 : 0.8,
    }));

    // Add static pages
    for (const page of staticPages) {
      entries.push({
        loc: `${baseUrl}/${page.url}`,
        lastmod: formatDate(now),
        changefreq: page.changefreq,
        priority: page.priority,
      });
    }

    // Blog posts
    if (siteMetadata.includeBlogInSitemap) {
      try {
        const posts = await listContent("blog");
        for (const post of posts) {
          const date = post.frontmatter.date
            ? new Date(post.frontmatter.date)
            : now;
          entries.push({
            loc: `${baseUrl}${siteMetadata.blogBasePath}/${post.slug}`,
            lastmod: formatDate(date),
            changefreq: "monthly",
            priority: 0.6,
          });
        }
      } catch (error) {
        console.warn("Could not load blog posts for sitemap:", error);
      }
    }

    // Projects
    if (siteMetadata.includeProjectsInSitemap) {
      try {
        const projects = await listContent("projects");
        for (const project of projects) {
          const date = project.frontmatter.date
            ? new Date(project.frontmatter.date)
            : now;
          entries.push({
            loc: `${baseUrl}${siteMetadata.projectsBasePath}/${project.slug}`,
            lastmod: formatDate(date),
            changefreq: "monthly",
            priority: 0.6,
          });
        }
      } catch (error) {
        console.warn("Could not load projects for sitemap:", error);
      }
    }

    // Convert entries to XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    for (const entry of entries) {
      xml += `
        <url>
          <loc>${entry.loc}</loc>
          <lastmod>${entry.lastmod}</lastmod>
          <changefreq>${entry.changefreq}</changefreq>
          <priority>${entry.priority}</priority>
        </url>
      `;
    }

    xml += "</urlset>";

    return xml;
  } catch (error) {
    console.error("Error generating sitemap:", error);

    // Return a basic sitemap in case of error
    const baseUrl = siteMetadata.siteUrl;
    return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${baseUrl}/</loc>
          <lastmod>${formatDate(new Date())}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>1.0</priority>
        </url>
        <url>
          <loc>${baseUrl}/blog</loc>
          <lastmod>${formatDate(new Date())}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
      </urlset>
    `;
  }
}
