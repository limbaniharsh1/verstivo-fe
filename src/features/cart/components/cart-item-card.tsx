"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "../types/cart";
import { useCart } from "../context/cart-context";

interface CartItemCardProps {
  item: CartItem;
}

const AVAILABLE_SIZES = [
  "UK 4 / EU 30",
  "UK 4 / EU 31",
  "UK 4 / EU 32",
  "UK 4 / EU 33",
  "UK 4 / EU 34",
  "UK 4 / EU 35",
  "UK 4 / EU 36",
  "UK 4 / EU 37",
  "UK 4 / EU 38",
  "UK 4 / EU 39",
  "UK 4 / EU 40",
];

const getEuSize = (ukSize: number) => {
  const mapping: Record<number, number> = {
    4: 38,
    5: 39,
    6: 40,
    7: 41,
    8: 42,
    9: 43,
    10: 44,
    11: 45,
    12: 46,
  };
  return mapping[ukSize] || ukSize + 34;
};

const formatSizeButtonText = (sz: number | string) => {
  if (typeof sz === "string" && sz.includes("/")) return sz;
  const num = typeof sz === "number" ? sz : Number(String(sz).match(/\d+/)?.[0] || 0);
  if (!num) return String(sz);
  return `UK ${num} / EU ${getEuSize(num)}`;
};

export function CartItemCard({ item }: CartItemCardProps) {
  const {
    updateQuantity,
    removeItem,
    editingSizeItemId,
    setEditingSizeItemId,
    updateSize,
  } = useCart();
  const { product, quantity } = item;
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

  const isEditingSize = editingSizeItemId === product.id;

  const itemTotal = product.price * quantity;
  const formattedItemTotal = `₹${itemTotal.toLocaleString("en-IN")}.00`;
  const formattedOriginalTotal = product.originalPrice
    ? `₹${(product.originalPrice * quantity).toLocaleString("en-IN")}.00`
    : product.formattedOriginalPrice;

  // Use product available sizes, default to AVAILABLE_SIZES list if not present
  const availableSizes = product.sizes && product.sizes.length > 0
    ? product.sizes
    : AVAILABLE_SIZES;

  const getCurrentSizeNum = () => {
    if (!product.size) return null;
    const match = product.size.match(/\d+/);
    return match ? Number(match[0]) : null;
  };
  const currentSizeNum = getCurrentSizeNum();

  const isAvailable = product.isAvailable ?? ((product.stock ?? 1) > 0);
  const stockCount = product.stock ?? 0;
  const isInsufficientStock = isAvailable && quantity > stockCount;
  const isEligible = isAvailable && !isInsufficientStock;

  return (
    <div className={`py-3.5 sm:py-4 border-b border-neutral-200/80 last:border-b-0 space-y-3 transition-opacity ${!isEligible ? "opacity-85" : ""}`}>
      {/* Top Part: Product Image + Info */}
      <div className="flex gap-3 sm:gap-4">
        {/* Product Image */}
        <div className="relative size-[90px] xs:size-[100px] sm:size-[110px] shrink-0 bg-[#f4f4f4] rounded-sm flex items-center justify-center overflow-hidden">
          <Image
            src={product.image}
            alt={product.imageAlt}
            width={100}
            height={100}
            className={`w-full h-full object-contain ${!isEligible ? "grayscale-[30%]" : ""}`}
          />
          {!isAvailable && (
            <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
              <span className="bg-neutral-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Info & Quantity */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            {/* Title */}
            <h4 className="text-responsive-lg font-semibold text-black tracking-tight leading-snug line-clamp-1">
              {product.name}
            </h4>

            {/* Subtitle */}
            <p className="text-responsive-subtitle font-normal text-neutral-500 uppercase tracking-normal mt-0.5 line-clamp-1">
              {product.subtitle}
            </p>

            {/* Out of Stock notice banner */}
            {!isAvailable ? (
              <div className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-medium text-red-600 bg-red-50 border border-red-200/60 px-2 py-0.5 rounded">
                <span>Currently out of stock · Not included in total</span>
              </div>
            ) : isInsufficientStock ? (
              <div className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded">
                <span>Only {stockCount} available. Please reduce the quantity.</span>
              </div>
            ) : null}

            {/* Price & Delete Button */}
            <div className="flex items-center justify-between mt-1 sm:mt-1.5">
              <div className="flex items-baseline gap-1.5 sm:gap-2">
                {formattedOriginalTotal && (
                  <span className="text-responsive-subtitle text-neutral-400 line-through font-normal">
                    {formattedOriginalTotal}
                  </span>
                )}
                <span className={`text-responsive-lg font-bold ${!isEligible ? "text-neutral-400 line-through font-normal" : "text-primary"}`}>
                  {formattedItemTotal}
                </span>
              </div>

              <button
                type="button"
                onClick={() => removeItem(product.id)}
                className="p-1 text-neutral-500 hover:text-black transition-colors cursor-pointer"
                aria-label={`Remove ${product.name} from cart`}
              >
                <Trash2 size={19} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Segmented Pill Quantity Controller */}
          <div className={`mt-2 sm:mt-2.5 inline-flex items-center w-fit self-start shrink-0 border border-neutral-300 rounded-full bg-white overflow-hidden ${!isAvailable ? "opacity-50 pointer-events-none" : ""}`}>
            <button
              type="button"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              disabled={!isAvailable}
              className="w-7 h-7 sm:w-[34px] sm:h-8 shrink-0 flex items-center justify-center text-black hover:bg-neutral-100 transition-colors cursor-pointer border-r border-neutral-200 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <Minus size={13} strokeWidth={2} />
            </button>
            <span className={`w-7 h-7 sm:w-[34px] sm:h-8 shrink-0 flex items-center justify-center font-medium text-[12px] sm:text-[13px] border-r border-neutral-200 ${isInsufficientStock ? "text-amber-700 bg-amber-50" : "text-black"}`}>
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              disabled={!isAvailable || quantity >= stockCount}
              className="w-7 h-7 sm:w-[34px] sm:h-8 shrink-0 flex items-center justify-center text-black hover:bg-neutral-100 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Increase quantity"
            >
              <Plus size={13} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Size View / Size Grid Section */}
      {isEditingSize ? (
        <div className="pt-1">
          <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
            {availableSizes.map((sz, idx) => {
              const isSelected = idx === 0 || (typeof sz === "number" ? currentSizeNum === sz : false);
              return (
                <button
                  key={sz}
                  type="button"
                  onClick={() => {
                    updateSize(product.id, typeof sz === "number" ? `UK ${sz}` : String(sz));
                  }}
                  className={`h-9 sm:h-10 px-1 flex items-center justify-center rounded-[6px] text-[11px] min-[360px]:text-[11.5px] sm:text-[12px] tracking-tight transition-all cursor-pointer text-center leading-tight whitespace-nowrap bg-transparent ${
                    isSelected
                      ? "border-2 border-black text-black font-semibold shadow-2xs"
                      : "border border-neutral-200 text-neutral-500 font-normal hover:border-black hover:text-black"
                  }`}
                >
                  {typeof sz === "string" ? sz : formatSizeButtonText(sz)}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between border border-neutral-200/90 rounded-[6px] px-3.5 py-2 sm:py-2.5 bg-white text-[13px] sm:text-[13.5px]">
          <span className="font-semibold text-black">
            Size: {product.size || "UK 4"}
          </span>
          <button
            type="button"
            onClick={() => setEditingSizeItemId(product.id)}
            className="text-neutral-700 hover:text-black underline underline-offset-2 transition-colors cursor-pointer text-[12.5px] sm:text-[13px]"
          >
            Edit size
          </button>
        </div>
      )}
    </div>
  );
}
