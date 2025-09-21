import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "deifkwefumgah.cloudfront.net" },
      { protocol: "https", hostname: "pagedone.io" },
      { protocol: "https", hostname: "opengraph.githubassets.com" },
    ],
  },
  experimental: {
    reactCompiler: true,
    viewTransition: true,
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
    development: process.env.NODE_ENV === "development",
  },
});

export default withMDX(nextConfig);
