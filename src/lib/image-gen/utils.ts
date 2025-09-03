export const backgrounds = [
  "/images/cactus.png",
  "/images/chair.png",
  "/images/chairs.png",
  "/images/tennis.png",
  "/images/window.png",
];

export type OgOrientation = "square" | "portrait" | "landscape";

function hashStringToInt(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function pickBackgroundForSlug(slug: string) {
  const index = hashStringToInt(slug) % backgrounds.length;
  return backgrounds[index];
}

export function makeAbsolute(url: string, origin: string) {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("/")) return `${origin}${url}`;
  return `${origin}/${url.replace(/^\.?\/?/, "")}`;
}

export function pickTextSizes(orientation: OgOrientation) {
  if (orientation === "portrait") return { title: 96, desc: 36 };
  if (orientation === "landscape") return { title: 84, desc: 34 };
  return { title: 88, desc: 36 };
}

export function truncate(input: string, max: number) {
  if (!input) return "";
  return input.length > max ? `${input.slice(0, max - 1)}…` : input;
}
