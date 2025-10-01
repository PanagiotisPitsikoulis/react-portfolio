"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Circle,
  Clock,
  Eye,
  EyeOff,
  FileText,
  List,
  Menu,
  TableOfContents,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface ToCMobileProps {
  content: string;
}

export function ToCMobile({ content }: ToCMobileProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
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

    // Close drawer first
    setIsOpen(false);

    // Wait for drawer to close, then scroll
    setTimeout(() => {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }, 300); // Wait for drawer close animation
  }, []);

  if (!toc.length) return null;

  const activeIndex = toc.findIndex((i) => i.id === activeId);
  const progress =
    activeIndex >= 0 ? ((activeIndex + 1) / toc.length) * 100 : 0;

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="default"
          className="w-full mb-6 flex items-center gap-2"
        >
          <TableOfContents className="w-4 h-4" />
          Table of Contents ({toc.length} sections)
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="pb-2">
          <DrawerTitle className="flex items-center justify-center gap-2 text-lg">
            Table of Contents
          </DrawerTitle>
        </DrawerHeader>

        <div className="px-4 pb-4 overflow-y-auto">
          {/* Header Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{toc.length} sections</span>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full hover:bg-accent"
              onClick={() => setIsVisible((v) => !v)}
            >
              {isVisible ? (
                <Eye className="w-4 h-4 text-muted-foreground" />
              ) : (
                <EyeOff className="w-4 h-4 text-muted-foreground" />
              )}
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-accent to-primary rounded-full h-2 transition-all duration-500 ease-out"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* TOC List */}
          {isVisible && (
            <nav className="space-y-1">
              {toc.map((item) => {
                const isActive = activeId === item.id;
                const paddingLeft = (item.level - 1) * 16 + 12;

                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToHeading(item.id)}
                    style={{ paddingLeft }}
                    className={[
                      "block w-full text-left py-3 pr-3 text-sm transition-all duration-300 rounded-xl relative",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive
                        ? "bg-primary/15 text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground",
                    ].join(" ")}
                  >
                    {/* Border indicator */}
                    <div
                      className={`absolute left-3 top-1/2 -translate-y-1/2 w-1 h-4 rounded-full bg-primary transition-all duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <span className="flex items-center gap-3 relative z-10">
                      {item.level === 1 && (
                        <FileText size={16} className="shrink-0" />
                      )}
                      {item.level === 2 && (
                        <List size={14} className="shrink-0" />
                      )}
                      {item.level >= 3 && (
                        <Circle
                          size={6}
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
        </div>
      </DrawerContent>
    </Drawer>
  );
}
