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
  const projects = [];
  for (const file of files) {
    try {
      const raw = await fs.readFile(file, "utf8");
      const { data } = matter(raw);
      const url = data?.url;
      if (!url || typeof url !== "string") continue;
      const slug = deriveSlug(file, data);
      projects.push({ slug, url });
    } catch (err) {
      console.warn(`Skipping ${file}:`, err?.message || err);
    }
  }
  return projects;
}

async function takeScreenshots(projects, outDir) {
  const puppeteer = await import("puppeteer");
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();

    const viewports = [
      // Use a higher desktop resolution (approx Tailwind 2xl width with 16:10 ratio)
      { name: "desktop", width: 1536, height: 960, deviceScaleFactor: 1 },
      { name: "mobile", width: 390, height: 844, deviceScaleFactor: 2, isMobile: true },
    ];

    for (const { slug, url } of projects) {
      for (const vp of viewports) {
        try {
          await page.setViewport({
            width: vp.width,
            height: vp.height,
            deviceScaleFactor: vp.deviceScaleFactor,
            isMobile: Boolean(vp.isMobile),
            hasTouch: Boolean(vp.isMobile),
          });

          const targetUrl = url.startsWith("http") ? url : `https://${url.replace(/^\/+/, "")}`;
          await page.goto(targetUrl, { waitUntil: "networkidle2", timeout: 60000 });

          // Small settle delay for heavy sites (compatible with Puppeteer v24+)
          await new Promise((resolve) => setTimeout(resolve, 1200));

          const suffix = vp.name === "desktop" ? "" : ".mobile";
          const outPath = path.join(outDir, `${slug}${suffix}.png`);
          await page.screenshot({ path: outPath, fullPage: false });
          console.log(`Saved ${outPath}`);
        } catch (err) {
          console.warn(`Failed screenshot for ${slug} [${vp.name}] -> ${url}:`, err?.message || err);
        }
      }
    }
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
