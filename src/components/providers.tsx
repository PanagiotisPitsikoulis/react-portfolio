"use client";
import * as React from "react";
import { RouteProvider } from "./current-route-context";
import { ThemeProvider } from "./theme-provider";
import { ReactLenis, useLenis } from "lenis/react";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <RouteProvider>
      <ReactLenis root />
      <ThemeProvider>{children}</ThemeProvider>
    </RouteProvider>
  );
};

export default Providers;
