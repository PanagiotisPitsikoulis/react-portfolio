import { listContent } from "@/lib/md/mdx";
import { pageData } from "../../../content/data";
import NavbarClient from "./navbar-client";

export default async function Header() {
  const projects = await listContent("projects");
  const blog = await listContent("blog");

  return (
    <NavbarClient
      topPosts={blog}
      topProjects={projects}
      sidebarData={pageData}
    />
  );
}
