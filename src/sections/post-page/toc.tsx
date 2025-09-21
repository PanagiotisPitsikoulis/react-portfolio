"use client";

import { useEffect, useState } from "react";
import { Menu, Eye, EyeOff, FileText, List, Circle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  // Generate slug IDs (like MDX)
  const generateId = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  // Extract headings from markdown
  useEffect(() => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings: TOCItem[] = [];
    let match: RegExpExecArray | null;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = generateId(title);
      headings.push({ id, title, level });
    }
    setToc(headings);
  }, [content]);

  // Observe headings for active state
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { root: null, rootMargin: "-20% 0% -35% 0%", threshold: 0 },
    );

    const observe = () => {
      toc.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.observe(el);
      });
    };

    if (toc.length) setTimeout(observe, 100);
    return () => observer.disconnect();
  }, [toc]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const yOffset = -100;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    setActiveId(id);
  };

  if (!toc.length) return null;

  return (
    <div className="w-full h-[40rem] sticky top-[6rem] z-40 dark">
      <div className="border-none shadow bg-secondary rounded-4xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              Table of Contents
            </h3>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsVisible((v) => !v)}
            >
              {isVisible ? (
                <Eye className="w-4 h-4 text-muted-foreground" />
              ) : (
                <EyeOff className="w-4 h-4 text-muted-foreground" />
              )}
            </Button>
          </div>

          {/* TOC list */}
          {isVisible && (
            <nav className="space-y-1">
              {toc.map((item) => {
                const isActive = activeId === item.id;
                const marginLeft = (item.level - 1) * 12;

                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToHeading(item.id)}
                    style={{ marginLeft }}
                    className={[
                      "block w-full text-left py-2 px-3 text-sm transition-colors duration-200",
                      "hover:bg-primary/10 hover:text-primary",
                      item.level > 1 && "text-xs",
                      isActive
                        ? "bg-primary/20 text-primary font-medium border-l-2 border-primary"
                        : "text-muted-foreground hover:text-foreground",
                    ].join(" ")}
                  >
                    <span className="flex items-center gap-2">
                      {item.level === 1 && (
                        <FileText
                          size={14}
                          className={
                            isActive ? "text-primary" : "text-muted-foreground"
                          }
                        />
                      )}
                      {item.level === 2 && (
                        <List
                          size={12}
                          className={
                            isActive ? "text-primary" : "text-muted-foreground"
                          }
                        />
                      )}
                      {item.level >= 3 && (
                        <Circle
                          size={6}
                          className={
                            isActive ? "fill-primary" : "fill-muted-foreground"
                          }
                        />
                      )}
                      <span className="line-clamp-2 leading-tight">
                        {item.title}
                      </span>
                    </span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* Progress */}
          <div className="mt-4 pt-4">
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
              <Clock className="w-4 h-4" />
              <span>{toc.length} sections</span>
            </div>
            <div className="mt-2">
              <div className="bg-muted rounded-full h-1">
                <div
                  className="bg-primary rounded-full h-1 transition-all"
                  style={{
                    width: `${
                      toc.findIndex((i) => i.id === activeId) >= 0
                        ? ((toc.findIndex((i) => i.id === activeId) + 1) /
                            toc.length) *
                          100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
