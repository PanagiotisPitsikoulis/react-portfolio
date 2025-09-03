import type { ReactElement } from "react";
import {
  makeAbsolute,
  pickBackgroundForSlug,
  pickTextSizes,
  truncate,
} from "./utils";

export function renderLandscape(params: {
  slug: string;
  title: string;
  description: string;
  coverUrl: string;
  origin: string;
}): ReactElement {
  const { slug, title, description, coverUrl, origin } = params;
  const bg = pickBackgroundForSlug(slug);
  const sizes = pickTextSizes("landscape");
  const titleSize = Math.round(sizes.title * 1.2);
  const descSize = Math.round(sizes.desc * 1.2);
  const truncatedTitle = truncate(title, 90);
  const truncatedDesc = truncate(description, 200);
  const absBg = makeAbsolute(bg, origin);
  const absCover = makeAbsolute(coverUrl, origin);
  const absAuthor = makeAbsolute("/author.jpeg", origin);

  return (
    <div tw="relative w-full h-full" style={{ display: "flex" }}>
      <div
        tw="absolute inset-0"
        style={{
          backgroundImage: `url(${absBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        tw="absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, rgba(0,0,0,0.65), rgba(0,0,0,0.35))",
        }}
      />
      <div tw="relative w-full h-full flex" style={{ display: "flex" }}>
        {/* Frosted content panel */}
        <div
          tw="absolute left-12 right-[52%] top-1/2 -translate-y-1/2 rounded-3xl"
          style={{
            backgroundColor: "rgba(10,10,10,0.55)",
            border: "1px solid rgba(255,255,255,0.08)",
            height: 900,
          }}
        />
        <div
          tw="flex flex-col justify-center px-20"
          style={{ width: "48%", display: "flex" }}
        >
          <div
            tw="text-white font-bold leading-tight"
            style={{ fontSize: titleSize }}
          >
            {truncatedTitle}
          </div>
          {truncatedDesc ? (
            <div
              tw="text-gray-200 mt-6 leading-snug"
              style={{ fontSize: descSize }}
            >
              {truncatedDesc}
            </div>
          ) : null}
          {/* Brand row */}
          <div
            tw="mt-10 flex items-center text-gray-300"
            style={{ display: "flex" }}
          >
            <img
              src={absAuthor}
              alt="author"
              tw="rounded-full"
              style={{ width: 42, height: 42 }}
            />
            <div tw="mx-3 h-[20px] w-[1px] bg-white/20" />
            <div tw="text-sm">panagiotis.dev</div>
          </div>
        </div>
        <div
          tw="flex items-center justify-center pr-16"
          style={{ width: "52%", display: "flex" }}
        >
          <div
            tw="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10"
            style={{ width: 1200, height: 800, display: "flex" }}
          >
            <img
              src={absCover}
              alt="cover"
              tw="w-full h-full"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
