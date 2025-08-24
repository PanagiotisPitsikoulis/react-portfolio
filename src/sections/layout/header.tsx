"use client";
import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useCurrentRoute } from "@/components/current-route-context";
import { metadata } from "@/lib/data";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import CommandBar from "@/components/command-bar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

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

  return (
    <header
      data-slot="sidebar-header"
      data-sidebar="header"
      className="flex h-16 shrink-0 items-center bg-gradient-to-b from-background via-background to-transparent rounded-t-3xl gap-2 px-6 lg:px-12 w-full justify-between sticky top-0 z-50"
    >
      <div className="w-full flex flex-row items-center">
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
        <Breadcrumb>
          <BreadcrumbList>
            {currentRouteArray.map((route, index) => (
              <div key={index} className="flex flex-row items-center gap-2">
                <BreadcrumbItem key={index}>
                  {index === 0 ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <BreadcrumbLink className="capitalize" href={"/"}>
                          {metadata.title as string}
                        </BreadcrumbLink>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">Home</TooltipContent>
                    </Tooltip>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <BreadcrumbLink className="capitalize" asChild>
                          <Link href={findNestedHref(currentRouteArray, route)}>
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
      <div className="flex flex-row gap-2 items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <CommandBar projects={projects} blog={blog} />
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">Search (⌘K)</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <AnimatedThemeToggler />
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">Toggle theme</TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;
