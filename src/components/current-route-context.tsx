"use client";
import { createContext, useContext, ReactNode } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface RouteContextType {
  currentRoute: string;
  query: { [key: string]: string | string[] | undefined };
  currentRouteArray: string[];
}

const RouteContext = createContext<RouteContextType>({
  currentRoute: "/",
  query: {},
  currentRouteArray: [],
});

export const RouteProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Convert URLSearchParams to query object
  const query: { [key: string]: string | string[] | undefined } = {};
  searchParams.forEach((value, key) => {
    if (query[key]) {
      // Handle multiple values for the same key
      if (Array.isArray(query[key])) {
        (query[key] as string[]).push(value);
      } else {
        query[key] = [query[key] as string, value];
      }
    } else {
      query[key] = value;
    }
  });

  const currentRouteArray = pathname.split("/") || [];

  const value: RouteContextType = {
    currentRoute: pathname,
    query,
    currentRouteArray,
  };

  return (
    <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
  );
};

export const useCurrentRoute = (): RouteContextType => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error("useCurrentRoute must be used within a RouteProvider");
  }
  return context;
};
