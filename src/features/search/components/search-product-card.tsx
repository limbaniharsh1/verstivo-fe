"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/features/cart";

import type { SearchProduct } from "@/features/search/data/search-data";

type SearchProductCardProps = {
  product: SearchProduct;
};

export function SearchProductCard({ product }: SearchProductCardProps) {
  const { addItem } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const productUrl = `/products/${product.id || "arizona-soft-footbed"}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const numericPrice = parseInt(product.price.replace(/[^0-9]/g, ""), 10) || 7693;
    addItem({
      id: product.id || product.name.toLowerCase().replace(/\s+/g, "-"),
      name: product.name,
      subtitle: product.subtitle,
      price: numericPrice,
      formattedPrice: product.price,
      image: product.image,
      imageAlt: product.imageAlt,
    });
  };

  return (
    <article className="group relative flex flex-col w-full min-w-[220px] max-w-[280px] sm:min-w-[250px] sm:max-w-[300px] shrink-0 select-none cursor-pointer">
      <Link href={productUrl} className="absolute inset-0 z-0" aria-label={`View details for ${product.name}`} />

      {/* Image Container with Badges & Action Buttons */}
      <div className="relative aspect-[1.15/1] w-full rounded-md bg-surface-muted p-3 min-[400px]:p-4 flex items-center justify-center overflow-hidden transition-all duration-200 group-hover:bg-[#ededed]">
        {/* Badge */}
        {product.badge ? (
          <span className="absolute top-2.5 left-2.5 z-10 rounded-full bg-white px-2.5 py-1 text-[10px] sm:text-[11px] font-medium text-foreground shadow-xs pointer-events-none">
            {product.badge}
          </span>
        ) : null}

        {/* Wishlist Heart Icon */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsLiked((prev) => !prev);
          }}
          className="absolute top-2.5 right-2.5 z-10 grid size-7 sm:size-8 place-items-center rounded-full bg-transparent text-foreground transition-all hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-primary"
          aria-label={`Add ${product.name} to wishlist`}
        >
          <Heart
            className={`size-4 sm:size-4.5 transition-colors ${
              isLiked ? "fill-red-500 text-red-500" : "text-foreground"
            }`}
            strokeWidth={1.5}
          />
        </button>

        {/* Product Image */}
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

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="absolute bottom-2.5 right-2.5 z-10 flex h-7 sm:h-7.5 items-center justify-center rounded-full bg-black px-3.5 sm:px-4 text-[11px] sm:text-[12px] font-medium text-white shadow-xs transition-all hover:bg-neutral-800 active:scale-95 focus-visible:outline-2 focus-visible:outline-primary"
          aria-label={`Add ${product.name} to cart`}
        >
          Add
        </button>
      </div>

      {/* Product Details */}
      <div className="pt-2.5 pb-1 px-0.5">
        <h3 className="text-[13px] sm:text-[14px] font-semibold text-foreground truncate leading-tight pointer-events-none">
          {product.name}
        </h3>
        <p className="text-[10px] sm:text-[11px] font-medium uppercase text-muted truncate mt-0.5 pointer-events-none">
          {product.subtitle}
        </p>
        <p className="text-[13px] sm:text-[14px] font-bold text-foreground mt-1.5 pointer-events-none">
          {product.price}
        </p>
      </div>
    </article>
  );
}
