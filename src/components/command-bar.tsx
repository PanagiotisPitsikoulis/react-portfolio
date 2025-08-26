"use client";
import { ExternalLink, Search } from "lucide-react";
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
  CommandShortcut,
} from "@/components/ui/command";
import { sidebarData } from "../../content/data";

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
        size="icon"
        className="sm:hidden text-muted-foreground shadow bg-sidebar dark:hover:bg-sidebar dark:bg-sidebar"
        onClick={() => setOpen(true)}
        aria-label="Search"
      >
        <Search className="size-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="hidden h-9 w-[220px] justify-start shadow text-muted-foreground sm:flex dark:bg-sidebar bg-sidebar rounded-full dark:hover:bg-sidebar"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 size-4" />
        <span>Search…</span>
        <kbd className="pointer-events-none ml-auto rounded border bg-muted px-1.5 text-[10px] font-medium">
          ⌘K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {/* Top-level pages with dynamic content */}
          {sidebarData.navMain.map((section) => (
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
                  const dynamicChildren: NavItem[] | null =
                    section.title === "Projects"
                      ? projects
                      : section.title === "Blog"
                      ? blog
                      : null;
                  const children: NavItem[] | undefined =
                    dynamicChildren ?? (section.items as any);
                  if (!Array.isArray(children)) return null;
                  return children.map((child) => (
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

          {/* Quick actions */}
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => navigate("/")}>Home</CommandItem>
            <CommandItem onSelect={() => navigate("/projects")}>
              Projects
              <CommandShortcut>G P</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/blog")}>
              Blog
              <CommandShortcut>G B</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/contact")}>
              Contact
              <CommandShortcut>G C</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          {/* External links (collected from Contact group) */}
          {sidebarData.navMain
            .filter((s) => s.title.toLowerCase().includes("contact"))
            .map((contact) => (
              <CommandGroup key="external" heading="External">
                {contact.items
                  .filter((i) => i.url.startsWith("http"))
                  .map((link) => (
                    <CommandItem
                      key={link.url}
                      onSelect={() => navigate(link.url)}
                    >
                      <ExternalLink className="text-muted-foreground" />
                      <span>{link.title}</span>
                    </CommandItem>
                  ))}
              </CommandGroup>
            ))}
        </CommandList>
      </CommandDialog>
    </div>
  );
}
