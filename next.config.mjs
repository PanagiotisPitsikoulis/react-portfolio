import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "deifkwefumgah.cloudfront.net" },
    ],
  },
  experimental: {
    reactCompiler: true,
    viewTransition: true,
    mdxRs: {
      jsxRuntime: "automatic",
      jsxImportSource: "react",
      mdxType: "gfm",
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ["remark-gfm", "remark-frontmatter"],
    rehypePlugins: ["rehype-slug", "rehype-highlight"],
  },
});

export default withMDX(nextConfig);
