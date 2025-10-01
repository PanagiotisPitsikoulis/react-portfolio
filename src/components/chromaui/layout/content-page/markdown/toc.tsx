"use client";

import { Button } from "@/components/ui/button";
import { Circle, Clock, Eye, EyeOff, FileText, List } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface ToCProps {
  content: string;
}

export function ToC({ content }: ToCProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate slug IDs (like MDX)
  const generateId = useCallback(
    (text: string) =>
      text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, ""),
    [],
  );

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
  }, [content, generateId]);

  // Improved active heading detection
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    if (!toc.length) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      let current: string | null = null;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!current || entry.boundingClientRect.top < 200) {
            current = entry.target.id;
          }
        }
      });

      if (current) setActiveId(current);
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "0px 0px -80% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    observerRef.current = observer;

    return () => observer.disconnect();
  }, [toc]);

  const scrollToHeading = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const yOffset = -80;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    setActiveId(id);
  }, []);

  if (!toc.length) return null;

  const activeIndex = toc.findIndex((i) => i.id === activeId);
  const progress =
    activeIndex >= 0 ? ((activeIndex + 1) / toc.length) * 100 : 0;

  return (
    <div className="w-full max-h-[40rem] sticky top-32 z-40 dark hidden lg:block">
      <div className="rounded-3xl shadow-sm bg-background dark:bg-secondary border border-border overflow-hidden">
        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm text-foreground">
              Table of Contents
            </h3>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 rounded-full hover:bg-primary/10"
              onClick={() => setIsVisible((v) => !v)}
            >
              {isVisible ? (
                <Eye className="w-3.5 h-3.5 text-muted-foreground" />
              ) : (
                <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </Button>
          </div>

          {/* TOC list */}
          {isVisible && (
            <nav className="space-y-1 max-h-72 overflow-y-auto rounded-xl pr-1">
              {toc.map((item) => {
                const isActive = activeId === item.id;
                const paddingLeft = (item.level - 1) * 14 + 12;

                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToHeading(item.id)}
                    style={{ paddingLeft }}
                    className={[
                      "block w-full text-left py-2 pr-3 text-xs transition-all duration-300 rounded-3xl relative",
                      "hover:bg-primary/10 hover:text-primary",
                      isActive
                        ? "bg-primary/15 text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground",
                    ].join(" ")}
                  >
                    {/* Border indicator */}
                    <div
                      className={`absolute left-3 top-1/2 -translate-y-1/2 w-1 h-3 rounded-full bg-primary transition-all duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <span className="flex items-center gap-2 relative z-10">
                      {item.level === 1 && (
                        <FileText size={13} className="shrink-0" />
                      )}
                      {item.level === 2 && (
                        <List size={11} className="shrink-0" />
                      )}
                      {item.level >= 3 && (
                        <Circle
                          size={5}
                          className={`transition-all ${
                            isActive
                              ? "fill-primary text-primary"
                              : "fill-muted-foreground text-muted-foreground"
                          }`}
                        />
                      )}
                      <span className="truncate leading-tight">
                        {item.title}
                      </span>
                    </span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* Progress */}
          <div className="mt-4 pt-">
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>{toc.length} sections</span>
            </div>
            <div className="bg-muted rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-accent to-primary rounded-full h-1.5 transition-all duration-500 ease-out"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
