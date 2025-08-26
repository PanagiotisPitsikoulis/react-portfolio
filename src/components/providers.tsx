"use client";

import { ThemeProvider } from "next-themes";
import { RouteProvider } from "./current-route-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <RouteProvider>{children}</RouteProvider>
    </ThemeProvider>
  );
}
