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
          className={`z-10 col-start-1 row-start-1 m-2 min-[400px]:m-2.5 lg:m-2.5 xl:m-3 self-start justify-self-start rounded-full px-2 py-0.5 min-[400px]:px-2.5 min-[400px]:py-1 text-[10px] xl:text-[11px] font-medium shadow-xs ${badgeClassName}`}
        >
          {product.badge.label}
        </span>
      ) : null}

      <button
        type="button"
        className="z-10 col-start-1 row-start-1 m-2 min-[400px]:m-2.5 lg:m-2.5 xl:m-3 grid size-7.5 min-[400px]:size-8 lg:size-8 xl:size-9 cursor-pointer place-items-center self-start justify-self-end rounded-full transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-primary"
        aria-label={`Add ${product.name} to wishlist`}
      >
        <Heart className="size-3.5 min-[400px]:size-4 xl:size-5" strokeWidth={1.6} />
      </button>

      <Image
        src={product.image}
        alt={product.imageAlt}
        width={440}
        height={290}
        sizes="(max-width: 639px) 82vw, (max-width: 1023px) 48vw, 27vw"
        className="z-[1] col-start-1 row-start-1 h-full w-full object-contain px-2 py-6 min-[400px]:px-3 min-[400px]:py-7 lg:py-7 xl:px-4 xl:py-10"
      />

      <button
        type="button"
        className="z-10 col-start-1 row-start-1 m-2 min-[400px]:m-2.5 lg:m-2.5 xl:m-3 flex h-7 min-[400px]:h-7.5 lg:h-7.5 xl:h-8.5 cursor-pointer items-center gap-1 min-[400px]:gap-1.5 self-end justify-self-end rounded-full bg-foreground px-2.5 min-[400px]:px-3 xl:px-3.5 text-[10px] min-[400px]:text-[11px] xl:text-[12px] font-medium text-primary-contrast shadow-sm transition-transform active:scale-95 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label={`Add ${product.name} to cart`}
      >
        <Handbag className="size-3 min-[400px]:size-3.5 xl:size-4" />
        Add
      </button>

      <h3 className="product-title col-start-1 row-start-2 px-3 min-[400px]:px-4 pt-2.5 sm:pt-3 leading-tight font-semibold text-[13px] min-[400px]:text-[14px] xl:text-[16px]">
        {product.name}
      </h3>
      <p className="product-subtitle col-start-1 row-start-3 px-3 min-[400px]:px-4 pt-1 uppercase text-muted text-[10px] min-[400px]:text-[11px] xl:text-[12px]">
        {product.subtitle}
      </p>
      <p className="product-price col-start-1 row-start-4 px-3 min-[400px]:px-4 pt-2 sm:pt-3 pb-3 sm:pb-4 font-semibold text-[13px] min-[400px]:text-[14px] xl:text-[16px]">
        {product.price}
      </p>
    </article>
  );
}
