"use client";

import { Input } from "@/components/ui/input";
import { Search, Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import TagSelector from "./tag-selector";
import { ContentItem } from "@/lib/mdx";
import { InView } from "@/components/ui/in-view";

export default function Filters({
  searchQuery,
  setSearchQuery,
  handleClearSearch,
  setIsFiltersOpen,
  isFiltersOpen,
  selectedTags,
  hasActiveFilters,
  handleClearAllFilters,
  debouncedSearchQuery,
  handleTagToggle,
  allTags,
  handleClearAllTags,
  filteredPosts,
  posts,
  totalPages,
  currentPage,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleClearSearch: () => void;
  setIsFiltersOpen: (isOpen: boolean) => void;
  isFiltersOpen: boolean;
  selectedTags: string[];
  hasActiveFilters: boolean;
  handleClearAllFilters: () => void;
  debouncedSearchQuery: string;
  handleTagToggle: (tag: string) => void;
  allTags: string[];
  handleClearAllTags: () => void;
  filteredPosts: ContentItem[];
  posts: ContentItem[];
  totalPages: number;
  currentPage: number;
}) {
  return (
    <InView
      as="div"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.4 }}
      className="mt-4 bg-card p-6 shadow-lg backdrop-blur-md border dark"
    >
      <div className="space-y-6">
        {/* Search and Filter Controls */}
        <InView
          as="div"
          variants={{
            hidden: { opacity: 0, y: -10 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 h-12 text-white bg-background/80 border-border/60 focus:border-primary/50 focus:ring-primary/20 rounded-xl shadow-sm"
                />
              </TooltipTrigger>
              <TooltipContent side="top">
                Search posts by title, summary, or tags
              </TooltipContent>
            </Tooltip>
            {searchQuery && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted text-foreground rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Clear search</TooltipContent>
              </Tooltip>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="gap-2 rounded-xl border-border/70 hover:bg-primary/10 hover:text-primary transition"
                >
                  <Filter className="h-4 w-4" />
                  Tags
                  {selectedTags.length > 0 && (
                    <Badge
                      variant="default"
                      className="rounded-full text-xs px-2 py-0.5"
                    >
                      {selectedTags.length}
                    </Badge>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {isFiltersOpen ? "Hide tag filters" : "Show tag filters"}
              </TooltipContent>
            </Tooltip>

            {hasActiveFilters && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleClearAllFilters}
                    className="gap-2 rounded-xl border-border/70 hover:bg-destructive/10 hover:text-destructive transition"
                  >
                    <X className="h-4 w-4" />
                    Clear All
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  Remove all active filters
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </InView>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <InView
            as="div"
            variants={{
              hidden: { opacity: 0, height: 0 },
              visible: { opacity: 1, height: "auto" },
            }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap items-center gap-2 pt-3 border-t border-border overflow-hidden"
          >
            <span className="text-sm font-medium text-muted-foreground">
              Active filters:
            </span>
            {debouncedSearchQuery && (
              <InView
                as="div"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.2 }}
              >
                <Badge
                  variant="secondary"
                  className="gap-1 rounded-full bg-primary/10 text-primary border-primary/20 px-3 py-1 text-sm shadow-sm"
                >
                  Search: "{debouncedSearchQuery}"
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleClearSearch}
                        className="h-4 w-4 p-0 hover:bg-primary/20 rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      Remove search filter
                    </TooltipContent>
                  </Tooltip>
                </Badge>
              </InView>
            )}
            {selectedTags.map((tag) => (
              <InView
                key={tag}
                as="div"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.2 }}
              >
                <Badge
                  variant="default"
                  className="gap-1 rounded-full px-3 py-1 text-sm shadow-sm"
                >
                  {tag}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTagToggle(tag)}
                        className="h-4 w-4 p-0 hover:bg-primary/20 rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      Remove "{tag}" filter
                    </TooltipContent>
                  </Tooltip>
                </Badge>
              </InView>
            ))}
          </InView>
        )}

        {/* Collapsible Tag Selector */}
        <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          {isFiltersOpen && (
            <InView
              as="div"
              variants={{
                hidden: { height: 0, opacity: 0 },
                visible: { height: "auto", opacity: 1 },
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <CollapsibleContent className="pt-3 border-t">
                <TagSelector
                  allTags={allTags}
                  selectedTags={selectedTags}
                  onTagToggle={handleTagToggle}
                  onClearAll={handleClearAllTags}
                />
              </CollapsibleContent>
            </InView>
          )}
        </Collapsible>

        {/* Results Summary */}
        <InView
          as="div"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex items-center justify-between border text-sm rounded-xl bg-muted/40 px-4 py-2"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-muted-foreground">
                {hasActiveFilters ? (
                  <span>
                    Showing{" "}
                    <span className="font-medium text-foreground">
                      {filteredPosts.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-foreground">
                      {posts.length}
                    </span>{" "}
                    posts
                  </span>
                ) : (
                  <span>
                    <span className="font-medium text-foreground">
                      {posts.length}
                    </span>{" "}
                    posts total
                  </span>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              {hasActiveFilters
                ? `${filteredPosts.length} posts match your current filters`
                : `Browse all ${posts.length} available posts`}
            </TooltipContent>
          </Tooltip>
          {totalPages > 1 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-muted-foreground">
                  Page{" "}
                  <span className="font-medium text-foreground">
                    {currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-foreground">
                    {totalPages}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                Navigate through {totalPages} pages of results
              </TooltipContent>
            </Tooltip>
          )}
        </InView>
      </div>
    </InView>
  );
}
