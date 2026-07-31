"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";

import { ProductCard } from "@/features/home/components/product-card";
import type { Product } from "@/features/home/data/trending-products";

type ProductCarouselProps = {
  heading: string;
  headingId: string;
  products: readonly Product[];
  showGenderFilter?: boolean;
};

const scrollButtonClassName =
  "absolute top-[33%] sm:top-[34%] z-20 hidden size-9 translate-y-1/2 cursor-pointer place-items-center rounded-full bg-surface shadow-md transition-colors hover:bg-foreground hover:text-primary-contrast active:bg-foreground active:text-primary-contrast focus-visible:bg-foreground focus-visible:text-primary-contrast focus-visible:outline-2 focus-visible:outline-primary sm:grid disabled:opacity-30 disabled:pointer-events-none";

export function ProductCarousel({
  heading,
  headingId,
  products,
  showGenderFilter = false,
}: ProductCarouselProps) {
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);
  const [selectedGender, setSelectedGender] = useState<"men" | "women">("men");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateNavigationState = (swiper: SwiperClass) => {
    setCanScrollLeft(!swiper.isBeginning);
    setCanScrollRight(!swiper.isEnd);
  };

  // Re-evaluate navigation state when products change
  useEffect(() => {
    if (swiperRef) {
      swiperRef.update();
      updateNavigationState(swiperRef);
    }
  }, [products, swiperRef]);

  return (
    <section
      className="bg-surface py-10 w-full overflow-hidden lg:py-12"
      aria-labelledby={headingId}
    >
      <div className="w-full px-5 sm:px-8 lg:px-11">
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
          disabled={!canScrollLeft}
          className={`${scrollButtonClassName} left-2 sm:left-4 lg:left-6`}
          aria-label="View previous products"
          onClick={() => swiperRef?.slidePrev()}
        >
          <ChevronLeft size={20} />
        </button>

        <Swiper
          onSwiper={(swiper) => {
            setSwiperRef(swiper);
            updateNavigationState(swiper);
          }}
          onSlideChange={updateNavigationState}
          onBreakpoint={updateNavigationState}
          onUpdate={updateNavigationState}
          modules={[Navigation]}
          spaceBetween={8}
          slidesPerView={1.5}
          breakpoints={{
            480: {
              slidesPerView: 1.8,
              spaceBetween: 8,
            },
            640: {
              slidesPerView: 2.3,
              spaceBetween: 8,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 8,
            },
            1024: {
              slidesPerView: 3.2,
              spaceBetween: 8,
            },
            1280: {
              slidesPerView: 3.5,
              spaceBetween: 8,
            },
            1650: {
              slidesPerView: 4.5,
              spaceBetween: 8,
            },
          }}
          className="w-full !px-5 sm:!px-8 lg:!px-11 !overflow-visible select-none cursor-grab active:cursor-grabbing"
        >
          {products.map((product) => (
            <SwiperSlide
              key={product.id}
              className="min-w-0 shrink-0 overflow-hidden"
            >
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          disabled={!canScrollRight}
          className={`${scrollButtonClassName} right-2 sm:right-4 md:right-6 lg:right-8`}
          aria-label="View next products"
          onClick={() => swiperRef?.slideNext()}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
