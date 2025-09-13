"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ContentItem, ContentType } from "@/lib/md/mdx";
import { Filter, Search, X } from "lucide-react";
import TagSelector from "./tag-selector";

export default function Filters({
  contentType,
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
  contentType: ContentType;
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
    <div className="mt-3 py-2">
      <div className="space-y-4">
        {/* Search and Filter Controls */}
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-20" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Input
                  type="text"
                  placeholder={`Search ${
                    contentType === "blog" ? "posts" : "projects"
                  }...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 h-10 focus:border-primary/50 focus:ring-0"
                />
              </TooltipTrigger>
              <TooltipContent side="top">
                Search {contentType === "blog" ? "posts" : "projects"} by title,
                summary, or tags
              </TooltipContent>
            </Tooltip>
            {searchQuery && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-muted/30 rounded-full"
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Clear search</TooltipContent>
              </Tooltip>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="gap-2 border-border/60 hover:bg-muted/30 transition text-muted-foreground"
                >
                  <Filter className="h-4 w-4" />
                  Tags
                  {selectedTags.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="rounded-full text-xs px-2 py-0.5 shadow-none"
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
                    variant="outline"
                    size="sm"
                    onClick={handleClearAllFilters}
                    className="gap-2 rounded-md border-border/60 hover:bg-destructive/10 hover:text-destructive transition"
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
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border overflow-hidden">
            <span className="text-sm font-medium text-muted-foreground">
              Active filters:
            </span>
            {debouncedSearchQuery && (
              <div>
                <Badge
                  variant="secondary"
                  className="gap-1 rounded-full bg-muted/30 text-foreground border-border/60 px-2.5 py-0.5 text-sm"
                >
                  Search: "{debouncedSearchQuery}"
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearSearch}
                        className="h-4 w-4 p-0 hover:bg-muted/30 rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      Remove search filter
                    </TooltipContent>
                  </Tooltip>
                </Badge>
              </div>
            )}
            {selectedTags.map((tag) => (
              <div key={tag}>
                <Badge
                  variant="secondary"
                  className="gap-1 rounded-full px-2.5 py-0.5 text-sm"
                >
                  {tag}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTagToggle(tag)}
                        className="h-4 w-4 p-0 hover:bg-muted/30 rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      Remove "{tag}" filter
                    </TooltipContent>
                  </Tooltip>
                </Badge>
              </div>
            ))}
          </div>
        )}

        {/* Collapsible Tag Selector */}
        <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          {isFiltersOpen && (
            <div className="overflow-hidden">
              <CollapsibleContent className="pt-2 border-t">
                {allTags.length > 0 ? (
                  <TagSelector
                    allTags={allTags}
                    selectedTags={selectedTags}
                    onTagToggle={handleTagToggle}
                    onClearAll={handleClearAllTags}
                  />
                ) : (
                  <div className="text-center py-3 text-muted-foreground">
                    No tags available
                  </div>
                )}
              </CollapsibleContent>
            </div>
          )}
        </Collapsible>

        {/* Results Summary */}
        <div className="flex items-center justify-between border-0 border-t border-border/60 text-sm px-0 py-2">
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
                    {contentType === "blog" ? "posts" : "projects"}
                  </span>
                ) : (
                  <span>
                    <span className="font-medium text-foreground">
                      {posts.length}
                    </span>{" "}
                    {contentType === "blog" ? "posts" : "projects"} total
                  </span>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              {hasActiveFilters
                ? `${filteredPosts.length} ${
                    contentType === "blog" ? "posts" : "projects"
                  } match your current filters`
                : `Browse all ${posts.length} available ${
                    contentType === "blog" ? "posts" : "projects"
                  }`}
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
        </div>
      </div>
    </div>
  );
}
