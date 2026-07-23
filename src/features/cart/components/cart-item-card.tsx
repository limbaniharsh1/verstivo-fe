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

  return (
    <div className="py-3.5 sm:py-4 border-b border-neutral-200/80 last:border-b-0 space-y-3">
      {/* Top Part: Product Image + Info */}
      <div className="flex gap-3 sm:gap-4">
        {/* Product Image */}
        <div className="relative size-[90px] xs:size-[100px] sm:size-[110px] shrink-0 bg-[#f4f4f4] rounded-sm flex items-center justify-center overflow-hidden">
          <Image
            src={product.image}
            alt={product.imageAlt}
            width={100}
            height={100}
            className="object-contain p-1.5 sm:p-2"
          />
        </div>

        {/* Info & Quantity */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            {/* Title */}
            <h4 className="text-[14px] sm:text-[15px] font-semibold text-black tracking-tight leading-snug line-clamp-1">
              {product.name}
            </h4>

            {/* Subtitle */}
            <p className="text-[10px] sm:text-[11px] font-normal text-neutral-500 uppercase tracking-normal mt-0.5 line-clamp-1">
              {product.subtitle}
            </p>

            {/* Price & Delete Button */}
            <div className="flex items-center justify-between mt-1 sm:mt-1.5">
              <div className="flex items-baseline gap-1.5 sm:gap-2">
                {formattedOriginalTotal && (
                  <span className="text-[12px] sm:text-[13px] text-neutral-400 line-through font-normal">
                    {formattedOriginalTotal}
                  </span>
                )}
                <span className="text-[13.5px] sm:text-[14px] font-bold text-[#0000d6]">
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
          <div className="mt-2 sm:mt-2.5 inline-flex items-center w-fit self-start shrink-0 border border-neutral-300 rounded-full bg-white overflow-hidden">
            <button
              type="button"
              onClick={() => updateQuantity(product.id, quantity - 1)}
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
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="w-7 h-7 sm:w-[34px] sm:h-8 shrink-0 flex items-center justify-center text-black hover:bg-neutral-100 transition-colors cursor-pointer"
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
          <div className="grid grid-cols-2 min-[360px]:grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-2.5">
            {AVAILABLE_SIZES.map((sz, index) => {
              const isSelected = selectedSizeIndex === index;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setSelectedSizeIndex(index);
                    updateSize(product.id, sz);
                  }}
                  className={`min-h-[38px] sm:min-h-[40px] py-1 px-1 flex items-center justify-center rounded-[5px] border text-[11.5px] min-[360px]:text-[12px] sm:text-[13px] font-semibold tracking-tight transition-all cursor-pointer text-center leading-tight whitespace-nowrap ${
                    isSelected
                      ? "border-black bg-black text-white shadow-xs"
                      : "border-neutral-200 bg-white text-black hover:border-[#0000d6] hover:text-[#0000d6]"
                  }`}
                >
                  {sz}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between border border-neutral-200/90 rounded-[6px] px-3.5 py-2 sm:py-2.5 bg-white text-[13px] sm:text-[13.5px]">
          <span className="font-semibold text-black">
            Size: {product.size || "UK 4 / EU 38"}
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
