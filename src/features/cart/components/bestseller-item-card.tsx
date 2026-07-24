"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";
import { ProductItem } from "../types/cart";
import { useCart } from "../context/cart-context";

interface BestsellerItemCardProps {
  product: ProductItem;
}

export function BestsellerItemCard({ product }: BestsellerItemCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const productUrl = `/products/${product.id || "arizona-soft-footbed"}`;

  const handleAdd = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  return (
    <div className="flex items-center justify-between gap-3 sm:gap-4 py-1 group">
      {/* Product Image Thumbnail */}
      <Link
        href={productUrl}
        className="relative size-[90px] xs:size-[100px] sm:size-[110px] shrink-0 overflow-hidden bg-[#f4f4f4] rounded-sm flex items-center justify-center cursor-pointer"
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          width={110}
          height={110}
          className="object-contain p-1.5 sm:p-2 transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Product Info */}
      <Link href={productUrl} className="flex-1 min-w-0 pr-1 sm:pr-2 cursor-pointer">
        <h4 className="text-[14px] sm:text-[16px] font-semibold text-black tracking-tight line-clamp-1 hover:underline">
          {product.name}
        </h4>
        <p className="text-[10px] sm:text-[11px] font-medium text-neutral-500 uppercase tracking-normal mt-0.5 mb-2 line-clamp-1">
          {product.subtitle}
        </p>
        <p className="text-[13px] sm:text-[14px] font-bold text-black">
          {product.formattedPrice}
        </p>
      </Link>

      {/* Add Action Button */}
      <button
        type="button"
        onClick={handleAdd}
        className={`shrink-0 h-8 sm:h-9 px-4 sm:px-5 rounded-full text-[12px] sm:text-[13px] font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
          isAdded
            ? "bg-emerald-600 text-white shadow-xs scale-95"
            : "bg-black text-white hover:bg-neutral-800 active:scale-95 shadow-xs"
        }`}
        aria-label={`Add ${product.name} to cart`}
      >
        {isAdded ? (
          <>
            <Check size={14} strokeWidth={2.5} />
            <span>Added</span>
          </>
        ) : (
          <span>Add</span>
        )}
      </button>
    </div>
  );
}
