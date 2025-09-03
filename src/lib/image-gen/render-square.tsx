import type { ReactElement } from "react";
import {
  makeAbsolute,
  pickBackgroundForSlug,
  pickTextSizes,
  truncate,
} from "./utils";

export function renderSquare(params: {
  slug: string;
  title: string;
  description: string;
  coverUrl: string;
  origin: string;
}): ReactElement {
  const { slug, title, description, coverUrl, origin } = params;
  const bg = pickBackgroundForSlug(slug);
  const sizes = pickTextSizes("square");
  const titleSize = Math.round(sizes.title * 1.1);
  const descSize = Math.round(sizes.desc * 1.1);
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
            "linear-gradient(160deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4))",
        }}
      />
      <div
        tw="relative z-10 w-full h-full flex px-24"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          tw="flex flex-col gap-10 w-full"
          style={{
            display: "flex",
            width: "100%",
            maxWidth: 900,
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {/* Frosted block behind content */}
          <div
            tw="absolute left-1/2 -translate-x-1/2 rounded-3xl"
            style={{
              width: 980,
              height: 700,
              backgroundColor: "rgba(10,10,10,0.55)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
          <div
            tw="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10"
            style={{ width: 1040, height: 610, display: "flex" }}
          >
            <img src={absCover} alt="cover" tw="w-full h-full object-cover" />
          </div>
          <div
            tw="text-center w-full"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              tw="text-white font-bold leading-none"
              style={{ fontSize: titleSize }}
            >
              {truncatedTitle}
            </div>
            {truncatedDesc ? (
              <div
                tw="text-gray-200 mt-4 leading-snug max-w-[900px]"
                style={{ fontSize: descSize }}
              >
                {truncatedDesc}
              </div>
            ) : null}
            <div
              tw="mt-4 rounded-full"
              style={{
                width: 120,
                height: 6,
                background:
                  "linear-gradient(90deg, rgba(16,185,129,0.9), rgba(59,130,246,0.9))",
              }}
            />
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
    </div>
  );
}
