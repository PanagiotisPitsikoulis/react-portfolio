"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useSearchParamsState() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      const newUrl = params.toString() ? `?${params.toString()}` : "";
      router.push(newUrl, { scroll: false });
    },
    [router, searchParams],
  );

  const getParam = useCallback(
    (key: string) => searchParams.get(key) || "",
    [searchParams],
  );

  return { updateSearchParams, getParam };
}
