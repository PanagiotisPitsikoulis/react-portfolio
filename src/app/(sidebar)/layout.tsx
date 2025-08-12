import { AppSidebar } from "@/app/(sidebar)/_app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import * as React from "react";
import Header from "./_header";
import Footer from "./_footer";
import SidebarBody from "./_sidebar-body";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "20rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <Header />
        <SidebarBody>{children}</SidebarBody>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarLayout;
