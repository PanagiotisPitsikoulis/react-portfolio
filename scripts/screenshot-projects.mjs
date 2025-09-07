import matter from "gray-matter";
import fs from "node:fs/promises";
import path from "node:path";

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {}
}

async function readProjectFiles(projectsDir) {
  const entries = await fs.readdir(projectsDir, { withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile() && /\.(md|mdx)$/i.test(e.name))
    .map((e) => path.join(projectsDir, e.name));
  return files;
}

function deriveSlug(filePath, data) {
  if (data?.slug && typeof data.slug === "string") return data.slug;
  const base = path.basename(filePath);
  return base.replace(/\.(md|mdx)$/i, "");
}

async function parseProjects(projectsDir) {
  const files = await readProjectFiles(projectsDir);
  const targets = [];
  for (const file of files) {
    try {
      const raw = await fs.readFile(file, "utf8");
      const { data } = matter(raw);
      const slug = deriveSlug(file, data);

      const seen = new Set();
      function pushUrl(u, routeKey) {
        if (!u || typeof u !== "string") return;
        const normalized = u.trim();
        if (!normalized) return;
        if (seen.has(normalized)) return;
        seen.add(normalized);
        targets.push({ slug, url: normalized, routeKey });
      }

      // Primary site URL (homepage)
      if (typeof data?.url === "string") pushUrl(data.url, "home");

      // Additional routes (array of absolute or relative URLs)
      if (Array.isArray(data?.routes)) {
        for (const r of data.routes) {
          if (typeof r !== "string") continue;
          const key = deriveRouteKey(r);
          pushUrl(r, key);
        }
      }
    } catch (err) {
      console.warn(`Skipping ${file}:`, err?.message || err);
    }
  }
  return targets;
}

function deriveRouteKey(input) {
  try {
    // Support relative and absolute
    const u = new URL(input, "https://example.local");
    const pathname = u.pathname || "/";
    const segment =
      pathname === "/" ? "home" : pathname.replace(/^\/+|\/+$/g, "");
    return sanitizeKey(segment || "home");
  } catch {
    // Fallback: sanitize raw input
    return sanitizeKey(String(input || "route"));
  }
}

function sanitizeKey(key) {
  return (
    String(key)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "route"
  );
}

async function takeScreenshots(projects, outDir) {
  const puppeteer = await import("puppeteer");
  const browser = await puppeteer.launch({ headless: true });
  try {
    const viewports = [
      // Desktop viewport (16:10)
      { name: "desktop", width: 1440, height: 900, deviceScaleFactor: 1 },
      // iPhone 15 Pro logical viewport
      {
        name: "mobile",
        width: 393,
        height: 852,
        deviceScaleFactor: 3,
        isMobile: true,
      },
    ];

    // Prepare tasks (project x viewport)
    const tasks = projects.flatMap(({ slug, url, routeKey }) =>
      viewports.map((vp) => ({ slug, url, routeKey, vp }))
    );

    // Simple concurrency limiter
    const limit = (concurrency) => {
      let active = 0;
      const queue = [];
      const run = async (fn, resolve, reject) => {
        active++;
        try {
          const res = await fn();
          resolve(res);
        } catch (e) {
          reject(e);
        } finally {
          active--;
          if (queue.length) {
            const next = queue.shift();
            next();
          }
        }
      };
      return (fn) =>
        new Promise((resolve, reject) => {
          const task = () => run(fn, resolve, reject);
          if (active < concurrency) task();
          else queue.push(task);
        });
    };

    const limiter = limit(1);

    const captureOne = async ({ slug, url, routeKey, vp }) => {
      const page = await browser.newPage();
      try {
        // Force dark mode before any scripts run
        await page.emulateMediaFeatures([
          { name: "prefers-color-scheme", value: "dark" },
        ]);
        await page.evaluateOnNewDocument(() => {
          try {
            localStorage.setItem("theme", "dark");
          } catch {}
        });

        await page.setViewport({
          width: vp.width,
          height: vp.height,
          deviceScaleFactor: vp.deviceScaleFactor,
          isMobile: Boolean(vp.isMobile),
          hasTouch: Boolean(vp.isMobile),
        });

        // Normalize URL and strip hash to avoid anchor auto-scroll
        let targetUrl;
        try {
          const isAbs = /^https?:\/\//i.test(url);
          const base = isAbs ? undefined : "https://";
          const u = new URL(isAbs ? url : `${base}${url.replace(/^\/+/, "")}`);
          u.hash = ""; // ensure top regardless of route
          targetUrl = u.toString();
        } catch {
          targetUrl = url.startsWith("http")
            ? url
            : `https://${url.replace(/^\/+/, "")}`;
        }

        await page.goto(targetUrl, {
          waitUntil: "networkidle2",
          timeout: 10000,
        });

        // Force scroll to top to avoid anchored sections
        await page.evaluate(() => window.scrollTo(0, 0));
        // Enforce dark UI after load as well (for class-based theming)
        await page.addStyleTag({
          content: "html,:root{color-scheme:dark!important}",
        });
        await page.evaluate(() => {
          try {
            document.documentElement.classList.add("dark");
            document.documentElement.setAttribute("data-theme", "dark");
          } catch {}
        });
        await new Promise((resolve) => setTimeout(resolve, 10000));

        const suffix = vp.name === "desktop" ? "" : ".mobile";
        const keyPart = routeKey && routeKey !== "home" ? `.${routeKey}` : "";
        const outPath = path.join(outDir, `${slug}${keyPart}${suffix}.png`);
        await page.screenshot({ path: outPath, fullPage: false });
        console.log(`Saved ${outPath}`);
      } catch (err) {
        console.warn(
          `Failed screenshot for ${slug}${routeKey ? `:${routeKey}` : ""} [${
            vp.name
          }] -> ${url}:`,
          err?.message || err
        );
      } finally {
        await page.close().catch(() => {});
      }
    };

    await Promise.all(tasks.map((t) => limiter(() => captureOne(t))));
  } finally {
    await browser.close();
  }
}

async function main() {
  const root = process.cwd();
  const projectsDir = path.join(root, "content", "projects");
  const outDir = path.join(root, "public", "screenshots");

  await ensureDir(outDir);

  const projects = await parseProjects(projectsDir);
  if (projects.length === 0) {
    console.log("No project URLs found; skipping screenshots.");
    return;
  }

  await takeScreenshots(projects, outDir);
}

main().catch((err) => {
  console.error("Screenshot prebuild failed:", err);
  process.exitCode = 1;
});
