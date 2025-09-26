"use client";

import CommandBar from "@/components/command-bar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ContentItem } from "@/lib/md/mdx";
import { ChevronDownIcon, Menu } from "lucide-react";
import Link from "next/link";

import { AppIcon } from "@/components/app-icon";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { pageData as sidebarDataData } from "../../../content/data";

function NavbarClient({
  topPosts,
  topProjects,
  sidebarData,
}: {
  topPosts: ContentItem[];
  topProjects: ContentItem[];
  sidebarData: typeof sidebarDataData;
}) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerClass =
    "inline-flex justify-center items-center gap-2 text-muted-foreground text-base font-medium hover:text-primary transition-all duration-500";
  const sheetItemClass =
    "block rounded-4xl px-6 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground";
  const sheetGroupLabelClass =
    "px-2 py-1 text-xs font-medium text-muted-foreground";
  const desktopLinkClass =
    "text-muted-foreground text-base font-medium hover:text-primary transition-all duration-500";

  const projectLinks = topProjects.map((p) => ({
    title: p.frontmatter.title || p.slug,
    href: `/projects/${p.frontmatter.slug}`,
  }));
  const blogLinks = topPosts.map((b) => ({
    title: b.frontmatter.title || b.slug,
    href: `/blog/${b.frontmatter.slug}`,
  }));

  const pathName = usePathname();
  const isProjectPage =
    pathName.includes("/projects") && pathName.split("/").length === 3;
  const isBlogPage =
    pathName.includes("/blog") && pathName.split("/").length === 3;

  function renderDesktopDropdown(
    label: string,
    links: { title: string; href: string }[],
    viewAllHref: string,
  ) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className={triggerClass}>
            {label}
            <ChevronDownIcon className="w-4 h-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <ul className="py-2">
            {links.map((link) => (
              <li key={link.href}>
                <DropdownMenuItem asChild>
                  <Link href={link.href}>{link.title}</Link>
                </DropdownMenuItem>
              </li>
            ))}
            <li>
              <DropdownMenuItem asChild>
                <Link href={viewAllHref}>View all {label.toLowerCase()}</Link>
              </DropdownMenuItem>
            </li>
          </ul>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <nav
      className={cn(
        hasScrolled && "bg-background border-b border-border shadow-xs",
        "py-5 fixed w-full z-50",
        isProjectPage && !hasScrolled && "dark",
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col lg:flex-row">
          <div className="flex justify-between lg:flex-row items-center">
            <Link href="/" className="flex items-center cursor-pointer">
              <AppIcon />
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center p-3 ml-3 rounded-3xl lg:hidden hover:bg-accent focus:outline-none"
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6 text-foreground" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 p-0 bg-popover text-popover-foreground"
              >
                <SheetHeader className="p-4">
                  <SheetTitle className="flex items-center gap-2">
                    <AppIcon />
                  </SheetTitle>
                </SheetHeader>
                <div className="p-2">
                  <nav>
                    <ul className="flex flex-col gap-1">
                      {sidebarData.navMain.map((item) => {
                        const isProjects = item.url === "/projects";
                        const isBlog = item.url === "/blog";
                        if (isProjects) {
                          return (
                            <li key={item.title}>
                              <div className={sheetGroupLabelClass}>
                                {item.title}
                              </div>
                              <ul className="py-1">
                                {projectLinks.map((l) => (
                                  <li key={l.href}>
                                    <Link
                                      className={sheetItemClass}
                                      href={l.href}
                                    >
                                      {l.title}
                                    </Link>
                                  </li>
                                ))}
                                <li>
                                  <Link
                                    className={sheetItemClass}
                                    href="/projects"
                                  >
                                    View all projects
                                  </Link>
                                </li>
                              </ul>
                            </li>
                          );
                        }
                        if (isBlog) {
                          return (
                            <li key={item.title}>
                              <div className={sheetGroupLabelClass}>
                                {item.title}
                              </div>
                              <ul className="py-1">
                                {blogLinks.map((l) => (
                                  <li key={l.href}>
                                    <Link
                                      className={sheetItemClass}
                                      href={l.href}
                                    >
                                      {l.title}
                                    </Link>
                                  </li>
                                ))}
                                <li>
                                  <Link className={sheetItemClass} href="/blog">
                                    View all posts
                                  </Link>
                                </li>
                              </ul>
                            </li>
                          );
                        }
                        return (
                          <li key={item.title}>
                            <Link href={item.url} className={sheetItemClass}>
                              {item.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div
            className="hidden w-full lg:flex lg:pl-11 max-lg:py-4"
            id="navbar"
          >
            <div className="flex-1 flex items-center justify-center">
              <ul className="flex items-center gap-6">
                {sidebarData.navMain.map((item) => {
                  const isProjects = item.url === "/projects";
                  const isBlog = item.url === "/blog";
                  if (isProjects) {
                    return (
                      <li key={item.title}>
                        {renderDesktopDropdown(
                          "Projects",
                          projectLinks,
                          "/projects",
                        )}
                      </li>
                    );
                  }
                  if (isBlog) {
                    return (
                      <li key={item.title}>
                        {renderDesktopDropdown("Blog", blogLinks, "/blog")}
                      </li>
                    );
                  }
                  return (
                    <li key={item.title}>
                      <Link href={item.url} className={desktopLinkClass}>
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 lg:items-center justify-end">
              {(() => {
                const projectItems = topProjects.map((p) => ({
                  title: p.frontmatter.title || p.slug,
                  url: `/projects/${p.frontmatter.slug}`,
                }));
                const blogItems = topPosts.map((b) => ({
                  title: b.frontmatter.title || b.slug,
                  url: `/blog/${b.frontmatter.slug}`,
                }));
                return <CommandBar projects={projectItems} blog={blogItems} />;
              })()}
              <Button asChild>
                <Link href="/projects">View Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarClient;
