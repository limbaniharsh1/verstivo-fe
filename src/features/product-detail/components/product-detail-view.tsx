"use client";

import { CraftsmanshipSection } from "@/features/home/components/craftsmanship-section";
import { ProductCarousel } from "@/features/home/components/product-carousel";
import { SocialGallery } from "@/features/home/components/social-gallery";
import { TRENDING_PRODUCTS } from "@/features/home/data/trending-products";
import { ProductGallery } from "./product-gallery";
import { ProductInfo } from "./product-info";
import type { ProductDetailData } from "../data/product-detail-data";

type ProductDetailViewProps = {
  product: ProductDetailData;
};

export function ProductDetailView({ product }: ProductDetailViewProps) {
  return (
    <div className="w-full bg-white">
      {/* Product Detail Main Grid Container */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Left Side: Product Gallery (7 cols on lg) */}
          <div className="lg:col-span-7 xl:col-span-7">
            <ProductGallery images={product.galleryImages} />
          </div>

          {/* Right Side: Product Info (5 cols on lg) */}
          <div className="lg:col-span-5 xl:col-span-5">
            <ProductInfo product={product} />
          </div>
        </div>
      </div>

      {/* Crafted for Every Step Section */}
      <div className="w-full">
        <CraftsmanshipSection />
      </div>
      
      {/* Bottom Section: You most loved Carousel */}
      <div className="w-full mt-5 sm:mt-4 pt-2 sm:pt-2">
        <ProductCarousel
          heading="You most loved"
          headingId="you-most-loved-heading"
          products={TRENDING_PRODUCTS}
          showGenderFilter
        />
      </div>

      {/* Social Gallery @verstivo.in Section */}
      <div className="w-full">
        <SocialGallery />
      </div>
    </div>
  );
}
