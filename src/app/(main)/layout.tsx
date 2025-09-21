import { listContent } from "@/lib/md/mdx";
import * as React from "react";
import Footer from "../../sections/layout/footer";
import Header from "../../sections/layout/header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = async ({ children }: MainLayoutProps) => {
  const [projects, blog] = await Promise.all([
    listContent("projects"),
    listContent("blog"),
  ]);

  return (
    <>
      <Header />
      {children}
      <Footer projects={projects} blog={blog} />
    </>
  );
};

export default MainLayout;
