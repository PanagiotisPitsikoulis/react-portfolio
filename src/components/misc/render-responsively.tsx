"use client";

import { useIsMobile } from "@/hooks/use-mobile";

/*
If isMobile is true, render the first child, otherwise render the second child.
*/
export default function RenderResponsively({
  children,
  forceMobile,
}: {
  children: React.ReactNode[];
  forceMobile?: boolean;
}) {
  const isMobile = useIsMobile();
  if (children.length !== 2) {
    throw new Error("RenderResponsively must have exactly 2 children");
  }
  return <>{isMobile ? children[0] : children[1]}</>;
}
