"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FilterSortDrawer } from "./filter-sort-drawer";

type BestsellerToolbarProps = {
  totalCount: number;
};

export function BestsellerToolbar({ totalCount }: BestsellerToolbarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-white">
        <div className="mx-auto flex w-full max-w-[1585px] items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 pt-3 pb-1.5 sm:pt-4 sm:pb-5">
          {/* Total Products Count */}
          <span className="text-xs sm:text-sm font-medium text-foreground">
            {totalCount} products
          </span>

          {/* Filter & Sort Trigger Button */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-foreground transition-colors hover:text-primary cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
            aria-expanded={isDrawerOpen}
            aria-label="Open filter and sort drawer"
          >
            <span>Filter & Sort</span>
            <ChevronDown className="size-4" />
          </button>
        </div>
      </div>

      {/* Slide-over Filter & Sort Drawer */}
      <FilterSortDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
