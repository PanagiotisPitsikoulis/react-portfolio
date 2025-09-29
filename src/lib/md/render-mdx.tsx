"use client";
import { useMDXComponents } from "@/components/mdx-components";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export async function serializeMDX(
  content: string,
): Promise<MDXRemoteSerializeResult> {
  return await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeHighlight],
      development: process.env.NODE_ENV === "development",
    },
  });
}

export function MDXContent({ source }: { source: MDXRemoteSerializeResult }) {
  const components = useMDXComponents({});

  return (
    <div className="max-w-xl text-pretty">
      <MDXRemote {...source} components={components} />
    </div>
  );
}
