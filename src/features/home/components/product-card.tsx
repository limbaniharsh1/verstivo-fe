import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";

import type { Product } from "@/features/home/data/trending-products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const badgeClassName =
    product.badge.tone === "primary"
      ? "bg-primary text-primary-contrast"
      : "bg-surface text-foreground";

  return (
    <article>
      <div className="relative h-[265px] overflow-hidden bg-surface-muted sm:h-[280px]">
        <span
          className={`absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-[9px] font-medium ${badgeClassName}`}
        >
          {product.badge.label}
        </span>

        <button
          type="button"
          className="absolute top-3.5 right-4 z-10 grid size-8 place-items-center rounded-full transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-primary"
          aria-label={`Add ${product.name} to wishlist`}
        >
          <Heart size={19} strokeWidth={1.6} />
        </button>

        <div className="absolute inset-x-3 top-11 bottom-8">
          <Image
            src={product.image}
            alt={`${product.name} sandals in taupe`}
            fill
            sizes="(max-width: 640px) 75vw, (max-width: 1024px) 45vw, 28vw"
            className="object-contain"
          />
        </div>

        <button
          type="button"
          className="absolute right-3 bottom-3 z-10 flex h-8 items-center gap-1.5 rounded-full bg-foreground px-3 text-[11px] text-primary-contrast transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag size={14} aria-hidden="true" />
          Add
        </button>
      </div>

      <div className="px-1 pt-3 pb-1">
        <h3 className="text-[13px] leading-tight font-semibold">{product.name}</h3>
        <p className="mt-1 text-[9px] uppercase text-muted">{product.subtitle}</p>
        <p className="mt-4 text-[13px] font-semibold">{product.price}</p>
      </div>
    </article>
  );
}
