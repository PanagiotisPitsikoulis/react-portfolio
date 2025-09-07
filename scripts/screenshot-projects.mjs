import matter from "gray-matter";
import fs from "node:fs/promises";
import path from "node:path";

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {}
}

async function clearDir(dir) {
  try {
    await fs.rm(dir, { recursive: true, force: true });
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
      const isSlowWebsite = Boolean(data?.isSlowWebsite);

      const seen = new Set();
      function pushUrl(u, routeKey) {
        if (!u || typeof u !== "string") return;
        const normalized = u.trim();
        if (!normalized) return;
        if (seen.has(normalized)) return;
        seen.add(normalized);
        targets.push({ slug, url: normalized, routeKey, isSlowWebsite });
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
    const baseKey = sanitizeKey(segment || "home");
    const hash = (u.hash || "").replace(/^#/, "");
    if (hash) {
      const hashKey = sanitizeKey(hash);
      return hashKey ? `${baseKey}.${hashKey}` : baseKey;
    }
    return baseKey;
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
  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });
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
    const tasks = projects.flatMap(({ slug, url, routeKey, isSlowWebsite }) =>
      viewports.map((vp) => ({ slug, url, routeKey, isSlowWebsite, vp }))
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

    const slowLimiter = limit(5);
    const fastLimiter = limit(3);

    const captureOne = async ({ slug, url, routeKey, isSlowWebsite, vp }) => {
      const page = await browser.newPage();
      try {
        // Harden timeouts and UA to reduce blocks/timeouts
        const MAX_NAV_TIMEOUT = 100000;
        const PRIMARY_SETTLE_DELAY_MS = isSlowWebsite ? 6000 : 800; // initial settle after load
        const SECONDARY_ANIMATION_DELAY_MS = isSlowWebsite ? 2000 : 800; // extra delay so animations can play
        const STABLE_WINDOW_MS = isSlowWebsite ? 2000 : 1000; // time with no layout change
        const STABLE_TIMEOUT_MS = isSlowWebsite ? 8000 : 5000; // max stability wait
        await page.setDefaultNavigationTimeout(MAX_NAV_TIMEOUT);
        await page.setDefaultTimeout(MAX_NAV_TIMEOUT);
        await page.setUserAgent(
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
        );
        await page.setExtraHTTPHeaders({ "Accept-Language": "en-US,en;q=0.9" });
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

        // Normalize URL and handle hash fragments (anchors)
        let targetUrl;
        let anchorFragment = "";
        try {
          const isAbs = /^https?:\/\//i.test(url);
          const base = isAbs ? undefined : "https://";
          const u = new URL(isAbs ? url : `${base}${url.replace(/^\/+/, "")}`);
          anchorFragment = (u.hash || "").replace(/^#/, "");
          u.hash = ""; // navigate without hash; we'll scroll manually
          targetUrl = u.toString();
        } catch {
          const m = /#([^#]+)$/.exec(url || "");
          anchorFragment = m ? m[1] : "";
          targetUrl = url.startsWith("http")
            ? url
            : `https://${url.replace(/^\/+/, "")}`;
          // strip hash manually if present
          if (targetUrl.includes("#")) targetUrl = targetUrl.split("#")[0];
        }

        console.log(
          `\n🚀 Starting: ${slug}${routeKey ? `:${routeKey}` : ""} [${
            vp.name
          }] -> ${targetUrl} ${
            anchorFragment ? `(anchor: #${anchorFragment})` : ""
          } ${isSlowWebsite ? "(🐢 slow-site mode)" : "(⚡ fast mode)"}`
        );

        const tryNavigate = async (u) => {
          try {
            await page.goto(u, {
              waitUntil: "networkidle2",
              timeout: MAX_NAV_TIMEOUT,
            });
            return true;
          } catch (e1) {
            try {
              await page.goto(u, {
                waitUntil: "domcontentloaded",
                timeout: MAX_NAV_TIMEOUT,
              });
              return true;
            } catch (e2) {
              return false;
            }
          }
        };

        let navigated = await tryNavigate(targetUrl);
        if (!navigated && targetUrl.startsWith("https://")) {
          const httpUrl = targetUrl.replace(/^https:\/\//, "http://");
          navigated = await tryNavigate(httpUrl);
          if (navigated) targetUrl = httpUrl;
        }
        if (!navigated) {
          throw new Error(`Navigation failed for ${targetUrl}`);
        }
        console.log("✅ Navigated:", targetUrl);

        // Ensure top before any manual anchor scroll
        await page.evaluate(() => {
          try {
            (
              document.scrollingElement || document.documentElement
            ).scrollTop = 0;
          } catch {}
          window.scrollTo({ top: 0, behavior: "auto" });
        });
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
        // wait extra for heavy pages or animations
        console.log(`⏳ Waiting primary settle: ${PRIMARY_SETTLE_DELAY_MS}ms`);
        await new Promise((resolve) =>
          setTimeout(resolve, PRIMARY_SETTLE_DELAY_MS)
        );

        // Wait for layout stability (no scrollHeight change for a period)
        const stable1 = await page.evaluate(
          async (stableMs, timeoutMs) => {
            const start = Date.now();
            let lastH = document.documentElement.scrollHeight;
            let lastChange = Date.now();
            return await new Promise((resolve) => {
              const tick = () => {
                const h = document.documentElement.scrollHeight;
                const now = Date.now();
                if (h !== lastH) {
                  lastH = h;
                  lastChange = now;
                }
                if (now - lastChange >= stableMs) return resolve(true);
                if (now - start >= timeoutMs) return resolve(false);
                setTimeout(tick, 200);
              };
              tick();
            });
          },
          STABLE_WINDOW_MS,
          STABLE_TIMEOUT_MS
        );
        console.log(
          stable1
            ? "🧘 Layout stable after load."
            : "⌛ Stability wait timed out after load."
        );

        // If base URL (no anchor), ensure we are at the very top after settle
        if (!anchorFragment) {
          await page.evaluate(() => {
            try {
              (
                document.scrollingElement || document.documentElement
              ).scrollTop = 0;
            } catch {}
            window.scrollTo({ top: 0, behavior: "auto" });
          });
          console.log("🔝 Forced scroll to top (no anchor).");
          await new Promise((resolve) => setTimeout(resolve, 200));
        }

        // If an anchor fragment was provided, scroll it into view with offset for sticky/fixed navbars
        if (anchorFragment) {
          const scrolled = await page.evaluate(async (frag) => {
            // Polyfill CSS.escape if missing
            if (
              typeof CSS === "undefined" ||
              typeof CSS.escape !== "function"
            ) {
              // minimal escape polyfill
              window.CSS = window.CSS || {};
              window.CSS.escape = (s) =>
                String(s).replace(
                  /[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/g,
                  "\\$&"
                );
            }
            const decode = (s) => {
              try {
                return decodeURIComponent(s);
              } catch {
                return s;
              }
            };
            const idRaw = decode(frag);
            // Let the browser perform native anchor scroll first
            try {
              // Force native anchor navigation by resetting hash
              if (location.hash !== `#${idRaw}`) {
                location.hash = `#${idRaw}`;
              } else {
                // Re-assign to trigger scroll even if same hash
                location.hash = "";
                location.hash = `#${idRaw}`;
              }
            } catch {}
            // Poll for the element to appear (SPA content)
            const deadline = Date.now() + 4000; // 4s max
            let el = null;
            while (Date.now() < deadline) {
              el =
                document.getElementById(idRaw) ||
                document.querySelector(`[id="${CSS.escape(idRaw)}"]`) ||
                document.querySelector(`[name="${CSS.escape(idRaw)}"]`) ||
                document.querySelector(`#${CSS.escape(idRaw)}`) ||
                document.querySelector(`.${CSS.escape(idRaw)}`) ||
                document.querySelector(`[id*="${CSS.escape(idRaw)}"]`) ||
                document.querySelector(`[data-anchor="${CSS.escape(idRaw)}"]`);
              if (el) break;
              await new Promise((r) => setTimeout(r, 150));
            }

            // Compute header offset from fixed/sticky headers at the top
            const topBarHeight = (() => {
              let maxH = 0;
              const candidates = Array.from(
                document.querySelectorAll(
                  "header, nav, [data-navbar], [data-header]"
                )
              );
              for (const c of candidates) {
                const s = getComputedStyle(c);
                const r = c.getBoundingClientRect();
                if (
                  (s.position === "fixed" || s.position === "sticky") &&
                  r.top <= 0 &&
                  r.height > 32 &&
                  r.height < window.innerHeight / 2
                ) {
                  maxH = Math.max(maxH, Math.ceil(r.height));
                }
              }
              if (maxH === 0) maxH = window.innerWidth < 768 ? 80 : 64;
              return maxH + 12; // cushion
            })();

            if (el) {
              const y =
                el.getBoundingClientRect().top +
                window.pageYOffset -
                topBarHeight;
              try {
                (
                  document.scrollingElement || document.documentElement
                ).scrollTop = Math.max(0, y);
              } catch {}
              window.scrollTo({ top: Math.max(0, y), behavior: "auto" });
              return true;
            }
            // fallback: stay at top
            try {
              (
                document.scrollingElement || document.documentElement
              ).scrollTop = 0;
            } catch {}
            window.scrollTo({ top: 0, behavior: "auto" });
            return false;
          }, anchorFragment);
          console.log(
            scrolled
              ? "🧭 Scrolled to anchor with navbar offset."
              : "⚠️ Anchor element not found; captured from top."
          );
          // allow minor layout settle after scroll
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Wait for stability again after anchor scroll
          const stable2 = await page.evaluate(
            async (stableMs, timeoutMs) => {
              const start = Date.now();
              let lastH = document.documentElement.scrollHeight;
              let lastChange = Date.now();
              return await new Promise((resolve) => {
                const tick = () => {
                  const h = document.documentElement.scrollHeight;
                  const now = Date.now();
                  if (h !== lastH) {
                    lastH = h;
                    lastChange = now;
                  }
                  if (now - lastChange >= stableMs) return resolve(true);
                  if (now - start >= timeoutMs) return resolve(false);
                  setTimeout(tick, 200);
                };
                tick();
              });
            },
            STABLE_WINDOW_MS,
            STABLE_TIMEOUT_MS
          );
          console.log(
            stable2
              ? "🧘 Layout stable after anchor scroll."
              : "⌛ Stability wait timed out after anchor scroll."
          );
        }

        // Secondary delay so entrance animations can complete
        console.log(
          `⏳ Waiting secondary animation delay: ${SECONDARY_ANIMATION_DELAY_MS}ms`
        );
        await new Promise((resolve) =>
          setTimeout(resolve, SECONDARY_ANIMATION_DELAY_MS)
        );

        const currentY = await page.evaluate(() => Math.round(window.scrollY));
        console.log(
          `🖼️ Capturing at Y=${currentY} (viewport ${vp.width}x${vp.height}@${
            vp.deviceScaleFactor || 1
          })`
        );

        const suffix = vp.name === "desktop" ? "" : ".mobile";
        const keyPart = routeKey && routeKey !== "home" ? `.${routeKey}` : "";
        const outPath = path.join(outDir, `${slug}${keyPart}${suffix}.png`);
        await page.screenshot({ path: outPath, fullPage: false });
        console.log(`📸 Saved ${outPath}`);
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

    // Run slow sites first (simultaneously), then fast ones
    const slowTasks = tasks.filter((t) => t.isSlowWebsite);
    const fastTasks = tasks.filter((t) => !t.isSlowWebsite);

    await Promise.all(slowTasks.map((t) => slowLimiter(() => captureOne(t))));
    await Promise.all(fastTasks.map((t) => fastLimiter(() => captureOne(t))));
  } finally {
    await browser.close();
  }
}

async function main() {
  const root = process.cwd();
  const projectsDir = path.join(root, "content", "projects");
  const outDir = path.join(root, "public", "screenshots");

  // Start clean: remove previous screenshots and recreate the directory
  await clearDir(outDir);
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
