"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductUrl } from "@/lib/product";
import { formatDisplayPrice } from "@/lib/price";

interface BestsellerItemCardProps {
  product: any;
  showSizes: boolean;
  onAddClick: () => void;
  onSizeSelect: (size: number) => void;
}

export function BestsellerItemCard({
  product,
  showSizes,
  onAddClick,
  onSizeSelect,
}: BestsellerItemCardProps) {
  const productUrl = getProductUrl({ id: product.id, slug: product.slug });
  const formattedPrice = formatDisplayPrice(product.price);
  
  const sizes = product.sizes || [4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="py-2.5 border-b border-neutral-200/60 last:border-b-0 space-y-2.5">
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        {/* Image */}
        <Link
          href={productUrl}
          className="group relative size-[80px] sm:size-[90px] shrink-0 overflow-hidden bg-[#f4f4f4] rounded-sm flex items-center justify-center cursor-pointer"
        >
          <Image
            src={product.image || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
            alt={product.imageAlt}
            width={90}
            height={90}
            className="object-contain p-1 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
 
        {/* Info */}
        <Link href={productUrl} className="flex-1 min-w-0 pr-1 sm:pr-2 cursor-pointer">
          <h4 className="text-[14px] sm:text-[15px] font-semibold text-black tracking-tight line-clamp-1 hover:underline">
            {product.name}
          </h4>
          <p className="text-[11px] sm:text-[12px] font-medium text-neutral-500 uppercase tracking-normal mt-0.5 mb-1 line-clamp-1">
            {product.subtitle}
          </p>
          <p className="text-[14px] sm:text-[15px] font-bold text-black">
            {formattedPrice}
          </p>
        </Link>
 
        {/* Add button */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onAddClick();
            }}
            className={`h-7.5 px-4 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
              showSizes
                ? "bg-neutral-200 text-black cursor-default"
                : "bg-black text-white hover:bg-neutral-800"
            }`}
          >
            {showSizes ? "Sizes" : "Add"}
          </button>
        </div>
      </div>

      {/* Inline sizes grid */}
      {showSizes && (
        <div className="pt-1.5 animate-fadeIn">
          <p className="text-[11.5px] font-semibold text-black mb-1.5">Select Size:</p>
          <div className="grid grid-cols-4 min-[360px]:grid-cols-5 gap-1.5">
            {sizes.map((sz: number) => (
              <button
                key={sz}
                type="button"
                onClick={() => onSizeSelect(sz)}
                className="h-8 py-1 flex items-center justify-center rounded-[5px] border border-neutral-200 text-[12px] font-semibold text-neutral-600 hover:border-black hover:text-black transition-all cursor-pointer bg-white"
              >
                UK {sz}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
