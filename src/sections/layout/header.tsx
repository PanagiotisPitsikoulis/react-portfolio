import { listContent } from "@/lib/md/mdx";
import { pageData } from "../../../content/data";
import { Navbar } from "../../components/chromaui/layout/navbar";

export default async function Header() {
  const projects = await listContent("projects");
  const blog = await listContent("blog");

  return (
    <>
      <Navbar topPosts={blog} topProjects={projects} sidebarData={pageData} />
    </>
  );
}
