import CommandBar from "@/components/command-bar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NavbarActionsProps {
  projects: Array<{ title: string; url: string }>;
  blog: Array<{ title: string; url: string }>;
}

export const NavbarActions = ({ projects, blog }: NavbarActionsProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 lg:items-center justify-end">
      <CommandBar projects={projects} blog={blog} />
      <Button
        asChild
        className="bg-background text-accent border border-accent hover:bg-background/90"
      >
        <Link href="/projects">View Projects</Link>
      </Button>
    </div>
  );
};
