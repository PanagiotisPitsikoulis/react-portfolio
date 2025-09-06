// Server-only utilities for filesystem checks
export async function getScreenshotOrCover(
  slug: string,
  cover?: string,
  options?: { mobile?: boolean }
): Promise<string> {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const desktopName = `${slug}.png`;
  const mobileName = `${slug}.mobile.png`;
  const fileName = options?.mobile ? mobileName : desktopName;
  const candidate = path.join(process.cwd(), "public", "screenshots", fileName);
  try {
    await fs.access(candidate);
    return `/screenshots/${fileName}`;
  } catch {
    return cover || "/default-cover.png";
  }
}
