import type { MDXComponents } from "mdx/types";
import { useMDXComponents as getComponents } from "@/components/mdx-components";

// This file is required by Next.js for MDX support
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return getComponents(components);
}
