import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";

interface NavbarDesktopMenuProps {
  navData: Array<{
    title: string;
    url: string;
    icon?: React.ReactNode;
    items?: Array<{ title: string; url: string }>;
  }>;
  projectLinks: Array<{ title: string; href: string }>;
  blogLinks: Array<{ title: string; href: string }>;
}

export const NavbarDesktopMenu = ({
  navData,
  projectLinks,
  blogLinks,
}: NavbarDesktopMenuProps) => {
  const triggerClass =
    "inline-flex justify-center items-center gap-2 text-muted-foreground text-base font-medium hover:text-primary transition-all duration-500";
  const desktopLinkClass =
    "text-muted-foreground text-base font-medium hover:text-primary transition-all duration-500";

  function renderDesktopDropdown(
    label: string,
    links: { title: string; href: string }[],
    viewAllHref: string
  ) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className={triggerClass}>
            {label}
            <ChevronDownIcon className="w-4 h-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <ul className="py-2">
            {links.map((link) => (
              <li key={link.href}>
                <DropdownMenuItem asChild>
                  <Link href={link.href}>{link.title}</Link>
                </DropdownMenuItem>
              </li>
            ))}
            <li>
              <DropdownMenuItem asChild>
                <Link href={viewAllHref}>View all {label.toLowerCase()}</Link>
              </DropdownMenuItem>
            </li>
          </ul>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="hidden w-full lg:flex lg:pl-11 max-lg:py-4" id="navbar">
      <div className="flex-1 flex items-center justify-center">
        <ul className="flex items-center gap-6">
          {navData.map((item) => {
            const isProjects = item.url === "/projects";
            const isBlog = item.url === "/blog";
            if (isProjects) {
              return (
                <li key={item.title}>
                  {renderDesktopDropdown("Projects", projectLinks, "/projects")}
                </li>
              );
            }
            if (isBlog) {
              return (
                <li key={item.title}>
                  {renderDesktopDropdown("Blog", blogLinks, "/blog")}
                </li>
              );
            }
            return (
              <li key={item.title}>
                <Link href={item.url} className={desktopLinkClass}>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
