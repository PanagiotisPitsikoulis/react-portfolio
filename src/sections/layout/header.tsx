"use client";
import CommandBar from "@/components/command-bar";
import { useCurrentRoute } from "@/components/current-route-context";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { metadata } from "../../../content/data";

function findNestedHref(array: string[], route: string): string {
  const routeIndex = array.indexOf(route);
  if (routeIndex === -1) {
    return `/${route}`;
  }

  const pathSegments = array.slice(0, routeIndex + 1).filter(Boolean);

  return "/" + pathSegments.join("/");
}

interface HeaderProps {
  projects?: { title: string; url: string }[];
  blog?: { title: string; url: string }[];
}

const Header: React.FC<HeaderProps> = ({ projects = [], blog = [] }) => {
  const { currentRouteArray } = useCurrentRoute();

  // Check if we have more breadcrumbs than just home
  const hasMultipleBreadcrumbs =
    currentRouteArray.length > 1 && currentRouteArray[1] !== "";

  return (
    <header
      data-slot="sidebar-header"
      data-sidebar="header"
      className="flex h-16 shrink-0 items-center sticky bg-gradient-to-b from-sidebar/80 to-transparent gap-2 px-6 lg:px-4 w-full justify-between top-0 z-50"
    >
      <div className="w-fit flex flex-row items-center bg-sidebar h-9 px-4 py-2 rounded-full border overflow-hidden">
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger className="-ml-1 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent side="bottom">Toggle sidebar</TooltipContent>
        </Tooltip>
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />

        {/* Desktop breadcrumbs - hidden on small screens */}
        <div className="hidden md:block">
          <Breadcrumb>
            <BreadcrumbList>
              {currentRouteArray.map((route, index) => (
                <div key={index} className="flex flex-row items-center gap-2">
                  <BreadcrumbItem key={index}>
                    {index === 0 ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <BreadcrumbLink
                            className="capitalize line-clamp-1"
                            href={"/"}
                          >
                            {metadata.title as string}
                          </BreadcrumbLink>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">Home</TooltipContent>
                      </Tooltip>
                    ) : (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <BreadcrumbLink className="capitalize" asChild>
                            <Link
                              className="line-clamp-1"
                              href={findNestedHref(currentRouteArray, route)}
                            >
                              {route}
                            </Link>
                          </BreadcrumbLink>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">{route}</TooltipContent>
                      </Tooltip>
                    )}
                  </BreadcrumbItem>
                  {index !== currentRouteArray.length - 1 &&
                    currentRouteArray[1] !== "" && (
                      <BreadcrumbSeparator className="hidden md:block" />
                    )}
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Mobile breadcrumbs with dropdown */}
        <div className="md:hidden flex items-center gap-2">
          {/* Always show home */}
          <Tooltip>
            <TooltipTrigger asChild>
              <BreadcrumbLink
                className="capitalize line-clamp-1 text-sm font-medium hover:text-foreground transition-colors"
                href={"/"}
              >
                {metadata.title as string}
              </BreadcrumbLink>
            </TooltipTrigger>
            <TooltipContent side="bottom">Home</TooltipContent>
          </Tooltip>

          {/* Show dropdown if there are additional breadcrumbs */}
          {hasMultipleBreadcrumbs && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1.5 px-2 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-all duration-200">
                    <ChevronDown className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline font-medium">More</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-56 p-2"
                  sideOffset={8}
                >
                  <div className="text-xs font-medium text-muted-foreground px-2 py-1.5 mb-1">
                    Navigation
                  </div>
                  {currentRouteArray.slice(1).map((route, index) => (
                    <DropdownMenuItem key={index} asChild className="px-2 py-2">
                      <Link
                        className="w-full flex items-center gap-2 text-sm hover:text-foreground transition-colors"
                        href={findNestedHref(currentRouteArray, route)}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                        <span className="capitalize">{route}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <CommandBar projects={projects} blog={blog} />
          </TooltipTrigger>
          <TooltipContent side="bottom">Search (⌘K)</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <AnimatedThemeToggler />
          </TooltipTrigger>
          <TooltipContent side="bottom">Toggle theme</TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;
