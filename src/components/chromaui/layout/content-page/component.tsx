import { Page } from "@/components/chromaui/layout/page/component";
import Wrapper from "@/components/chromaui/section/wrapper/component";
import { cn } from "@/lib/utils";
import React from "react";

interface ContentPageProps {
  // Hero section
  hero?: React.ReactNode;
  isHeroDark?: boolean;

  // Content layout
  children?: React.ReactNode;

  // Widget slots for content above MDX
  widgets?: React.ReactNode[];

  // Sidebar content
  sidebar?: React.ReactNode;

  // Layout options
  layout?: "split" | "full-width";

  contentAbove?: React.ReactNode;

  // Styling
  className?: string;
  contentClassName?: string;
  sidebarClassName?: string;
}

export const ContentPage = ({
  hero,
  isHeroDark = false,
  children,
  widgets = [],
  contentAbove,
  sidebar,
  layout = "split",
  className = "",
  contentClassName = "",
  sidebarClassName = "",
}: ContentPageProps) => {
  return (
    <Page
      hero={hero}
      isHeroDark={isHeroDark}
      className={cn("border-b", className)}
    >
      {contentAbove}
      {layout === "split" ? (
        <Wrapper>
          <div className="grid grid-cols-1 lg:grid-cols-6">
            {/* Main Content */}
            <div className={cn("lg:col-span-4 py-12", contentClassName)}>
              {/* Widgets above content */}
              {widgets.map((widget, index) => (
                <div key={index} className="mb-8">
                  {widget}
                </div>
              ))}

              {/* Main content */}
              {children}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 lg:border-x lg:px-5 lg:py-12 lg:bg-background">
              <div className={cn(sidebarClassName)}>{sidebar}</div>
            </div>
          </div>
        </Wrapper>
      ) : (
        <Wrapper className="py-8 lg:py-12">
          <div className={cn("max-w-4xl mx-auto", contentClassName)}>
            {/* Widgets above content */}
            {widgets.map((widget, index) => (
              <div key={index} className="mb-8">
                {widget}
              </div>
            ))}

            {/* Main content */}
            {children}
          </div>
        </Wrapper>
      )}
    </Page>
  );
};
