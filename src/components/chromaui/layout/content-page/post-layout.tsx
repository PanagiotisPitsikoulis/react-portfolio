import { cn } from "@/lib/utils";
import React from "react";
import { ContentPage } from "./component";
import { ToCMobile } from "@/components/chromaui/markdown/toc-mobile";

interface PostLayoutProps {
  hero?: React.ReactNode;
  children?: React.ReactNode;
  toc?: React.ReactNode;
  tocContent?: string;
  contentAbove?: React.ReactNode;
  widgets?: React.ReactNode[];
}

export const PostLayout = ({
  hero,
  children,
  contentAbove,
  toc,
  tocContent,
  widgets = [],
}: PostLayoutProps) => {
  // Add mobile TOC as a widget that appears above content on mobile
  const allWidgets = [
    ...widgets,
    ...(tocContent
      ? [
          <div key="mobile-toc" className="lg:hidden">
            <ToCMobile content={tocContent} />
          </div>,
        ]
      : []),
  ];

  return (
    <ContentPage
      hero={hero}
      contentAbove={contentAbove}
      isHeroDark={true}
      layout="split"
      widgets={allWidgets}
      sidebar={toc && <>{toc}</>}
      contentClassName="max-w-none"
      sidebarClassName="sticky top-[7rem] h-fit"
    >
      {children}
    </ContentPage>
  );
};
