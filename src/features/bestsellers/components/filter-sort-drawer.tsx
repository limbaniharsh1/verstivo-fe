"use client";

import { Check, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Drawer } from "@/components/common/Drawer";

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
    style: "bg-gradient-to-br from-[#A27243] via-[#CDBA9E] to-[#EFE7DC]",
  },
  { id: "blue", label: "Blue", style: "bg-[#0000DB]" },
  {
    id: "white-grey",
    label: "White & Grey",
    style: "bg-gradient-to-br from-[#FFFFFF] via-[#D6D6D6] to-[#8C8C8C]",
  },
  { id: "white", label: "White", style: "bg-white" },
  { id: "brown", label: "Brown", style: "bg-[#874A27]" },
  { id: "grey", label: "Grey", style: "bg-[#888888]" },
];

const SIZE_OPTIONS = ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"];

const DISCOUNT_OPTIONS = [
  { id: "10-plus", label: "10% and above" },
  { id: "20-plus", label: "20% and above" },
  { id: "30-plus", label: "30% and above" },
  { id: "50-plus", label: "50% and above" },
];

const MATERIAL_OPTIONS = ["Birko-Flor", "Leather", "Suede", "EVA", "Nubuck"];

const SORT_OPTIONS = [
  { id: "featured", label: "Featured" },
  { id: "price-low-high", label: "Price (low to high)" },
  { id: "price-high-low", label: "Price (high to low)" },
  { id: "bestsellers", label: "Bestsellers" },
  { id: "newest", label: "Newest" },
];

export function FilterSortDrawer({ isOpen, onClose }: FilterSortDrawerProps) {
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    sort: true,
    discount: false,
    colour: false,
    size: false,
    material: false,
  });

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

  const toggleSize = (sizeId: string) => {
    setSelectedSizes((prev) =>
      prev.includes(sizeId)
        ? prev.filter((id) => id !== sizeId)
        : [...prev, sizeId]
    );
  };

  const toggleDiscount = (discountId: string) => {
    setSelectedDiscounts((prev) =>
      prev.includes(discountId)
        ? prev.filter((id) => id !== discountId)
        : [...prev, discountId]
    );
  };

  const toggleMaterial = (materialId: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(materialId)
        ? prev.filter((id) => id !== materialId)
        : [...prev, materialId]
    );
  };

  const handleClearAll = () => {
    setSelectedSort("");
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedDiscounts([]);
    setSelectedMaterials([]);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Filter & Sort"
      position="right"
      headerClassName="h-[72px] shrink-0 border-b border-border/70 px-6"
      bodyClassName="px-6 py-5 space-y-6 flex-1 overflow-y-auto"
      closeButtonAriaLabel="Close Filter & Sort drawer"
      footer={
        <div className="border-t border-border/70 p-5 bg-white flex items-center gap-2">
          <button
            type="button"
            onClick={handleClearAll}
            className="w-[140px] rounded-full border border-black/80 bg-white h-11 sm:h-12 text-sm font-medium text-black transition-colors hover:bg-surface-muted active:scale-98 cursor-pointer flex items-center justify-center"
          >
            Clear All
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full bg-primary h-11 sm:h-12 text-sm font-medium text-white transition-all active:scale-98 cursor-pointer flex items-center justify-center"
          >
            Apply Filter
          </button>
        </div>
      }
    >
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
                className="flex items-center gap-3 text-sm text-foreground/80 hover:text-foreground cursor-pointer"
              >
                <input
                  type="radio"
                  name="sort"
                  value={option.id}
                  checked={selectedSort === option.id}
                  onChange={() => setSelectedSort(option.id)}
                  className="size-4 accent-primary"
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
          <div className="mt-4 space-y-3 pl-1">
            {DISCOUNT_OPTIONS.map((option) => (
              <label
                key={option.id}
                className="flex items-center gap-3 text-sm text-foreground/80 hover:text-foreground cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedDiscounts.includes(option.id)}
                  onChange={() => toggleDiscount(option.id)}
                  className="size-4 rounded border-border accent-primary"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
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
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-4 pt-1">
            {COLOR_OPTIONS.map((color) => {
              const isSelected = selectedColors.includes(color.id);
              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => toggleColor(color.id)}
                  className="group flex flex-col items-center gap-1.5 cursor-pointer focus:outline-none"
                  title={color.label}
                >
                  <div
                    className={`relative size-10 rounded-full border border-border bg-white p-0.5 transition-transform duration-200 group-hover:scale-105 flex items-center justify-center ${
                      isSelected
                        ? "ring-1 ring-black border-black scale-105 shadow-sm"
                        : "shadow-xs hover:shadow-md"
                    }`}
                  >
                    <div className={`w-full h-full rounded-full ${color.style}`} />
                    {isSelected && (
                      <Check
                        size={14}
                        className={`absolute ${color.id === "white" ? "text-black" : "text-white"}`}
                        strokeWidth={2.5}
                      />
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-medium leading-tight transition-colors ${
                      isSelected ? "text-black font-semibold" : "text-neutral-600 group-hover:text-black"
                    }`}
                  >
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
          <span>Size (EU)</span>
          {expandedSections.size ? <Minus size={18} /> : <Plus size={18} />}
        </button>

        {expandedSections.size ? (
          <div className="mt-4 grid grid-cols-4 gap-2">
            {SIZE_OPTIONS.map((size) => {
              const isSelected = selectedSizes.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`flex h-10 items-center justify-center rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "border-primary bg-primary text-primary-contrast shadow-xs"
                      : "border-border/80 bg-white text-foreground hover:border-foreground"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
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
          <div className="mt-4 flex flex-wrap gap-2">
            {MATERIAL_OPTIONS.map((material) => {
              const isSelected = selectedMaterials.includes(material);
              return (
                <button
                  key={material}
                  type="button"
                  onClick={() => toggleMaterial(material)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "border-primary bg-primary text-primary-contrast shadow-xs"
                      : "border-border/80 bg-white text-foreground hover:border-foreground"
                  }`}
                >
                  {material}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </Drawer>
  );
}
