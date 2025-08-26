import { useMDXComponents } from "@/components/mdx-components";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkEmoji from "remark-emoji";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkMdx from "remark-mdx";
import remarkToc from "remark-toc";

export async function compileMdx(source: string) {
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdx,
        remarkGfm,
        remarkMath,
        remarkEmoji,
        remarkBreaks,
        [remarkToc, { heading: "toc|table[ -]of[ -]contents?", tight: true }],
      ],
      rehypePlugins: [
        rehypeRaw,
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "append" }],
        [
          rehypeExternalLinks,
          { rel: ["nofollow", "noopener", "noreferrer"], target: "_blank" },
        ],
      ],
      format: "mdx",
      development: process.env.NODE_ENV !== "production",
    },
  });
  return mdxSource;
}

export function MDXRemoteContent({
  compiled,
}: {
  compiled: MDXRemoteSerializeResult;
}) {
  return <MDXRemote {...compiled} components={useMDXComponents as any} />;
}
