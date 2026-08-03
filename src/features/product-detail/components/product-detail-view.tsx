"use client";

import { useState } from "react";
import { CraftsmanshipSection } from "@/features/home/components/craftsmanship-section";
import { ProductCarousel } from "@/features/home/components/product-carousel";
import { SocialGallery } from "@/features/home/components/social-gallery";
import { TRENDING_PRODUCTS } from "@/features/home/data/trending-products";
import { ProductGallery } from "./product-gallery";
import { ProductInfo } from "./product-info";
import { ProductReviews } from "./product-reviews";
import type { ProductDetailData } from "../data/product-detail-data";

type ProductDetailViewProps = {
  product: ProductDetailData;
};

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const [selectedColorId, setSelectedColorId] = useState(
    product.colors[0]?.id || ""
  );

  const activeColor =
    product.colors.find((c) => c.id === selectedColorId) || product.colors[0];

  const galleryImages =
    activeColor?.galleryImages && activeColor.galleryImages.length > 0
      ? activeColor.galleryImages
      : product.galleryImages.map((img, idx) =>
          idx === 0 && activeColor?.image
            ? { ...img, src: activeColor.image, alt: `${product.name} - ${activeColor.name}` }
            : img
        );

  return (
    <div className="w-full bg-white">
      {/* Product Detail Main Grid Container */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 pt-3 sm:pt-4 lg:pt-6 pb-6 sm:pb-8 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Left Side: Product Gallery (7 cols on lg) */}
          <div className="lg:col-span-7 xl:col-span-7 lg:sticky lg:top-[120px] 3xl:top-[135px]">
            <ProductGallery key={selectedColorId} images={galleryImages} />
          </div>

          {/* Right Side: Product Info (5 cols on lg) */}
          <div className="lg:col-span-5 xl:col-span-5">
            <ProductInfo
              product={product}
              selectedColorId={selectedColorId}
              onSelectColor={setSelectedColorId}
            />
          </div>
        </div>
      </div>

      {/* Crafted for Every Step Section */}
      <div className="w-full">
        <CraftsmanshipSection />
      </div>

      {/* Product Reviews Section */}
      {/* <div className="w-full border-t border-slate-100">
        <ProductReviews />
      </div> */}
      
      {/* Bottom Section: You most loved Carousel */}
      <div className="w-full mt-5 sm:mt-4 pt-2 sm:pt-2">
        <ProductCarousel
          heading="You most loved"
          headingId="you-most-loved-heading"
          products={TRENDING_PRODUCTS}
          showGenderFilter
        />
      </div>

      {/* Social Gallery @pairborn.in Section */}
      <div className="w-full">
        <SocialGallery />
      </div>
    </div>
  );
}
