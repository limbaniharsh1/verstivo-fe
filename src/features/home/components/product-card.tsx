import { Heart } from "lucide-react";
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
    <article className="product-card group relative">
      {product.badge ? (
        <span
          className={`z-10 col-start-1 row-start-1 m-2 min-[375px]:m-2.5 sm:m-3 self-start justify-self-start rounded-full px-2 py-0.5 text-[9.5px] min-[375px]:text-[10px] sm:text-[10.5px] md:text-[11px] font-medium shadow-xs ${badgeClassName}`}
        >
          {product.badge.label}
        </span>
      ) : null}

      <button
        type="button"
        className="z-10 col-start-1 row-start-1 m-2 min-[375px]:m-2.5 sm:m-3 grid size-7 sm:size-7.5 md:size-8 lg:size-8.5 xl:size-9 cursor-pointer place-items-center self-start justify-self-end rounded-full transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-primary"
        aria-label={`Add ${product.name} to wishlist`}
      >
        <Heart className="size-4 min-[375px]:size-5 sm:size-4.5 lg:size-5.5" strokeWidth={1.6} />
      </button>

      <Image
        src={product.image}
        alt={product.imageAlt}
        width={440}
        height={290}
        sizes="(max-width: 639px) 76vw, (max-width: 767px) 46vw, (max-width: 1023px) 32vw, 25vw"
        className="z-[1] col-start-1 row-start-1 h-full w-full object-contain px-2.5 pt-2 pb-8 min-[375px]:px-3 min-[375px]:pt-3 min-[375px]:pb-8.5 sm:px-4 sm:py-6 md:px-4 md:py-7 lg:py-8 xl:px-6 xl:py-9 transition-transform duration-300 group-hover:scale-105"
      />

      <button
        type="button"
        className="z-10 col-start-1 row-start-1 m-1.5 min-[375px]:m-2 sm:m-2.5 lg:m-3 flex h-6 min-[375px]:h-6.5 sm:h-7 md:h-7.5 cursor-pointer items-center justify-center rounded-full bg-foreground px-2.5 min-[375px]:px-3 md:px-3.5 text-[10px] min-[375px]:text-[10.5px] sm:text-[11px] md:text-[11.5px] lg:text-[12px] font-medium text-primary-contrast shadow-sm transition-all active:scale-95 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary self-end justify-self-end"
        aria-label={`Add ${product.name} to cart`}
      >
        Add
      </button>

      <h3 className="product-title col-start-1 row-start-2 px-2 min-[375px]:px-2.5 sm:px-3.5 md:px-4 pt-1.5 sm:pt-2.5 leading-tight font-semibold text-[11px] min-[375px]:text-[11.5px] sm:text-[12.5px] md:text-[13px] lg:text-[14px] truncate" title={product.name}>
        {product.name}
      </h3>
      <p className="product-subtitle col-start-1 row-start-3 px-2 min-[375px]:px-2.5 sm:px-3.5 md:px-4 pt-0.5 uppercase text-muted text-[9px] min-[375px]:text-[9.5px] sm:text-[10px] md:text-[10.5px] lg:text-[11px] truncate" title={product.subtitle}>
        {product.subtitle}
      </p>
      <p className="product-price col-start-1 row-start-4 px-2 min-[375px]:px-2.5 sm:px-3.5 md:px-4 pt-1 sm:pt-1.5 pb-2.5 sm:pb-3.5 font-semibold text-[11px] min-[375px]:text-[11.5px] sm:text-[12.5px] md:text-[13px] lg:text-[14px]">
        {product.price}
      </p>
    </article>
  );
}

