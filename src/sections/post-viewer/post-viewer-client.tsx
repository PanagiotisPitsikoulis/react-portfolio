"use client";

import SectionHeading from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchParamsState } from "@/hooks/use-search-params";
import type { ContentItem, ContentType } from "@/lib/mdx";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Autoplay from "embla-carousel-autoplay";
import Filters from "./filters";
import Pagination from "./pagination";
import PostCards from "./post-cards";

const POSTS_PER_PAGE = 6;

export default function PostViewer({
  title,
  description,
  posts,
  images,
  contentType,
}: {
  title: string;
  description: string;
  posts: ContentItem[];
  images: string[];
  contentType: ContentType;
}) {
  const { updateSearchParams, getParam } = useSearchParamsState();
  const [searchQuery, setSearchQuery] = useState(getParam("search") || "");
  const [selectedTags, setSelectedTags] = useState<string[]>(
    getParam("tags") ? getParam("tags").split(",") : []
  );
  const [currentPage, setCurrentPage] = useState(
    Number.parseInt(getParam("page")) || 1
  );
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Handle case when there are no posts
  if (!posts || posts.length === 0) {
    return (
      <section className="flex flex-1 flex-col gap-8 page-container pb-32">
        <SectionHeading>
          <>{title}</>
          <>{description}</>
        </SectionHeading>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h3 className="mb-2 text-xl font-semibold">
            No {contentType === "blog" ? "posts" : "projects"} found
          </h3>
          <p className="text-muted-foreground max-w-md">
            There are no {contentType === "blog" ? "posts" : "projects"}{" "}
            available at the moment.
          </p>
        </div>
      </section>
    );
  }

  useEffect(() => {
    updateSearchParams({
      search: debouncedSearchQuery || null,
      tags: selectedTags.length > 0 ? selectedTags.join(",") : null,
      page: currentPage > 1 ? currentPage.toString() : null,
    });
  }, [debouncedSearchQuery, selectedTags, currentPage, updateSearchParams]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => {
      post.frontmatter.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter((post) => {
        const title = (post.frontmatter.title || post.slug).toLowerCase();
        const summary = (post.frontmatter.summary || "").toLowerCase();
        const tags = (post.frontmatter.tags || []).join(" ").toLowerCase();
        return (
          title.includes(query) ||
          summary.includes(query) ||
          tags.includes(query)
        );
      });
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) =>
        selectedTags.some((tag) => post.frontmatter.tags?.includes(tag))
      );
    }

    return filtered;
  }, [posts, debouncedSearchQuery, selectedTags]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [filteredPosts.length, totalPages, currentPage]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const handleClearAllTags = () => {
    setSelectedTags([]);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleClearAllFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    debouncedSearchQuery.trim().length > 0 || selectedTags.length > 0;

  return (
    <section className="flex flex-1 flex-col gap-8 page-container pb-32">
      <SectionHeading>
        <>{title}</>
        <>{description}</>
      </SectionHeading>

      <div className="relative mx-auto -mt-20 flex items-center justify-center">
        <Carousel
          plugins={[Autoplay({ delay: 1500 })]}
          opts={{ loop: true, align: "start" }}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                className="translate-y-18 relative flex basis-1/2 cursor-grab justify-center active:cursor-grabbing sm:basis-1/4 md:basis-1/3 lg:basis-1/5"
              >
                <div className="easeOut hover:-translate-y-18 mt-auto w-full overflow-hidden rounded-t-3xl border transition-all">
                  <img
                    src={image}
                    alt={image}
                    className="h-full w-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <Filters
        contentType={contentType}
        searchQuery={searchQuery}
        debouncedSearchQuery={debouncedSearchQuery}
        handleClearAllFilters={handleClearAllFilters}
        handleClearSearch={handleClearSearch}
        hasActiveFilters={hasActiveFilters}
        setSearchQuery={setSearchQuery}
        setIsFiltersOpen={setIsFiltersOpen}
        isFiltersOpen={isFiltersOpen}
        selectedTags={selectedTags}
        handleTagToggle={handleTagToggle}
        allTags={allTags}
        handleClearAllTags={handleClearAllTags}
        filteredPosts={filteredPosts}
        posts={posts}
        totalPages={totalPages}
        currentPage={currentPage}
      />

      <PostCards contentType={contentType} posts={paginatedPosts} />

      {(debouncedSearchQuery || selectedTags.length > 0) &&
        filteredPosts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Search className="mb-4 h-16 w-16 text-muted-foreground/30" />
              </TooltipTrigger>
              <TooltipContent side="top">
                No matching {contentType === "blog" ? "posts" : "projects"}{" "}
                found for your search
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <h3 className="mb-2 text-xl font-semibold">
                  No {contentType === "blog" ? "posts" : "projects"} found
                </h3>
              </TooltipTrigger>
              <TooltipContent side="top">
                Your current filters don't match any{" "}
                {contentType === "blog" ? "posts" : "projects"}
              </TooltipContent>
            </Tooltip>
            <p className="text-muted-foreground max-w-md">
              Try adjusting your search terms or selected tags, or{" "}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="link"
                    className="p-0 h-auto font-medium"
                    onClick={handleClearAllFilters}
                  >
                    browse all {contentType === "blog" ? "posts" : "projects"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  Clear all filters and show all{" "}
                  {contentType === "blog" ? "posts" : "projects"}
                </TooltipContent>
              </Tooltip>
              .
            </p>
          </div>
        )}

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
}
