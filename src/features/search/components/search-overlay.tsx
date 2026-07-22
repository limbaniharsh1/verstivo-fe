"use client";

import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { ProductCard } from "@/features/home/components/product-card";
import {
  MOST_SEARCHED_TAGS,
  SEARCH_PRODUCTS,
} from "@/features/search/data/search-data";

type SearchOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Smooth slide transition state
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      // Small timeout to allow slide animation before focus
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Check scroll positions for chevron buttons
  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(
        el.scrollLeft < el.scrollWidth - el.clientWidth - 5
      );
    }
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      checkScroll();
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [checkScroll, isOpen, isMounted]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
      setSearchQuery("");
    } else {
      setSelectedTag(tag);
      setSearchQuery(tag === "Most searched" ? "" : tag);
    }
  };

  // Filter products based on search query
  const filteredProducts = SEARCH_PRODUCTS.filter((product) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      product.name.toLowerCase().includes(q) ||
      product.subtitle.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q)
    );
  });

  if (!isMounted) return null;

  return (
    <div className="fixed inset-x-0 top-[95px] bottom-0 z-40 flex flex-col justify-start overflow-hidden pointer-events-none">
      {/* Backdrop */}
      <div
        className={`fixed inset-x-0 top-[95px] bottom-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ease-in-out pointer-events-auto ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Search Panel */}
      <div
        className={`relative z-50 w-full bg-white shadow-2xl border-b border-border transition-all duration-300 ease-in-out transform pointer-events-auto ${
          isAnimating ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Product Search"
      >
        <div className="mx-auto w-full max-w-[1585px] px-4 py-4 sm:px-6 sm:py-6 lg:px-10">
          {/* Top Search Input Bar */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="relative flex h-10 sm:h-12 w-full min-w-0 items-center rounded-lg border border-black bg-white px-4 transition-colors focus-within:border-black focus-within:ring-1 focus-within:ring-black">
              <Search className="size-4 sm:size-5 shrink-0 text-muted" strokeWidth={1.6} />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (selectedTag !== null) {
                    setSelectedTag(null);
                  }
                }}
                placeholder="Search"
                className="w-full bg-transparent px-2.5 text-sm sm:text-base text-foreground outline-none placeholder:text-muted"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTag(null);
                  }}
                  className="grid size-6 place-items-center rounded-full text-muted hover:text-foreground transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              ) : null}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="shrink-0 text-xs sm:text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors cursor-pointer px-1 py-1"
            >
              Cancel
            </button>
          </div>

          {/* Tags Section */}
          <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm font-semibold text-foreground mr-1">
              Most searched
            </span>

            <div className="scrollbar-hidden flex flex-1 items-center gap-2 overflow-x-auto py-1">
              {MOST_SEARCHED_TAGS.map((tag) => {
                const isActive = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className={`rounded-full px-3.5 sm:px-4 py-1 sm:py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap border ${
                      isActive
                        ? "bg-foreground text-white border-foreground"
                        : "bg-surface-muted text-foreground border-transparent hover:bg-neutral-200"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Products Slider Section */}
          <div className="relative mt-6 sm:mt-8 pb-2">
            {/* Scroll Navigation Buttons */}
            {filteredProducts.length > 0 ? (
              <>
                <button
                  type="button"
                  onClick={() => handleScroll("left")}
                  disabled={!canScrollLeft}
                  className="absolute -left-3 sm:-left-4 top-[37.5%] -translate-y-1/2 z-20 grid size-8 sm:size-9 place-items-center rounded-full bg-white text-foreground shadow-md border border-neutral-200 transition-all hover:bg-black hover:text-white active:bg-black active:text-white focus:bg-black focus:text-white disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll("right")}
                  disabled={!canScrollRight}
                  className="absolute -right-3 sm:-right-4 top-[37.5%] -translate-y-1/2 z-20 grid size-8 sm:size-9 place-items-center rounded-full bg-white text-foreground shadow-md border border-neutral-200 transition-all hover:bg-black hover:text-white active:bg-black active:text-white focus:bg-black focus:text-white disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
                  aria-label="Scroll right"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            ) : null}

            {/* Scrollable Container */}
            {filteredProducts.length > 0 ? (
              <div
                ref={scrollContainerRef}
                className="scrollbar-hidden flex gap-1 overflow-x-auto scroll-smooth py-1 px-1"
              >
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="min-w-0 shrink-0 basis-[78%] min-[400px]:basis-[65%] sm:basis-[42%] md:basis-[30%] lg:basis-[calc(25%_-_3px)]"
                  >
                    <ProductCard
                      product={{
                        id: product.id,
                        name: product.name,
                        subtitle: product.subtitle,
                        price: product.price,
                        image: product.image,
                        imageAlt: product.imageAlt,
                        badge: product.badge
                          ? { label: product.badge, tone: "neutral" }
                          : undefined,
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-sm sm:text-base text-muted">
                  No products found for &ldquo;<span className="font-semibold text-foreground">{searchQuery}</span>&rdquo;
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTag(null);
                  }}
                  className="mt-3 text-xs sm:text-sm font-medium text-primary hover:underline cursor-pointer"
                >
                  Clear search & show top products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

