import { generateOgForSlug } from "@/lib/image-gen";
import { NextRequest } from "next/server";

export const dynamic = "force-static";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string; orientation: string }> }
) {
  const { slug, orientation } = await params;
  if (!slug) return new Response("slug is required", { status: 400 });
  if (!orientation)
    return new Response("orientation is required", { status: 400 });
  const origin = req.nextUrl.origin;
  return generateOgForSlug(slug, orientation as any, origin);
}
