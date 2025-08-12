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

function findNestedHref(array: string[], route: string): string {
  const routeIndex = array.indexOf(route);
  if (routeIndex === -1) {
    return `/${route}`;
  }

  const pathSegments = array.slice(0, routeIndex + 1);
  return `/${pathSegments.join("/")}`;
}

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const { currentRouteArray } = useCurrentRoute();
  return (
    <header className="flex h-16 rounded-t-2xl shrink-0 items-center gap-2 px-6 lg:px-12 w-full justify-between sticky top-0 bg-background z-50">
      <div className="w-full flex flex-row items-center">
        <SidebarTrigger className="-ml-1" />
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
                    <BreadcrumbLink className="capitalize" href={"/"}>
                      {metadata.title as string}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbLink
                      className="capitalize"
                      href={findNestedHref(currentRouteArray, route)}
                    >
                      {route}
                    </BreadcrumbLink>
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
        <CommandBar />
        <AnimatedThemeToggler />
      </div>
    </header>
  );
};

export default Header;
