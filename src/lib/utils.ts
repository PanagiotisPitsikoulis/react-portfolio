import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Resolve a project's screenshot or fall back to cover/default.
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

// Evenly spread primary images with fallback images to a fixed length mosaic.
export function buildMosaicImages(
  primaryImages: string[],
  fallbackImages: string[],
  options?: { length?: number }
): string[] {
  let targetLength =
    options?.length && options.length > 0 ? options.length : 24;
  // Enforce even length for strict 1:1 ratio
  if (targetLength % 2 !== 0) targetLength += 1;

  const primary = (primaryImages || []).filter(Boolean);
  const defaults = (fallbackImages || []).filter(Boolean);

  if (primary.length === 0 && defaults.length === 0) return [];

  // If only one source present, repeat it to fill
  if (primary.length === 0) {
    return Array.from(
      { length: targetLength },
      (_, i) => defaults[i % defaults.length]
    );
  }
  if (defaults.length === 0) {
    return Array.from(
      { length: targetLength },
      (_, i) => primary[i % primary.length]
    );
  }

  // Build arrays to exact halves then interleave (P, D, P, D, ...)
  const half = Math.floor(targetLength / 2);
  const repeatedPrimary = Array.from(
    { length: half },
    (_, i) => primary[i % primary.length]
  );
  const repeatedDefaults = Array.from(
    { length: half },
    (_, i) => defaults[i % defaults.length]
  );

  const result: string[] = [];
  for (let i = 0; i < half; i++) {
    result.push(repeatedPrimary[i]);
    result.push(repeatedDefaults[i]);
  }

  return result;
}
