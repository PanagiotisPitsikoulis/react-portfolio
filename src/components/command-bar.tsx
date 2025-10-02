"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { pageData } from "../../content/data";

type NavItem = { title: string; url: string };

export default function CommandBar({
  projects = [],
  blog = [],
}: {
  projects?: NavItem[];
  blog?: NavItem[];
}) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function navigate(url: string) {
    // External links open in a new tab
    if (url.startsWith("http")) {
      window.open(url, "_blank", "noopener,noreferrer");
      setOpen(false);
      return;
    }
    router.push(url);
    setOpen(false);
  }

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="sm"
        className="h-9 w-[220px] justify-start flex bg-accent hover:bg-accent/90 text-background"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 size-4" />
        <span>Search…</span>
        <kbd className="pointer-events-none ml-auto rounded-full text-foreground bg-background px-2 py-px text-[10px] font-medium">
          ⌘K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {/* Top-level pages with dynamic content */}
          {pageData.navMain.map((section) => (
            <React.Fragment key={section.title}>
              <CommandGroup heading={section.title}>
                {/* Parent item */}
                {section.url && (
                  <CommandItem onSelect={() => navigate(section.url)}>
                    {section.icon}
                    <span>{section.title}</span>
                  </CommandItem>
                )}
                {/* Child items */}
                {(() => {
                  const isProjects = section.title === "Projects";
                  const isBlog = section.title === "Blog";
                  const resolvedChildren: NavItem[] | undefined = isProjects
                    ? (projects as NavItem[])
                    : isBlog
                      ? (blog as NavItem[])
                      : (section.items as any);
                  if (!Array.isArray(resolvedChildren)) return null;
                  return resolvedChildren.map((child) => (
                    <CommandItem
                      key={child.url}
                      onSelect={() => navigate(child.url)}
                    >
                      {section.icon ? <span className="mr-1.5 size-4" /> : null}
                      <span>{child.title}</span>
                    </CommandItem>
                  ));
                })()}
              </CommandGroup>
              <CommandSeparator />
            </React.Fragment>
          ))}

          {/* Include all Projects */}
          {projects.length > 0 && (
            <CommandGroup heading="All Projects">
              {projects.map((p) => (
                <CommandItem key={p.url} onSelect={() => navigate(p.url)}>
                  <span>{p.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {/* Include all Posts */}
          {blog.length > 0 && (
            <CommandGroup heading="All Posts">
              {blog.map((b) => (
                <CommandItem key={b.url} onSelect={() => navigate(b.url)}>
                  <span>{b.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  );
}
