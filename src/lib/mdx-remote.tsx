import * as React from 'react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdx from 'remark-mdx'
import remarkMath from 'remark-math'
import remarkEmoji from 'remark-emoji'
import remarkBreaks from 'remark-breaks'
import remarkToc from 'remark-toc'
import remarkUnwrapImages from 'remark-unwrap-images'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import { mdxComponents } from '@/components/mdx-components'

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
        [remarkToc, { heading: 'toc|table[ -]of[ -]contents?', tight: true }],
        remarkUnwrapImages,
      ],
      rehypePlugins: [
        rehypeRaw,
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'append' }],
        [rehypeExternalLinks, { rel: ['nofollow', 'noopener', 'noreferrer'], target: '_blank' }],
      ],
      format: 'mdx',
      development: process.env.NODE_ENV !== 'production',
    },
  })
  return mdxSource
}

export function MDXRemoteContent({ compiled }: { compiled: MDXRemoteSerializeResult }) {
  return <MDXRemote {...compiled} components={mdxComponents as any} />
}
