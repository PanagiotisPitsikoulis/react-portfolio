import { listContent } from "@/lib/md/mdx";
import { siteMetadata } from "../../../content/data";

export interface RSSEntry {
  title: string;
  description: string;
  pubDate: string;
  link: string;
  guid: string;
  author?: string;
  categories?: string[];
}

export async function generateRSSFeed(): Promise<string> {
  try {
    const baseUrl = siteMetadata.siteUrl;

    // Get all blog posts
    const posts = await listContent("blog");

    // Convert posts to RSS entries
    const entries: RSSEntry[] = posts.map((post) => ({
      title: post.frontmatter.title,
      description: post.frontmatter.summary || "",
      pubDate: post.frontmatter.date
        ? new Date(post.frontmatter.date).toUTCString()
        : new Date().toUTCString(),
      link: `${baseUrl}/blog/${post.slug}`,
      guid: `${baseUrl}/blog/${post.slug}`,
      categories: post.frontmatter.tags,
    }));

    // Build the RSS XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    xml += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">';
    xml += "<channel>";

    // Channel information
    xml += `<title><![CDATA[${siteMetadata.title}]]></title>`;
    xml += `<description><![CDATA[${siteMetadata.description}]]></description>`;
    xml += `<link>${baseUrl}</link>`;
    xml += `<atom:link href="${baseUrl}${siteMetadata.rssPath}" rel="self" type="application/rss+xml" />`;
    xml += `<language>${siteMetadata.language || "en-us"}</language>`;
    xml += `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`;
    // Optional managing editor / webmaster can be added here if available
    xml += `<image>`;
    xml += `<url>${baseUrl}${siteMetadata.images.ogImage}</url>`;
    xml += `<title><![CDATA[${siteMetadata.title}]]></title>`;
    xml += `<link>${baseUrl}</link>`;
    xml += `</image>`;

    // Add entries
    for (const item of entries) {
      xml += "<item>";
      xml += `<title><![CDATA[${item.title}]]></title>`;
      xml += `<description><![CDATA[${item.description}]]></description>`;
      xml += `<pubDate>${item.pubDate}</pubDate>`;
      xml += `<link>${item.link}</link>`;
      xml += `<guid isPermaLink="true">${item.guid}</guid>`;

      if (item.author) {
        xml += `<author>${item.author}</author>`;
      }

      if (item.categories && item.categories.length) {
        for (const category of item.categories) {
          xml += `<category><![CDATA[${category}]]></category>`;
        }
      }

      xml += "</item>";
    }

    xml += "</channel>";
    xml += "</rss>";

    return xml;
  } catch (error) {
    console.error("Error generating RSS feed:", error);

    // Return a basic RSS feed in case of error
    const baseUrl = siteMetadata.siteUrl;
    return `<?xml version="1.0" encoding="UTF-8"?>
      <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
        <channel>
          <title><![CDATA[${siteMetadata.title}]]></title>
          <description><![CDATA[${siteMetadata.description}]]></description>
          <link>${baseUrl}</link>
          <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
          <language>en-us</language>
          <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        </channel>
      </rss>
    `;
  }
}
