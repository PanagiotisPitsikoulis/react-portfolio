"use client";

import { useMDXComponents } from "@/components/mdx-components";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

interface MDXContentProps {
  source: string;
}

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
    <div className="max-w-none">
      <MDXRemote {...source} components={components} />
    </div>
  );
}

// Fallback renderer for when MDXRemote is not available or for simple content
export function SimpleMDXContent({ source }: MDXContentProps) {
  const [mdxSource, setMdxSource] =
    React.useState<MDXRemoteSerializeResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    serializeMDX(source)
      .then(setMdxSource)
      .catch((err) => {
        console.error("Error serializing MDX:", err);
        setError("Failed to render content");
      });
  }, [source]);

  if (error) {
    return (
      <div className="text-danger bg-danger-50 p-4 rounded-lg">
        <p>Error rendering content: {error}</p>
      </div>
    );
  }

  if (!mdxSource) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-content2 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-content2 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-content2 rounded w-2/3 mb-4"></div>
      </div>
    );
  }

  return <MDXContent source={mdxSource} />;
}
