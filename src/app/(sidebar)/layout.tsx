import { AppSidebar, type ContentNavItem } from "@/app/(sidebar)/_app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import * as React from "react";
import Header from "./_header";
import Footer from "./_footer";
import SidebarBody from "./_sidebar-body";
import { listContent } from "@/lib/mdx";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout = async ({ children }: SidebarLayoutProps) => {
  const [projectsRaw, blogRaw] = await Promise.all([
    listContent("projects"),
    listContent("blog"),
  ]);
  const toNav = (items: Awaited<ReturnType<typeof listContent>>): ContentNavItem[] =>
    items
      .map((i) => ({ title: i.frontmatter.title || i.slug, url: `/${i.type}/${i.frontmatter.slug || i.slug}`, date: i.frontmatter.date || null }))
      .sort((a, b) => (new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()));
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
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarLayout;
