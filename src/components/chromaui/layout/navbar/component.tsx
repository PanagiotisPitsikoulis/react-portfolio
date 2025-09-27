"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { NavbarActions } from "./components/navbar-actions";
import { NavbarBrand } from "./components/navbar-brand";
import { NavbarDesktopMenu } from "./components/navbar-desktop-menu";
import { NavbarMobileMenu } from "./components/navbar-mobile-menu";

interface NavbarProps {
  topPosts: Array<{
    frontmatter: { title?: string; slug?: string };
    slug: string;
  }>;
  topProjects: Array<{
    frontmatter: { title?: string; slug?: string };
    slug: string;
  }>;
  sidebarData: {
    navMain: Array<{
      title: string;
      url: string;
      icon?: React.ReactNode;
      items?: Array<{ title: string; url: string }>;
    }>;
  };
}

export const Navbar = ({ topPosts, topProjects, sidebarData }: NavbarProps) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const projectItems = topProjects.map((p) => ({
    title: p.frontmatter.title || p.slug,
    url: `/projects/${p.frontmatter.slug}`,
  }));
  const blogItems = topPosts.map((b) => ({
    title: b.frontmatter.title || b.slug,
    url: `/blog/${b.frontmatter.slug}`,
  }));

  return (
    <nav
      className={cn(
        hasScrolled && "bg-background border-b border-border shadow-xs",
        "py-5 fixed w-full z-50",
        isProjectPage && !hasScrolled && "dark"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="w-full flex justify-between items-center">
          {/* Brand */}
          <NavbarBrand />

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:items-center">
            <NavbarDesktopMenu
              navData={sidebarData.navMain}
              projectLinks={projectLinks}
              blogLinks={blogLinks}
            />
          </div>

          {/* Actions */}
          <div className="hidden lg:flex lg:items-center">
            <NavbarActions projects={projectItems} blog={blogItems} />
          </div>

          {/* Mobile Menu */}
          <NavbarMobileMenu
            navData={sidebarData.navMain}
            projectLinks={projectLinks}
            blogLinks={blogLinks}
          />
        </div>
      </div>
    </nav>
  );
};
