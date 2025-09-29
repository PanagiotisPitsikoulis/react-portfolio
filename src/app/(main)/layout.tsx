import * as React from "react";
import Footer from "../../sections/layout/footer";
import Header from "../../sections/layout/header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = async ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
