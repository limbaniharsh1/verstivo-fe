"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/features/cart";
import { parseNumericPrice, formatDisplayPrice } from "@/lib/price";
import { ProductBadge } from "./ProductBadge";
import { WishlistButton } from "./WishlistButton";
import type { BaseProduct } from "@/types/product";

export type ProductCardVariant = "default" | "search" | "horizontal";

type BaseProductCardProps = {
  product: BaseProduct;
  variant?: ProductCardVariant;
  showBadge?: boolean;
  showWishlist?: boolean;
  isWishlistLiked?: boolean;
  onWishlistToggle?: (liked: boolean) => void;
  productUrl?: string;
};

export function BaseProductCard({
  product,
  variant = "default",
  showBadge = true,
  showWishlist = true,
  isWishlistLiked,
  onWishlistToggle,
  productUrl: customUrl,
}: BaseProductCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const productUrl =
    customUrl || `/products/${product.id || "arizona-soft-footbed"}`;

  const formattedPrice = formatDisplayPrice(product.price);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const numericPrice = parseNumericPrice(product.price);
    addItem({
      id: product.id || product.name.toLowerCase().replace(/\s+/g, "-"),
      name: product.name,
      subtitle: product.subtitle,
      price: numericPrice,
      formattedPrice,
      image: product.image,
      imageAlt: product.imageAlt,
    });

    toast.success(`${product.name} added to cart`);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };


  // Horizontal variant (used in cart drawer bestseller recommendation items)
  if (variant === "horizontal") {
    return (
      <div className="flex items-center justify-between gap-3 sm:gap-4 py-1 group">
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

        <Link href={productUrl} className="flex-1 min-w-0 pr-1 sm:pr-2 cursor-pointer">
          <h4 className="text-[14px] sm:text-[16px] font-semibold text-black tracking-tight line-clamp-1 hover:underline">
            {product.name}
          </h4>
          <p className="text-[10px] sm:text-[11px] font-medium text-neutral-500 uppercase tracking-normal mt-0.5 mb-2 line-clamp-1">
            {product.subtitle}
          </p>
          <p className="text-[13px] sm:text-[14px] font-bold text-black">
            {formattedPrice}
          </p>
        </Link>

        <button
          type="button"
          onClick={handleAddToCart}
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

  // Search card variant
  if (variant === "search") {
    return (
      <article className="group relative flex flex-col w-full min-w-[220px] max-w-[280px] sm:min-w-[250px] sm:max-w-[300px] shrink-0 select-none cursor-pointer">
        <Link href={productUrl} className="absolute inset-0 z-0" aria-label={`View details for ${product.name}`} />

        <div className="relative aspect-[1.15/1] w-full rounded-md bg-surface-muted p-3 min-[400px]:p-4 flex items-center justify-center overflow-hidden transition-all duration-200 group-hover:bg-[#ededed]">
          {showBadge && product.badge ? (
            <div className="absolute top-2.5 left-2.5 z-10">
              <ProductBadge badge={product.badge} className="bg-white text-foreground" />
            </div>
          ) : null}

          {showWishlist && (
            <div className="absolute top-2.5 right-2.5 z-10">
              <WishlistButton
                productName={product.name}
                isLiked={isWishlistLiked}
                onToggle={onWishlistToggle}
              />
            </div>
          )}

          <div className="relative size-full p-2 flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.imageAlt}
              width={320}
              height={220}
              sizes="(max-width: 640px) 240px, 300px"
              className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="absolute bottom-2.5 right-2.5 z-10 flex h-7 sm:h-7.5 items-center justify-center rounded-full bg-black px-3.5 sm:px-4 text-[11px] sm:text-[12px] font-medium text-white shadow-xs transition-all hover:bg-neutral-800 active:scale-95 focus-visible:outline-2 focus-visible:outline-primary"
            aria-label={`Add ${product.name} to cart`}
          >
            Add
          </button>
        </div>

        <div className="pt-2.5 pb-1 px-0.5">
          <h3 className="text-[13px] sm:text-[14px] font-semibold text-foreground truncate leading-tight pointer-events-none">
            {product.name}
          </h3>
          <p className="text-[10px] sm:text-[11px] font-medium uppercase text-muted truncate mt-0.5 pointer-events-none">
            {product.subtitle}
          </p>
          <p className="text-[13px] sm:text-[14px] font-bold text-foreground mt-1.5 pointer-events-none">
            {formattedPrice}
          </p>
        </div>
      </article>
    );
  }

  // Default Grid variant (Home / Grid)
  return (
    <article className="product-card group relative cursor-pointer">
      <Link href={productUrl} className="absolute inset-0 z-0" aria-label={`View details for ${product.name}`} />

      {showBadge && product.badge ? (
        <div className="z-10 col-start-1 row-start-1 m-2 min-[375px]:m-2.5 sm:m-3 self-start justify-self-start">
          <ProductBadge badge={product.badge} />
        </div>
      ) : null}

      {showWishlist && (
        <div className="z-10 col-start-1 row-start-1 m-2 min-[375px]:m-2.5 sm:m-3 self-start justify-self-end">
          <WishlistButton
            productName={product.name}
            isLiked={isWishlistLiked}
            onToggle={onWishlistToggle}
          />
        </div>
      )}

      <Link href={productUrl} className="z-[1] col-start-1 row-start-1 h-full w-full">
        <Image
          src={product.image}
          alt={product.imageAlt}
          width={440}
          height={290}
          sizes="(max-width: 639px) 76vw, (max-width: 767px) 46vw, (max-width: 1023px) 32vw, 25vw"
          className="h-full w-full object-contain px-2.5 pt-2 pb-8 min-[375px]:px-3 min-[375px]:pt-3 min-[375px]:pb-8.5 sm:px-4 sm:py-6 md:px-4 md:py-7 lg:py-8 xl:px-6 xl:py-9 transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <button
        type="button"
        onClick={handleAddToCart}
        className="z-10 col-start-1 row-start-1 m-1.5 min-[375px]:m-2 sm:m-2.5 lg:m-3 flex h-6 min-[375px]:h-6.5 sm:h-7 md:h-7.5 cursor-pointer items-center justify-center rounded-full bg-foreground px-2.5 min-[375px]:px-3 md:px-3.5 text-[10px] min-[375px]:text-[10.5px] sm:text-[11px] md:text-[11.5px] lg:text-[12px] font-medium text-primary-contrast shadow-sm transition-all active:scale-95 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary self-end justify-self-end"
        aria-label={`Add ${product.name} to cart`}
      >
        Add
      </button>

      <h3 className="product-title col-start-1 row-start-2 px-2 min-[375px]:px-2.5 sm:px-3.5 md:px-4 pt-1.5 sm:pt-2.5 leading-tight font-semibold text-[11px] min-[375px]:text-[11.5px] sm:text-[12.5px] md:text-[13px] lg:text-[14px] truncate pointer-events-none" title={product.name}>
        {product.name}
      </h3>
      <p className="product-subtitle col-start-1 row-start-3 px-2 min-[375px]:px-2.5 sm:px-3.5 md:px-4 pt-0.5 uppercase text-muted text-[9px] min-[375px]:text-[9.5px] sm:text-[10px] md:text-[10.5px] lg:text-[11px] truncate pointer-events-none" title={product.subtitle}>
        {product.subtitle}
      </p>
      <p className="product-price col-start-1 row-start-4 px-2 min-[375px]:px-2.5 sm:px-3.5 md:px-4 pt-1 sm:pt-1.5 pb-2.5 sm:pb-3.5 font-semibold text-[11px] min-[375px]:text-[11.5px] sm:text-[12.5px] md:text-[13px] lg:text-[14px] pointer-events-none">
        {formattedPrice}
      </p>
    </article>
  );
}
