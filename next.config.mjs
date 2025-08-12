import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    reactCompiler: true,
    viewTransition: true,
    useLightningCss: true,
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
