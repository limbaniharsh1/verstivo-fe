"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Drawer } from "@/components/common/Drawer";
import type { BaseProduct } from "@/types/product";
import { formatDisplayPrice, parseNumericPrice } from "@/lib/price";
import { useCart } from "@/features/cart";

interface SizeSelectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: BaseProduct | null;
}

export function SizeSelectionDrawer({
  isOpen,
  onClose,
  product,
}: SizeSelectionDrawerProps) {
  const { addItem } = useCart();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  if (!product) return null;

  const formattedPrice = formatDisplayPrice(product.price);
  const numericPrice = parseNumericPrice(product.price);

  // Use only sizes available on the product, no default fallback
  const availableSizes = product.sizes || [];

  const formatSizeLabel = (sz: string | number) => {
    if (typeof sz === "string" && sz.toLowerCase().includes("uk")) return sz;
    const ukNum = typeof sz === "string" ? sz.replace(/[^\d.]/g, "") : sz;
    return `UK ${ukNum}`;
  };

  const titleNode = (
    <div className="flex items-center gap-2">
      <span className="text-[18px] sm:text-[20px] font-semibold text-black tracking-tight">
        Cart
      </span>
      <span className="grid size-5 place-items-center rounded-full bg-primary text-[11px] font-bold text-white">
        1
      </span>
    </div>
  );

  const handleConfirm = async () => {
    if (selectedSizeIndex === null) return;
    
    setIsAdding(true);
    try {
      const selectedSizeOption = availableSizes[selectedSizeIndex];
      const sizeStr = typeof selectedSizeOption === "string" ? selectedSizeOption : `UK ${selectedSizeOption}`;
      const match = sizeStr.match(/\d+(\.\d+)?/);
      const sizeNum = match ? Number(match[0]) : 4;

      const colorId = product.defaultColorId || "";
      // Use :: to safely separate ID parts
      const itemId = colorId ? `${product.id}::${colorId}::${sizeNum}` : `${product.id}::${sizeNum}`;
      
      const formattedSizeLabel = formatSizeLabel(selectedSizeOption);
      const formattedSubtitle = !product.subtitle.includes("UK")
        ? `${product.subtitle} · ${formattedSizeLabel}`
        : product.subtitle;

      const success = await addItem({
        id: itemId,
        name: product.name,
        subtitle: formattedSubtitle,
        price: numericPrice,
        formattedPrice,
        image: product.image,
        imageAlt: product.imageAlt,
      }, quantity);

      if (success) {
        onClose();
        // Reset state for next time
        setTimeout(() => {
          setSelectedSizeIndex(null);
          setQuantity(1);
        }, 300);
      }
    } finally {
      setIsAdding(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSelectedSizeIndex(null);
      setQuantity(1);
    }, 300);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      title={titleNode}
      position="right"
      headerClassName="h-[64px] sm:h-[70px] shrink-0 border-b border-neutral-200 px-3.5 xs:px-5 sm:px-6"
      bodyClassName="flex flex-col flex-1 overflow-hidden bg-white"
      closeButtonAriaLabel="Close size selection drawer"
    >
      <div className="flex flex-1 flex-col justify-between overflow-hidden">
        {/* Top Content */}
        <div className="flex-1 overflow-y-auto px-3.5 xs:px-5 sm:px-6 py-4 space-y-4">
          {/* Item Row */}
          <div className="flex gap-3 sm:gap-4">
            {/* Thumbnail */}
            <div className="relative size-[90px] xs:size-[100px] sm:size-[110px] shrink-0 bg-[#f4f4f4] rounded-sm flex items-center justify-center overflow-hidden">
              <Image
                src={product.image || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
                alt={product.imageAlt || product.name}
                width={100}
                height={100}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <h4 className="text-[15px] sm:text-[16px] font-semibold text-black tracking-tight leading-snug line-clamp-1">
                  {product.name}
                </h4>
                <p className="text-[11px] sm:text-[12px] font-normal text-neutral-500 uppercase tracking-normal mt-0.5 line-clamp-1">
                  {product.subtitle}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[15px] sm:text-[16px] font-bold text-primary">
                    {formattedPrice}
                  </span>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="p-1 text-neutral-400 hover:text-black transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 size={19} strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* Quantity Controller */}
              <div className="mt-2 inline-flex items-center w-fit self-start shrink-0 border border-neutral-300 rounded-full bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                  className="w-7 h-7 sm:w-[34px] sm:h-8 shrink-0 flex items-center justify-center text-black hover:bg-neutral-100 transition-colors cursor-pointer border-r border-neutral-200"
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} strokeWidth={2} />
                </button>
                <span className="w-7 h-7 sm:w-[34px] sm:h-8 shrink-0 flex items-center justify-center font-medium text-black text-[12px] sm:text-[13px] border-r border-neutral-200">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-7 h-7 sm:w-[34px] sm:h-8 shrink-0 flex items-center justify-center text-black hover:bg-neutral-100 transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus size={13} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          {/* Size Grid (4 columns) */}
          <div className="pt-2">
            <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
              {availableSizes.length > 0 ? availableSizes.map((sz, idx) => {
                const isSelected = selectedSizeIndex === idx;
                const label = formatSizeLabel(sz);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`h-9 sm:h-10 px-1 flex items-center justify-center rounded-[6px] text-[11px] min-[360px]:text-[11.5px] sm:text-[12px] tracking-tight transition-all cursor-pointer text-center leading-tight whitespace-nowrap ${
                      isSelected
                        ? "border border-black text-black font-semibold shadow-2xs bg-transparent"
                        : "border border-neutral-200 text-neutral-500 font-normal hover:border-black hover:text-black bg-transparent"
                    }`}
                  >
                    {label}
                  </button>
                );
              }) : (
                <div className="col-span-4 text-sm text-neutral-500 py-4 text-center border border-neutral-200 rounded-md">
                  No sizes available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Confirm Button */}
        <div className="border-t border-neutral-200 bg-white p-3.5 xs:p-5">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={selectedSizeIndex === null || isAdding}
            className={`w-full h-11 sm:h-12 rounded-full text-white font-semibold text-[14px] sm:text-[15px] flex items-center justify-center transition-all shadow-xs ${
              selectedSizeIndex === null || isAdding
                ? "bg-[#b2b5f7] opacity-50 cursor-not-allowed"
                : "bg-primary hover:bg-primary-hover active:scale-[0.99] cursor-pointer"
            }`}
          >
            {isAdding ? "Adding..." : "Select size"}
          </button>
        </div>
      </div>
    </Drawer>
  );
}
