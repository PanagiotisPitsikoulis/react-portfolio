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
  sidebar,
  layout = "split",
  className = "",
  contentClassName = "",
  sidebarClassName = "",
}: ContentPageProps) => {
  return (
    <Page hero={hero} isHeroDark={isHeroDark} className={className}>
      {layout === "split" ?
        <Wrapper className="py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className={cn("lg:col-span-2", contentClassName)}>
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
            <div className={cn("lg:col-span-1", sidebarClassName)}>
              {sidebar}
            </div>
          </div>
        </Wrapper>
      : <Wrapper className="py-8 lg:py-12">
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
      }
    </Page>
  );
};
