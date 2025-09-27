import { cn } from "@/lib/utils";
import React from "react";
import { ContentPage } from "./component";

interface PostLayoutProps {
  // Hero section
  hero?: React.ReactNode;
  isHeroDark?: boolean;

  // Content
  children?: React.ReactNode;
  toc?: React.ReactNode;

  // Widget slots for content above MDX
  widgets?: React.ReactNode[];

  // Styling
  className?: string;
  contentClassName?: string;
  sidebarClassName?: string;
}

export const PostLayout = ({
  hero,
  isHeroDark = false,
  children,
  toc,
  widgets = [],
  className = "",
  contentClassName = "",
  sidebarClassName = "",
}: PostLayoutProps) => {
  return (
    <ContentPage
      hero={hero}
      isHeroDark={isHeroDark}
      layout="split"
      widgets={widgets}
      sidebar={toc && <>{toc}</>}
      className={className}
      contentClassName={cn(
        "prose prose-gray dark:prose-invert max-w-none",
        contentClassName
      )}
      sidebarClassName={cn("sticky top-8 h-fit", sidebarClassName)}
    >
      {children}
    </ContentPage>
  );
};
