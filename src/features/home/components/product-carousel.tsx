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
  "absolute top-[33%] sm:top-[34%] z-20 hidden size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-surface shadow-md transition-colors hover:bg-foreground hover:text-primary-contrast active:bg-foreground active:text-primary-contrast focus-visible:bg-foreground focus-visible:text-primary-contrast focus-visible:outline-2 focus-visible:outline-primary sm:grid";

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
      className="bg-surface py-10 pl-5 pr-0 w-full overflow-hidden sm:pl-8 lg:pl-11 lg:py-12"
      aria-labelledby={headingId}
    >
      <div className="w-full pr-5 sm:pr-8 lg:pr-11">
        <div className="mb-4 min-[375px]:mb-5 sm:mb-6 flex flex-col gap-3 min-[425px]:flex-row min-[425px]:items-center min-[425px]:justify-between sm:gap-4">
          <h2
            id={headingId}
            className="text-[20px] min-[375px]:text-[22px] sm:text-[28px] md:text-[32px] lg:text-[34px] leading-tight font-semibold tracking-[-0.02em] text-foreground"
          >
            {heading}
          </h2>

          {showGenderFilter ? (
            <div className="flex shrink-0 items-center gap-2 sm:gap-2.5" aria-label="Filter products by gender">
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
                        ? "inline-flex h-8 min-[375px]:h-8.5 sm:h-9 items-center justify-center rounded-full bg-foreground px-4 min-[375px]:px-4.5 sm:px-5 text-[11.5px] min-[375px]:text-[12px] sm:text-[12.5px] lg:text-[13px] font-semibold capitalize text-primary-contrast transition-all shadow-xs border border-foreground"
                        : "inline-flex h-8 min-[375px]:h-8.5 sm:h-9 items-center justify-center rounded-full border border-border bg-surface px-4 min-[375px]:px-4.5 sm:px-5 text-[11.5px] min-[375px]:text-[12px] sm:text-[12.5px] lg:text-[13px] font-medium capitalize text-foreground transition-all hover:border-foreground/50 hover:bg-surface-muted"
                    }
                  >
                    {gender}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>

      <div className="relative w-full">
        <button
          type="button"
          className={`${scrollButtonClassName} left-0 sm:-left-4`}
          aria-label="View previous products"
          onClick={() => scrollProducts("previous")}
        >
          <ChevronLeft size={20} />
        </button>

        <ul
          ref={productListRef}
          className="scrollbar-hidden flex snap-x snap-mandatory gap-2 overflow-x-auto pr-0"
        >
          {products.map((product) => (
            <li
              key={product.id}
              className="min-w-0 shrink-0 basis-[74%] min-[480px]:basis-[56%] sm:basis-[42%] md:basis-[30%] lg:basis-[26.8%] snap-start overflow-hidden"
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={`${scrollButtonClassName} right-2 sm:right-4 md:right-6 lg:right-8`}
          aria-label="View next products"
          onClick={() => scrollProducts("next")}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
