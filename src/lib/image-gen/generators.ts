import { ImageResponse } from "next/og";
import { renderLandscape } from "./render-landscape";
import { renderPortrait } from "./render-portrait";
import { renderSquare } from "./render-square";

export async function generateSquareImage(params: {
  slug: string;
  title: string;
  description: string;
  coverUrl: string;
  origin: string;
}) {
  return new ImageResponse(renderSquare(params), {
    width: 1600,
    height: 1600,
  });
}

export async function generatePortraitImage(params: {
  slug: string;
  title: string;
  description: string;
  coverUrl: string;
  origin: string;
}) {
  return new ImageResponse(renderPortrait(params), {
    width: 1200,
    height: 1800,
  });
}

export async function generateLandscapeImage(params: {
  slug: string;
  title: string;
  description: string;
  coverUrl: string;
  origin: string;
}) {
  return new ImageResponse(renderLandscape(params), {
    width: 1920,
    height: 1080,
  });
}
