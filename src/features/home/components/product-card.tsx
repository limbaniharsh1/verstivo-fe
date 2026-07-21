import { Heart, Handbag } from "lucide-react";
import Image from "next/image";

import type { Product } from "@/features/home/data/trending-products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const badgeClassName =
    product.badge?.tone === "primary"
      ? "bg-primary text-primary-contrast"
      : "bg-surface text-foreground";

  return (
    <article className="product-card">
      {product.badge ? (
        <span
          className={`z-10 col-start-1 row-start-1 m-4 self-start justify-self-start rounded-full px-3 py-1 text-[12px] font-medium ${badgeClassName}`}
        >
          {product.badge.label}
        </span>
      ) : null}

      <button
        type="button"
        className="z-10 col-start-1 row-start-1 m-4 grid size-10 cursor-pointer place-items-center self-start justify-self-end rounded-full transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-primary"
        aria-label={`Add ${product.name} to wishlist`}
      >
        <Heart size={24} strokeWidth={1.6} />
      </button>

      <Image
        src={product.image}
        alt={product.imageAlt}
        width={440}
        height={290}
        sizes="(max-width: 639px) 82vw, (max-width: 1023px) 48vw, 27vw"
        className="col-start-1 row-start-1 h-full w-full object-contain px-4 py-12"
      />

      <button
        type="button"
        className="z-10 col-start-1 row-start-1 m-4 flex h-11 cursor-pointer items-center gap-2 self-end justify-self-end rounded-full bg-foreground px-3 text-[16px] text-primary-contrast transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label={`Add ${product.name} to cart`}
      >
        <Handbag size={18} />
        Add
      </button>

      <h3 className="product-title col-start-1 row-start-2 px-4 pt-4 leading-tight font-semibold">
        {product.name}
      </h3>
      <p className="product-subtitle col-start-1 row-start-3 px-4 pt-1 uppercase text-muted">
        {product.subtitle}
      </p>
      <p className="product-price col-start-1 row-start-4 px-4 pt-4 pb-4 font-semibold">
        {product.price}
      </p>
    </article>
  );
}
