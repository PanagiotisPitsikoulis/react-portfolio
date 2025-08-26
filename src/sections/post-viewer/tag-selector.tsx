"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { X } from "lucide-react";

interface TagSelectorProps {
  allTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearAll: () => void;
}

export default function TagSelector({
  allTags,
  selectedTags,
  onTagToggle,
  onClearAll,
}: TagSelectorProps) {
  if (allTags.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Tooltip>
          <TooltipTrigger asChild>
            <h3 className="text-sm font-medium text-foreground/80">
              Filter by tags
            </h3>
          </TooltipTrigger>
          <TooltipContent side="top">
            Click tags to filter posts by topic
          </TooltipContent>
        </Tooltip>
        {selectedTags.length > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                className="h-auto text-xs text-muted-foreground hover:text-foreground"
              >
                Clear all
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              Remove all selected tag filters
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <Tooltip key={tag}>
              <TooltipTrigger asChild>
                <Badge
                  variant={isSelected ? "default" : "secondary"}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => onTagToggle(tag)}
                >
                  {tag}
                  {isSelected && <X className="ml-1 h-3 w-3" />}
                </Badge>
              </TooltipTrigger>
              <TooltipContent side="top">
                {isSelected
                  ? `Remove "${tag}" filter`
                  : `Filter posts by "${tag}"`}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
