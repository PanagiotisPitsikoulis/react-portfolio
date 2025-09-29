import { AppIcon } from "@/components/app-icon";
import CommandBar from "@/components/command-bar";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu, ExternalLink } from "lucide-react";
import Link from "next/link";

interface NavbarMobileMenuProps {
  navData: Array<{
    title: string;
    url: string;
    icon?: React.ReactNode;
    items?: Array<{ title: string; url: string }>;
  }>;
  projects: Array<{ title: string; url: string }>;
  blog: Array<{ title: string; url: string }>;
}

export const NavbarMobileMenu = ({
  navData,
  projects,
  blog,
}: NavbarMobileMenuProps) => {
  const drawerItemClass =
    "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors group";
  const drawerGroupLabelClass =
    "px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider";
  const drawerSubItemClass =
    "flex items-center justify-between rounded-xl px-4 py-2.5 text-sm hover:bg-accent/50 hover:text-accent-foreground transition-colors ml-4 group";

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center p-3 ml-3 rounded-2xl lg:hidden hover:bg-accent focus:outline-none transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-foreground" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="pb-4 border-b border-border/50">
          <div className="flex items-center justify-between gap-4">
            <DrawerTitle className="flex items-center gap-3 text-xl font-semibold">
              <AppIcon />
              <span className="sr-only">Navigation</span>
            </DrawerTitle>
            <div className="flex-shrink-0">
              <CommandBar projects={projects} blog={blog} />
            </div>
          </div>
        </DrawerHeader>

        <div className="px-4 pb-6 overflow-y-auto">
          <nav>
            <ul className="flex flex-col gap-2">
              {navData.map((item) => {
                const isProjects = item.url === "/projects";
                const isBlog = item.url === "/blog";

                if (isProjects) {
                  return (
                    <li key={item.title}>
                      <div className={drawerGroupLabelClass}>{item.title}</div>
                      <ul className="space-y-1">
                        {projects.slice(0, 3).map((project) => (
                          <li key={project.url}>
                            <Link className={drawerSubItemClass} href={project.url}>
                              <span className="truncate">{project.title}</span>
                              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          </li>
                        ))}
                        {projects.length > 3 && (
                          <li>
                            <Link
                              className={drawerSubItemClass}
                              href="/projects"
                            >
                              <span>
                                View all {projects.length} projects
                              </span>
                              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          </li>
                        )}
                      </ul>
                    </li>
                  );
                }

                if (isBlog) {
                  return (
                    <li key={item.title}>
                      <div className={drawerGroupLabelClass}>{item.title}</div>
                      <ul className="space-y-1">
                        {blog.slice(0, 3).map((post) => (
                          <li key={post.url}>
                            <Link className={drawerSubItemClass} href={post.url}>
                              <span className="truncate">{post.title}</span>
                              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          </li>
                        ))}
                        {blog.length > 3 && (
                          <li>
                            <Link className={drawerSubItemClass} href="/blog">
                              <span>View all {blog.length} posts</span>
                              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          </li>
                        )}
                      </ul>
                    </li>
                  );
                }

                return (
                  <li key={item.title}>
                    <Link href={item.url} className={drawerItemClass}>
                      <span>{item.title}</span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
