import { AppIcon } from "@/components/app-icon";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

interface NavbarMobileMenuProps {
  navData: Array<{
    title: string;
    url: string;
    icon?: React.ReactNode;
    items?: Array<{ title: string; url: string }>;
  }>;
  projectLinks: Array<{ title: string; href: string }>;
  blogLinks: Array<{ title: string; href: string }>;
}

export const NavbarMobileMenu = ({
  navData,
  projectLinks,
  blogLinks,
}: NavbarMobileMenuProps) => {
  const sheetItemClass =
    "block rounded-4xl px-6 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground";
  const sheetGroupLabelClass =
    "px-2 py-1 text-xs font-medium text-muted-foreground";

  return (
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
              {navData.map((item) => {
                const isProjects = item.url === "/projects";
                const isBlog = item.url === "/blog";
                if (isProjects) {
                  return (
                    <li key={item.title}>
                      <div className={sheetGroupLabelClass}>{item.title}</div>
                      <ul className="py-1">
                        {projectLinks.map((l) => (
                          <li key={l.href}>
                            <Link className={sheetItemClass} href={l.href}>
                              {l.title}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link className={sheetItemClass} href="/projects">
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
                      <div className={sheetGroupLabelClass}>{item.title}</div>
                      <ul className="py-1">
                        {blogLinks.map((l) => (
                          <li key={l.href}>
                            <Link className={sheetItemClass} href={l.href}>
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
  );
};
