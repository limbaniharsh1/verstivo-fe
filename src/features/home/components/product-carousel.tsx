"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

import { ProductCard } from "@/features/home/components/product-card";
import type { Product } from "@/features/home/data/trending-products";

type ProductCarouselProps = {
  heading: string;
  headingId: string;
  products: readonly Product[];
  showGenderFilter?: boolean;
};

const scrollButtonClassName =
  "absolute top-[132px] z-20 hidden size-9 place-items-center rounded-full bg-surface shadow-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-primary sm:grid";

export function ProductCarousel({
  heading,
  headingId,
  products,
  showGenderFilter = false,
}: ProductCarouselProps) {
  const productListRef = useRef<HTMLUListElement>(null);
  const [selectedGender, setSelectedGender] = useState<"men" | "women">("men");

  const scrollProducts = (direction: "previous" | "next") => {
    const productList = productListRef.current;

    if (!productList) {
      return;
    }

    productList.scrollBy({
      left: direction === "next" ? productList.clientWidth * 0.75 : -productList.clientWidth * 0.75,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="bg-surface px-5 py-10 sm:px-8 lg:px-11 lg:py-12"
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <h2
            id={headingId}
            className="text-[24px] leading-tight font-semibold tracking-[-0.03em] sm:text-[28px]"
          >
            {heading}
          </h2>

          {showGenderFilter ? (
            <div className="flex shrink-0 items-center gap-2" aria-label="Filter products by gender">
              {(["men", "women"] as const).map((gender) => {
                const isSelected = selectedGender === gender;

                return (
                  <button
                    key={gender}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedGender(gender)}
                    className={
                      isSelected
                        ? "min-h-9 rounded-full bg-foreground px-5 text-[11px] capitalize text-primary-contrast"
                        : "min-h-9 rounded-full border border-foreground bg-surface px-5 text-[11px] capitalize text-foreground transition-colors hover:bg-surface-muted"
                    }
                  >
                    {gender}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="relative">
          <button
            type="button"
            className={`${scrollButtonClassName} -left-4`}
            aria-label="View previous products"
            onClick={() => scrollProducts("previous")}
          >
            <ChevronLeft size={20} />
          </button>

          <ul
            ref={productListRef}
            className="scrollbar-hidden flex snap-x snap-mandatory gap-0.5 overflow-x-auto"
          >
            {products.map((product) => (
              <li
                key={product.id}
                className="min-w-0 shrink-0 basis-[82%] snap-start sm:basis-[48%] lg:basis-[27%] xl:basis-[24%]"
              >
                <ProductCard product={product} />
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={`${scrollButtonClassName} -right-4`}
            aria-label="View next products"
            onClick={() => scrollProducts("next")}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
