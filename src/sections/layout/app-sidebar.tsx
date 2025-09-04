"use client";
import { useCurrentRoute } from "@/components/current-route-context";
import {
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  ScreenShare,
} from "lucide-react";
import * as React from "react";
import { useMemo, useState } from "react";
import { metadata, sidebarData } from "../../../content/data";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type ContentNavItem = {
  title: string;
  url: string;
  date?: string | null;
};

export function AppSidebar({
  projects: initialProjects = [],
  blog: initialBlog = [],
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  projects?: ContentNavItem[];
  blog?: ContentNavItem[];
}) {
  const { currentRoute } = useCurrentRoute();
  const [projects] = useState<ContentNavItem[]>(initialProjects);
  const [blog] = useState<ContentNavItem[]>(initialBlog);
  const projectsCount = projects.length;
  const blogCount = blog.length;

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const toggleExpanded = (sectionTitle: string) =>
    setExpanded((prev) => ({ ...prev, [sectionTitle]: !prev[sectionTitle] }));

  const nav = useMemo(() => {
    return sidebarData.navMain.map((section) => {
      if (section.title === "Projects") {
        return { ...section, items: projects };
      }
      if (section.title === "Blog") {
        return { ...section, items: blog };
      }
      return section;
    });
  }, [projects, blog]);

  return (
    <>
      <Sidebar variant="inset" collapsible="icon" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/">
                  <div className="bg-black dark:bg-white text-white dark:text-black flex aspect-square size-8 items-center justify-center rounded-full">
                    <ScreenShare className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium">
                      {metadata.title as string}
                    </span>
                    <span className="text-muted-foreground/90 text-sm">
                      {metadata.description}
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu className="gap-4">
              {nav.map((section) => {
                const isRoot = section.url === "/";
                const isTopLevelActive = isRoot
                  ? currentRoute === "/"
                  : currentRoute === section.url ||
                    currentRoute.startsWith(`${section.url}/`) ||
                    (section.items?.some((sub) => currentRoute === sub.url) ??
                      false);

                return (
                  <SidebarMenuItem key={section.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isTopLevelActive}
                      tooltip={section.title}
                      className={
                        isTopLevelActive ? "rounded-full px-3 py-2" : ""
                      }
                    >
                      <Link href={section.url} className="font-medium">
                        {section.icon}
                        {section.title}
                      </Link>
                    </SidebarMenuButton>
                    {(section.title === "Projects" ||
                      section.title === "Blog") && (
                      <>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuBadge className="right-7">
                              {section.title === "Projects"
                                ? projectsCount
                                : blogCount}
                            </SidebarMenuBadge>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            <span>
                              {section.title === "Projects"
                                ? projectsCount
                                : blogCount}{" "}
                              {section.title}
                            </span>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuAction
                              aria-label={
                                (expanded[section.title]
                                  ? "Collapse"
                                  : "Expand") + ` ${section.title}`
                              }
                              title={
                                (expanded[section.title]
                                  ? "Collapse"
                                  : "Expand") + ` ${section.title}`
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleExpanded(section.title);
                              }}
                              showOnHover
                            >
                              {expanded[section.title] ? (
                                <ChevronDown className="size-4" />
                              ) : (
                                <ChevronRight className="size-4" />
                              )}
                            </SidebarMenuAction>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            <span>
                              {expanded[section.title] ? "Collapse" : "Expand"}
                            </span>
                          </TooltipContent>
                        </Tooltip>
                      </>
                    )}
                    {section.items?.length ? (
                      <SidebarMenuSub className="ml-0 border-l-0 px-1.5 mt-1">
                        {(section.title === "Projects" ||
                        section.title === "Blog"
                          ? expanded[section.title]
                            ? section.items
                            : section.items.slice(0, 4)
                          : section.items
                        ).map((subItem) => {
                          const isSubActive = currentRoute === subItem.url;
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={isSubActive}
                                    className={cn(
                                      "mt-px",
                                      isSubActive
                                        ? "rounded-full px-3 py-2"
                                        : "text-muted-foreground px-3 py-2"
                                    )}
                                  >
                                    <Link href={subItem.url}>
                                      {subItem.title}
                                    </Link>
                                  </SidebarMenuSubButton>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                  <span>{subItem.title}</span>
                                </TooltipContent>
                              </Tooltip>
                            </SidebarMenuSubItem>
                          );
                        })}

                        {(section.title === "Projects" ||
                          section.title === "Blog") &&
                          section.items.length > 4 &&
                          !expanded[section.title] && (
                            <SidebarMenuSubItem>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <SidebarMenuSubButton
                                    asChild
                                    className="text-muted-foreground"
                                  >
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        toggleExpanded(section.title);
                                      }}
                                    >
                                      <MoreHorizontal className="size-4" />
                                      <span>Show all</span>
                                    </button>
                                  </SidebarMenuSubButton>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                  <span>Show all {section.title}</span>
                                </TooltipContent>
                              </Tooltip>
                            </SidebarMenuSubItem>
                          )}
                      </SidebarMenuSub>
                    ) : null}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
