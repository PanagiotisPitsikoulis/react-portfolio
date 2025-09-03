import type { ReactElement } from "react";
import {
  makeAbsolute,
  pickBackgroundForSlug,
  pickTextSizes,
  truncate,
} from "./utils";

export function renderPortrait(params: {
  slug: string;
  title: string;
  description: string;
  coverUrl: string;
  origin: string;
}): ReactElement {
  const { slug, title, description, coverUrl, origin } = params;
  const bg = pickBackgroundForSlug(slug);
  const sizes = pickTextSizes("portrait");
  const titleSize = Math.round(sizes.title * 1.1);
  const descSize = Math.round(sizes.desc * 1.05);
  const truncatedTitle = truncate(title, 90);
  const truncatedDesc = truncate(description, 200);
  const absBg = makeAbsolute(bg, origin);
  const absCover = makeAbsolute(coverUrl, origin);
  const absAuthor = makeAbsolute("/author.jpeg", origin);

  return (
    <div tw="relative w-full h-full" style={{ display: "flex" }}>
      <img
        src={absBg}
        alt="background"
        tw="absolute inset-0 w-full h-full object-cover"
      />
      <div
        tw="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.65), rgba(0,0,0,0.35))",
        }}
      />
      <div tw="relative z-10 h-full flex flex-col items-center justify-center px-16">
        {/* Frosted panel behind content */}
        <div
          tw="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-3xl"
          style={{
            width: 860,
            height: 1240,
            backgroundColor: "rgba(10,10,10,0.5)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />
        <div
          tw="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10"
          style={{ width: 940, height: 1210, display: "flex" }}
        >
          <img
            src={absCover}
            alt="cover"
            tw="w-full h-full"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div
          tw="text-center mt-12 w-full"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            tw="text-white font-bold leading-tight"
            style={{ fontSize: titleSize }}
          >
            {truncatedTitle}
          </div>
          <div
            tw="mt-4 rounded-full"
            style={{
              width: 140,
              height: 6,
              background:
                "linear-gradient(90deg, rgba(16,185,129,0.9), rgba(59,130,246,0.9))",
            }}
          />
          {truncatedDesc ? (
            <div
              tw="text-gray-200 mt-4 leading-snug max-w-[900px]"
              style={{ fontSize: descSize }}
            >
              {truncatedDesc}
            </div>
          ) : null}
          {/* Brand row */}
          <div
            tw="mt-8 flex items-center text-gray-300"
            style={{ display: "flex" }}
          >
            <img
              src={absAuthor}
              alt="author"
              tw="rounded-full"
              style={{ width: 40, height: 40 }}
            />
            <div tw="mx-3 h-[18px] w-[1px] bg-white/20" />
            <div tw="text-sm">panagiotis.dev</div>
          </div>
        </div>
      </div>
    </div>
  );
}
