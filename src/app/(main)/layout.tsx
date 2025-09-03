import { AppSidebar, type ContentNavItem } from "@/sections/layout/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { listContent } from "@/lib/md/mdx";
import * as React from "react";
import Footer from "../../sections/layout/footer";
import Header from "../../sections/layout/header";
import SidebarBody from "../../sections/layout/sidebar-body";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = async ({ children }: MainLayoutProps) => {
  const [projectsRaw, blogRaw] = await Promise.all([
    listContent("projects"),
    listContent("blog"),
  ]);
  const toNav = (
    items: Awaited<ReturnType<typeof listContent>>
  ): ContentNavItem[] =>
    items
      .map((i) => ({
        title: i.frontmatter.title || i.slug,
        url: `/${i.type}/${i.frontmatter.slug || i.slug}`,
        date: i.frontmatter.date || null,
      }))
      .sort(
        (a, b) =>
          new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
      );
  const projects = toNav(projectsRaw);
  const blog = toNav(blogRaw);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "20rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar projects={projects} blog={blog} />
      <SidebarInset>
        <Header projects={projects} blog={blog} />
        <SidebarBody>{children}</SidebarBody>
        <Footer projects={projects} blog={blog} />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
