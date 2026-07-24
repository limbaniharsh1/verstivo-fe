"use client";

import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

type FilterSortDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ColorOption = {
  id: string;
  label: string;
  style: string;
};

const COLOR_OPTIONS: readonly ColorOption[] = [
  { id: "black", label: "Black", style: "bg-black" },
  {
    id: "brown-beige",
    label: "Brown & Beige",
    style: "bg-gradient-to-br from-[#9E7852] via-[#C5B49D] to-[#EBE0D3]",
  },
  { id: "blue", label: "Blue", style: "bg-[#0000C9]" },
  {
    id: "white-grey",
    label: "White & Grey",
    style: "bg-gradient-to-br from-white via-[#E0E0E0] to-[#B0B0B0] border border-border",
  },
  { id: "white", label: "White", style: "bg-white border border-border" },
  { id: "brown", label: "Brown", style: "bg-[#794429]" },
  { id: "grey", label: "Grey", style: "bg-[#8A8A8A]" },
];

const SORT_OPTIONS = [
  { id: "featured", label: "Featured" },
  { id: "price-low-high", label: "Price (low to high)" },
  { id: "price-high-low", label: "Price (high to low)" },
  { id: "bestsellers", label: "Bestsellers" },
  { id: "newest", label: "Newest" },
];

export function FilterSortDrawer({ isOpen, onClose }: FilterSortDrawerProps) {
  const [selectedSort, setSelectedSort] = useState<string>("bestsellers");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    sort: true,
    discount: false,
    colour: true,
    size: false,
    material: false,
  });

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleColor = (colorId: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorId)
        ? prev.filter((id) => id !== colorId)
        : [...prev, colorId]
    );
  };

  const handleClearAll = () => {
    setSelectedSort("bestsellers");
    setSelectedColors([]);
  };

  return (
    <>
      {/* Dimmed Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-Over Drawer Container */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-[440px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Filter and Sort Options"
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-border/70 px-6">
          <h2 className="text-lg font-bold text-foreground">Filter & Sort</h2>
          <button
            type="button"
            onClick={onClose}
            className="grid size-9 place-items-center rounded-full text-foreground transition-colors hover:bg-surface-muted cursor-pointer"
            aria-label="Close Filter & Sort drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Accordion Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Section 1: Sort By */}
          <div className="border-b border-border/60 pb-6">
            <button
              type="button"
              onClick={() => toggleSection("sort")}
              className="flex w-full items-center justify-between text-left text-sm font-semibold text-foreground cursor-pointer"
            >
              <span>Sort By:</span>
              {expandedSections.sort ? <Minus size={18} /> : <Plus size={18} />}
            </button>

            {expandedSections.sort ? (
              <div className="mt-4 space-y-3 pl-1">
                {SORT_OPTIONS.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center gap-3 text-sm cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSort === option.id}
                      onChange={() => setSelectedSort(option.id)}
                      className="size-4 rounded-xs border-border/80 text-primary focus:ring-0 cursor-pointer accent-[#0000C9]"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            ) : null}
          </div>

          {/* Section 2: Discount */}
          <div className="border-b border-border/60 pb-6">
            <button
              type="button"
              onClick={() => toggleSection("discount")}
              className="flex w-full items-center justify-between text-left text-sm font-semibold text-foreground cursor-pointer"
            >
              <span>Discount</span>
              {expandedSections.discount ? <Minus size={18} /> : <Plus size={18} />}
            </button>

            {expandedSections.discount ? (
              <div className="mt-3 text-xs text-muted">No discount filters available</div>
            ) : null}
          </div>

          {/* Section 3: Colour */}
          <div className="border-b border-border/60 pb-6">
            <button
              type="button"
              onClick={() => toggleSection("colour")}
              className="flex w-full items-center justify-between text-left text-sm font-semibold text-foreground cursor-pointer"
            >
              <span>Colour</span>
              {expandedSections.colour ? <Minus size={18} /> : <Plus size={18} />}
            </button>

            {expandedSections.colour ? (
              <div className="mt-5 grid grid-cols-5 gap-y-4 gap-x-2">
                {COLOR_OPTIONS.map((color) => {
                  const isSelected = selectedColors.includes(color.id);
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => toggleColor(color.id)}
                      className="flex flex-col items-center gap-1.5 cursor-pointer group focus-visible:outline-2 focus-visible:outline-primary rounded-lg p-1"
                    >
                      <span
                        className={`size-10 rounded-full transition-transform group-hover:scale-105 shadow-xs ${color.style} ${
                          isSelected ? "ring-2 ring-primary ring-offset-2" : ""
                        }`}
                      />
                      <span className="text-[11px] leading-tight text-foreground text-center font-normal">
                        {color.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          {/* Section 4: Size */}
          <div className="border-b border-border/60 pb-6">
            <button
              type="button"
              onClick={() => toggleSection("size")}
              className="flex w-full items-center justify-between text-left text-sm font-semibold text-foreground cursor-pointer"
            >
              <span>Size</span>
              {expandedSections.size ? <Minus size={18} /> : <Plus size={18} />}
            </button>

            {expandedSections.size ? (
              <div className="mt-3 text-xs text-muted">Select sizes (36 - 45)</div>
            ) : null}
          </div>

          {/* Section 5: Material */}
          <div className="pb-4">
            <button
              type="button"
              onClick={() => toggleSection("material")}
              className="flex w-full items-center justify-between text-left text-sm font-semibold text-foreground cursor-pointer"
            >
              <span>Material</span>
              {expandedSections.material ? <Minus size={18} /> : <Plus size={18} />}
            </button>

            {expandedSections.material ? (
              <div className="mt-3 text-xs text-muted">Birko-Flor, Leather, Suede</div>
            ) : null}
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="shrink-0 border-t border-border/70 p-5 bg-white flex items-center gap-3.5">
          <button
            type="button"
            onClick={handleClearAll}
            className="w-[130px] rounded-full border border-black/80 bg-white py-3 text-sm font-medium text-black transition-colors hover:bg-surface-muted active:scale-98 cursor-pointer"
          >
            Clear All
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full bg-[#0000C9] py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-98 cursor-pointer"
          >
            Apply Filter
          </button>
        </div>
      </aside>
    </>
  );
}
