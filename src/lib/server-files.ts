// Server-only utilities for filesystem checks
export async function getScreenshotOrCover(
  slug: string,
  cover?: string,
  options?: { mobile?: boolean }
): Promise<string> {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const desktopName = `${slug}.webp`;
  const mobileName = `${slug}.mobile.webp`;
  const primaryName = options?.mobile ? mobileName : desktopName;
  const fallbackName = options?.mobile ? desktopName : mobileName;
  const screenshotsDir = path.join(process.cwd(), "public", "screenshots");

  const primaryPath = path.join(screenshotsDir, primaryName);
  const fallbackPath = path.join(screenshotsDir, fallbackName);

  // Try primary
  try {
    await fs.access(primaryPath);
    return `/screenshots/${primaryName}`;
  } catch {}

  // Try fallback variant (desktop<->mobile)
  try {
    await fs.access(fallbackPath);
    return `/screenshots/${fallbackName}`;
  } catch {}

  // Finally, fallback to cover or a known local placeholder
  return cover || "/images/Silhouette Flower Art.webp";
}
