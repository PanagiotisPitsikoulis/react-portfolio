"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { NavbarActions } from "./components/navbar-actions";
import { NavbarBrand } from "./components/navbar-brand";
import { NavbarDesktopMenu } from "./components/navbar-desktop-menu";
import { NavbarMobileMenu } from "./components/navbar-mobile-menu";
import Wrapper from "../../section/wrapper/component";
import { theme } from "../../themes";
import { themes } from "@/components/theme";

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
      style={theme.primary}
      className={cn(
        "bg-background",
        "py-5 sticky top-0 w-full z-50 border-border",
        hasScrolled && "border-b",
      )}
    >
      <Wrapper>
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
            projects={projectItems}
            blog={blogItems}
          />
        </div>
      </Wrapper>
    </nav>
  );
};
