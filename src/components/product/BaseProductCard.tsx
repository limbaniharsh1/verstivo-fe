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
import { AddButton } from "./AddButton";
import type { BaseProduct } from "@/types/product";
import { getProductUrl } from "@/lib/product";
import { useAuth } from "@/components/providers/auth-context";

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
  const { openSizeDrawer } = useCart();
  const { user, openAuth } = useAuth();
  const [isAdded, setIsAdded] = useState(false);

  const productUrl = customUrl || getProductUrl(product);

  const formattedPrice = formatDisplayPrice(product.price);
  const formattedOriginalPrice = product.originalPrice ? formatDisplayPrice(product.originalPrice) : undefined;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      openAuth();
      return;
    }

    openSizeDrawer(product);
  };


  if (variant === "horizontal") {
    return (
      <div className="flex items-center justify-between gap-3 sm:gap-4 py-1">
        <Link
          href={productUrl}
          className="group relative size-[90px] xs:size-[100px] sm:size-[110px] shrink-0 overflow-hidden bg-[#f4f4f4] rounded-sm flex items-center justify-center cursor-pointer"
        >
          <Image
            src={product.image || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
            alt={product.imageAlt}
            width={110}
            height={110}
            className={`object-contain p-1.5 sm:p-2 transition-opacity duration-300 ${
              product.hoverImage ? "group-hover:opacity-0" : ""
            }`}
          />
          {product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt={product.imageAlt}
              width={110}
              height={110}
              className="absolute object-contain p-1.5 sm:p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
        </Link>

        <Link href={productUrl} className="flex-1 min-w-0 pr-1 sm:pr-2 cursor-pointer">
          <h4 className="text-responsive-lg font-semibold text-black tracking-tight line-clamp-1 hover:underline">
            {product.name}
          </h4>
          <p className="text-responsive-subtitle font-medium text-neutral-500 uppercase tracking-normal mt-0.5 mb-2 line-clamp-1">
            {product.subtitle}
          </p>
          <p className="text-responsive-lg font-bold text-black">
            {formattedPrice}
          </p>
        </Link>

        <div className="shrink-0 flex items-center justify-end w-[72px] min-[375px]:w-[78px] sm:w-[85px] md:w-[90px] xl:w-[100px]">
          <AddButton
            isAdded={isAdded}
            onClick={handleAddToCart}
            className={`group/btn flex h-6.5 sm:h-7.5 md:h-7.5 xl:h-9 cursor-pointer items-center justify-center rounded-full px-2.5 min-[375px]:px-3 md:px-3.5 xl:px-4.5 text-responsive-lg font-medium shadow-sm transition-all only-border-hover ${
              isAdded
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-black text-white hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            }`}
            ariaLabel={`Add ${product.name} to cart`}
          />
        </div>
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
              src={product.image || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
              alt={product.imageAlt}
              width={320}
              height={220}
              sizes="(max-width: 640px) 240px, 300px"
              className={`max-h-full w-auto object-contain transition-opacity duration-300 ${
                product.hoverImage ? "group-hover:opacity-0" : ""
              }`}
            />
            {product.hoverImage && (
              <Image
                src={product.hoverImage}
                alt={product.imageAlt}
                width={320}
                height={220}
                sizes="(max-width: 640px) 240px, 300px"
                className="absolute max-h-full w-auto object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="absolute bottom-2.5 right-2.5 z-10 flex h-7 sm:h-7.5 items-center justify-center rounded-full bg-black px-3.5 sm:px-4 text-[11px] sm:text-[12px] font-medium text-white shadow-xs transition-all hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-primary"
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

      <Link href={productUrl} className="z-[1] col-start-1 row-start-1 h-full w-full relative overflow-hidden">
        <Image
          src={product.image || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
          alt={product.imageAlt}
          width={440}
          height={290}
          sizes="(max-width: 639px) 76vw, (max-width: 767px) 46vw, (max-width: 1023px) 32vw, 25vw"
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            product.hoverImage ? "group-hover:opacity-0" : ""
          }`}
        />
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt={product.imageAlt}
            width={440}
            height={290}
            sizes="(max-width: 639px) 76vw, (max-width: 767px) 46vw, (max-width: 1023px) 32vw, 25vw"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
      </Link>

      <AddButton
        onClick={handleAddToCart}
        className="group/btn z-10 col-start-1 row-start-1 m-1.5 min-[375px]:m-2 sm:m-2.5 lg:m-3 flex h-7.75 xl:h-9 cursor-pointer items-center justify-center rounded-full bg-foreground px-4.5 text-responsive-lg font-medium text-primary-contrast shadow-sm transition-all hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary self-end justify-self-end"
        ariaLabel={`Add ${product.name} to cart`}
      />

      <h3 className="product-title col-start-1 row-start-2 px-2 min-[375px]:px-2.5 sm:px-3.5 md:px-4 pt-1.5 sm:pt-2.5 xl:pt-4 leading-tight font-semibold text-responsive-lg truncate pointer-events-none" title={product.name}>
        {product.name}
      </h3>
      <p className="product-subtitle col-start-1 row-start-3 px-2 min-[375px]:px-2.5 sm:px-3.5 md:px-4 pt-0.5 3xl:pt-1 uppercase text-muted text-responsive-subtitle line-clamp-2 pointer-events-none font-medium" title={product.subtitle}>
        {product.subtitle}
      </p>
      <p className="product-price col-start-1 row-start-4 px-2 min-[375px]:px-2.5 sm:px-3.5 md:px-4 pt-1 sm:pt-1.5 xl:pt-4 pb-2.5 sm:pb-3.5 font-semibold text-responsive-lg pointer-events-none flex flex-wrap items-center gap-1.5 sm:gap-2">
        {formattedOriginalPrice && (
          <span className="line-through text-muted font-normal">
            {formattedOriginalPrice}
          </span>
        )}
        <span className="text-foreground">{formattedPrice}</span>
      </p>
    </article>
  );
}
