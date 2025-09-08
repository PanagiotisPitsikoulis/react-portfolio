import matter from "gray-matter";
import fs from "node:fs/promises";
import path from "node:path";

export type ContentType = "blog" | "projects";

export interface ContentFrontmatter {
  slug: string;
  title: string;
  date?: string;
  summary?: string;
  cover?: string;
  url?: string;
  routes?: string[];
  carousel?: string[];
  categories?: string[];
  published?: boolean;
  featured?: boolean;
  tags?: string[];
  tech?: string[];
  authorName?: string;
  authorAvatar?: string;
  metaTitle?: string;
  metaDescription?: string;
  hidden?: boolean;
}

export interface ContentItem {
  type: ContentType;
  postType?: "project" | "blog";
  slug: string;
  frontmatter: ContentFrontmatter;
  body: string;
  filePath: string;
  screenshots?: {
    desktop?: string;
    mobile?: string;
    routes?: Array<{ key: string; desktop?: string; mobile?: string }>;
  };
  imagesDesktop?: string[];
  imagesMobile?: string[];
  heroImageDesktop?: string;
  heroImageMobile?: string;
  isProject?: boolean;
  hasExternalUrl?: boolean;
  mergedTags?: string[];
  canonicalPath?: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content");
const SCREENSHOTS_DIR = path.join(process.cwd(), "public", "screenshots");

interface ScreenshotsInfo {
  desktop?: string;
  mobile?: string;
  routes?: Array<{ key: string; desktop?: string; mobile?: string }>;
}

function typeDir(type: ContentType) {
  return path.join(CONTENT_DIR, type);
}

function screenshotPath(slug: string, routeKey?: string, mobile?: boolean) {
  const base = routeKey && routeKey !== "home" ? `${slug}.${routeKey}` : slug;
  const suffix = mobile ? ".mobile" : "";
  return `/screenshots/${base}${suffix}.webp`;
}

function deriveRouteKey(input: string) {
  try {
    const u = new URL(input, "https://example.local");
    const pathname = u.pathname || "/";
    const segment =
      pathname === "/" ? "home" : pathname.replace(/^\/+|\/+$/g, "");
    const baseKey = segment.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "home";
    const hash = (u.hash || "").replace(/^#/, "");
    if (hash) {
      const hashKey = hash.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return hashKey ? `${baseKey}.${hashKey}` : baseKey;
    }
    return baseKey;
  } catch {
    return (
      String(input || "route")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") || "route"
    );
  }
}

async function collectScreenshots(
  slug: string,
  fm?: ContentFrontmatter
): Promise<ScreenshotsInfo> {
  // Prefer scanning actual generated screenshots; fallback to derived paths
  async function scanDir(): Promise<ScreenshotsInfo> {
    try {
      const entries = await fs.readdir(SCREENSHOTS_DIR, {
        withFileTypes: true,
      });
      const files = entries
        .filter(
          (e) =>
            e.isFile() &&
            e.name.startsWith(`${slug}`) &&
            /\.(png|webp)$/i.test(e.name)
        )
        .map((e) => e.name);

      const routesMap = new Map<
        string,
        { key: string; desktop?: string; mobile?: string }
      >();
      let homeDesktop: string | undefined;
      let homeMobile: string | undefined;

      for (const name of files) {
        if (name === `${slug}.webp` || name === `${slug}.webp`) {
          homeDesktop = `/screenshots/${name}`;
          continue;
        }
        if (name === `${slug}.mobile.webp` || name === `${slug}.mobile.webp`) {
          homeMobile = `/screenshots/${name}`;
          continue;
        }
        if (!name.startsWith(`${slug}.`)) continue;
        // slug.<key>[.mobile].webp
        const withoutSlug = name.slice(slug.length + 1); // drop '<slug>.'
        const base = withoutSlug.replace(/\.(png|webp)$/i, "");
        const isMobile = base.endsWith(".mobile");
        const key = (isMobile ? base.slice(0, -7) : base) || "home";
        if (!routesMap.has(key)) routesMap.set(key, { key });
        const item = routesMap.get(key)!;
        const url = `/screenshots/${name}`;
        if (isMobile) item.mobile = url;
        else item.desktop = url;
      }

      const scanned: ScreenshotsInfo = {
        desktop: homeDesktop,
        mobile: homeMobile,
        routes: Array.from(routesMap.values()).filter((r) => r.key !== "home"),
      };
      return scanned;
    } catch {
      // Directory may not exist in dev
      return { desktop: undefined, mobile: undefined, routes: [] };
    }
  }

  const scanned = await scanDir();
  if (
    Boolean(scanned.desktop) ||
    Boolean(scanned.mobile) ||
    Boolean(scanned.routes && scanned.routes.length > 0)
  ) {
    return scanned;
  }

  // Fallback to deterministic paths from frontmatter
  const routes = Array.isArray(fm?.routes) ? (fm!.routes as string[]) : [];
  const result: ScreenshotsInfo = {
    desktop: screenshotPath(slug),
    mobile: screenshotPath(slug, undefined, true),
    routes: routes.map((r: string) => {
      const key = deriveRouteKey(r);
      return {
        key,
        desktop: screenshotPath(slug, key),
        mobile: screenshotPath(slug, key, true),
      };
    }),
  };
  return result;
}

export async function listContent(type: ContentType): Promise<ContentItem[]> {
  try {
    const dir = typeDir(type);
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = entries.filter((e) => e.isFile() && /\.mdx?$/.test(e.name));

    // files discovered

    const items = await Promise.all(
      files.map(async (file): Promise<ContentItem | null> => {
        try {
          const filePath = path.join(dir, file.name);
          const raw = await fs.readFile(filePath, "utf8");
          const { data, content } = matter(raw);
          const fm = (data || {}) as ContentFrontmatter;
          const slug = fm.slug || file.name.replace(/\.(md|mdx)$/i, "");

          // Derive screenshots only for projects
          const screenshots =
            type === "projects"
              ? await collectScreenshots(slug, fm)
              : undefined;

          // Aggregate images for simpler consumers (prefer existing files)
          const imagesDesktop: string[] = [];
          const imagesMobile: string[] = [];
          if (type === "projects") {
            if (screenshots?.desktop) imagesDesktop.push(screenshots.desktop);
            if (screenshots?.mobile) imagesMobile.push(screenshots.mobile);
            (screenshots?.routes || []).forEach((r) => {
              if (r.desktop) imagesDesktop.push(r.desktop);
              if (r.mobile) imagesMobile.push(r.mobile);
            });
            // include explicit carousel and cover at the end
            if (Array.isArray(fm.carousel))
              imagesDesktop.push(...(fm.carousel.filter(Boolean) as string[]));
            if (fm.cover) imagesDesktop.push(fm.cover);
          } else {
            if (fm.cover) imagesDesktop.push(fm.cover);
          }
          // de-duplicate while preserving order
          const dedupe = (arr: string[]) =>
            Array.from(new Set(arr.filter(Boolean)));
          // Add inferred mobile variants for screenshots without explicit mobile
          const inferMobile = (desktop: string) =>
            desktop?.startsWith("/screenshots/") &&
            /\.(png|webp)$/.test(desktop)
              ? desktop.replace(/\.(png|webp)$/, ".mobile.webp")
              : undefined;
          const inferredMobile = imagesDesktop
            .map(inferMobile)
            .filter(Boolean) as string[];
          imagesMobile.push(...inferredMobile);
          const allDesktop = dedupe(imagesDesktop);
          const allMobile = dedupe(imagesMobile);

          const isProject = type === "projects";
          const hasExternalUrl = Boolean(fm.url && isProject);
          const mergedTags = dedupe([
            ...(fm.tags || []),
            ...(fm.categories || []),
          ]);
          const heroImageDesktop = isProject
            ? hasExternalUrl
              ? screenshots?.desktop || fm.cover || allDesktop[0]
              : fm.cover || screenshots?.desktop || allDesktop[0]
            : fm.cover || allDesktop[0];
          const heroImageMobile = isProject
            ? hasExternalUrl
              ? screenshots?.mobile || fm.cover || allMobile[0]
              : fm.cover || screenshots?.mobile || allMobile[0]
            : fm.cover || allMobile[0];
          const canonicalPath = `/${type}/${slug}`;

          return {
            type,
            postType: type === "projects" ? "project" : "blog",
            slug,
            frontmatter: { ...fm, slug },
            body: content,
            filePath,
            screenshots,
            imagesDesktop: allDesktop,
            imagesMobile: allMobile,
            heroImageDesktop,
            heroImageMobile,
            isProject,
            hasExternalUrl,
            mergedTags,
            canonicalPath,
          } satisfies ContentItem;
        } catch (error) {
          console.error(`Error processing ${file.name}:`, error);
          return null;
        }
      })
    );

    // Filter out null items and items marked as hidden
    const validItems = items.filter(Boolean) as ContentItem[];
    const visibleItems = validItems.filter((i) => !i.frontmatter.hidden);

    // Sort: (projects without URL last) → featured first → date desc → title
    visibleItems.sort((a, b) => {
      if (a.type === "projects" && b.type === "projects") {
        const aHasUrl = Boolean(a.frontmatter.url);
        const bHasUrl = Boolean(b.frontmatter.url);
        if (aHasUrl !== bHasUrl) return aHasUrl ? -1 : 1; // items with URL first
      }
      const af = a.frontmatter.featured ? 1 : 0;
      const bf = b.frontmatter.featured ? 1 : 0;
      if (af !== bf) return bf - af;
      const ad = a.frontmatter.date
        ? new Date(a.frontmatter.date).getTime()
        : 0;
      const bd = b.frontmatter.date
        ? new Date(b.frontmatter.date).getTime()
        : 0;
      if (ad !== 0 || bd !== 0) return bd - ad;
      return (a.frontmatter.title || "").localeCompare(
        b.frontmatter.title || ""
      );
    });

    return visibleItems;
  } catch (error) {
    console.error(`Error loading ${type} content:`, error);
    return [];
  }
}

export async function getContent(
  type: ContentType,
  slug: string
): Promise<ContentItem | null> {
  try {
    const dir = typeDir(type);
    const tryNames = [`${slug}.mdx`, `${slug}.md`];

    for (const name of tryNames) {
      const filePath = path.join(dir, name);
      try {
        const raw = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(raw);
        const fm = (data || {}) as ContentFrontmatter;
        const screenshots =
          type === "projects" ? await collectScreenshots(slug, fm) : undefined;

        // Aggregate images (same logic as listContent)
        const imagesDesktop: string[] = [];
        const imagesMobile: string[] = [];
        if (type === "projects") {
          if (screenshots?.desktop) imagesDesktop.push(screenshots.desktop);
          if (screenshots?.mobile) imagesMobile.push(screenshots.mobile);
          (screenshots?.routes || []).forEach((r) => {
            if (r.desktop) imagesDesktop.push(r.desktop);
            if (r.mobile) imagesMobile.push(r.mobile);
          });
          if (Array.isArray(fm.carousel))
            imagesDesktop.push(...(fm.carousel.filter(Boolean) as string[]));
          if (fm.cover) imagesDesktop.push(fm.cover);
        } else {
          if (fm.cover) imagesDesktop.push(fm.cover);
        }
        const dedupe = (arr: string[]) =>
          Array.from(new Set(arr.filter(Boolean)));
        const inferMobile = (desktop: string) =>
          desktop?.startsWith("/screenshots/") && desktop.endsWith(".webp")
            ? desktop.replace(/\.webp$/, ".mobile.webp")
            : undefined;
        const inferredMobile = imagesDesktop
          .map(inferMobile)
          .filter(Boolean) as string[];
        imagesMobile.push(...inferredMobile);
        const allDesktop = dedupe(imagesDesktop);
        const allMobile = dedupe(imagesMobile);

        const isProject = type === "projects";
        const hasExternalUrl = Boolean(fm.url && isProject);
        const mergedTags = dedupe([
          ...(fm.tags || []),
          ...(fm.categories || []),
        ]);
        const heroImageDesktop = isProject
          ? screenshots?.desktop || fm.cover || allDesktop[0]
          : fm.cover || allDesktop[0];
        const heroImageMobile = isProject
          ? screenshots?.mobile || fm.cover || allMobile[0]
          : fm.cover || allMobile[0];
        const canonicalPath = `/${type}/${slug}`;

        return {
          type,
          postType: type === "projects" ? "project" : "blog",
          slug: fm.slug || slug,
          frontmatter: { ...fm, slug: fm.slug || slug },
          body: content,
          filePath,
          screenshots,
          imagesDesktop: allDesktop,
          imagesMobile: allMobile,
          heroImageDesktop,
          heroImageMobile,
          isProject,
          hasExternalUrl,
          mergedTags,
          canonicalPath,
        } satisfies ContentItem;
      } catch (error) {
        console.warn(`Skipped ${type}/${name}: not found or unreadable`);
      }
    }

    console.warn(`No content found for ${type}/${slug}`);
    return null;
  } catch (error) {
    console.error(`Error getting content for ${type}/${slug}:`, error);
    return null;
  }
}

export async function getRelatedPosts(
  currentPost: ContentItem,
  limit = 3
): Promise<ContentItem[]> {
  try {
    const allPosts = await listContent(currentPost.type);

    // Filter out the current post and find posts with similar tags
    const relatedPosts = allPosts
      .filter((post) => post.slug !== currentPost.slug)
      .filter((post) => {
        // If current post has tags, find posts with overlapping tags
        if (
          currentPost.frontmatter.tags &&
          currentPost.frontmatter.tags.length > 0
        ) {
          return post.frontmatter.tags?.some((tag) =>
            currentPost.frontmatter.tags?.includes(tag)
          );
        }
        // If no tags, return posts of the same type
        return true;
      })
      .sort((a, b) => {
        // Sort by tag overlap count first, then by date
        const aTagOverlap =
          currentPost.frontmatter.tags?.filter((tag) =>
            a.frontmatter.tags?.includes(tag)
          ).length || 0;
        const bTagOverlap =
          currentPost.frontmatter.tags?.filter((tag) =>
            b.frontmatter.tags?.includes(tag)
          ).length || 0;

        if (aTagOverlap !== bTagOverlap) {
          return bTagOverlap - aTagOverlap;
        }

        // Then sort by date (newest first)
        const aDate = a.frontmatter.date
          ? new Date(a.frontmatter.date).getTime()
          : 0;
        const bDate = b.frontmatter.date
          ? new Date(b.frontmatter.date).getTime()
          : 0;
        return bDate - aDate;
      })
      .slice(0, limit);

    return relatedPosts;
  } catch (error) {
    console.error("Error getting related posts:", error);
    return [];
  }
}
