"use client";

import { BestsellerHero } from "@/features/bestsellers/components/bestseller-hero";
import { BestsellerToolbar } from "@/features/bestsellers/components/bestseller-toolbar";
import { BestsellerGrid } from "@/features/bestsellers/components/bestseller-grid";
import { useProducts } from "@/hooks/use-products";
import { ProductGridSkeleton } from "@/components/product/ProductSkeleton";

export default function ShopPageClient() {
  const { data, isLoading, error } = useProducts({ limit: 40 });

  const productsList = data?.data || [];
  const totalCount = data?.pagination?.total || productsList.length;

  // Map backend products to Product interface expected by BestsellerGrid
  const mappedProducts = productsList.map((prod: any) => {
    const bestsellerCollection = prod.collections?.find((c: any) => c.showBadge && c.isActive);
    const newCollection = prod.collections?.find((c: any) => c.showNewBadge && c.isActive);
    
    let badge = undefined;
    if (bestsellerCollection) {
      badge = { label: bestsellerCollection.name, tone: "neutral" }; // white badge
    } else if (newCollection) {
      badge = { label: "NEW", tone: "neutral" }; // white badge
    }

    // If no collection badge is active and discount is available, render discount rate as a blue (primary) badge
    if (!badge && prod.originalPrice && prod.price && prod.originalPrice > prod.price) {
      const discountPct = Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100);
      if (discountPct > 0) {
        badge = { label: `${discountPct}% OFF`, tone: "primary" }; // blue badge
      }
    }

    let defaultColorSlug = "";
    let defaultColorId = "";
    let defaultSize = undefined as number | undefined;

    if (prod.colorVariants) {
      for (const variant of prod.colorVariants) {
        const firstInStockSize = variant.stockBySize?.find((s: any) => s.stock > 0);
        if (firstInStockSize) {
          const colorObj = variant.color;
          defaultColorId = colorObj?._id || colorObj?.id || variant._id;
          defaultColorSlug = colorObj?.slug || colorObj?.name?.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-");
          defaultSize = firstInStockSize.size;
          break;
        }
      }

      if (!defaultColorSlug && prod.colorVariants[0]) {
        const colorObj = prod.colorVariants[0].color;
        defaultColorId = colorObj?._id || colorObj?.id || prod.colorVariants[0]._id;
        defaultColorSlug = colorObj?.slug || colorObj?.name?.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-");
        defaultSize = prod.colorVariants[0].stockBySize?.[0]?.size;
      }
    }

    return {
      id: prod._id || prod.id,
      slug: prod.slug,
      name: prod.name,
      subtitle: prod.subtitle || "",
      price: typeof prod.price === "number" ? `₹${prod.price.toLocaleString("en-IN")}` : String(prod.price),
      originalPrice: prod.originalPrice 
        ? (typeof prod.originalPrice === "number" ? `₹${prod.originalPrice.toLocaleString("en-IN")}` : String(prod.originalPrice))
        : undefined,
      image: prod.colorVariants?.[0]?.images?.[0]?.medium || prod.colorVariants?.[0]?.images?.[0]?.low || prod.colorVariants?.[0]?.images?.[0]?.high || "",
      imageAlt: prod.colorVariants?.[0]?.images?.[0]?.alt || prod.name,
      category: typeof prod.category === "object" ? prod.category?.name : prod.category || "",
      defaultColorSlug,
      defaultColorId,
      defaultSize,
      badge,
    };
  }) as any[];

  return (
    <main className="min-h-screen bg-white">
      <BestsellerHero />
      {isLoading ? (
        <div className="container-main py-10 sm:py-16">
          <ProductGridSkeleton count={8} />
        </div>
      ) : error ? (
        <div className="container-main py-20 text-center text-red-500 font-medium">
          Failed to load products. Please try again later.
        </div>
      ) : (
        <>
          <BestsellerToolbar totalCount={totalCount} />
          <BestsellerGrid products={mappedProducts} />
        </>
      )}
    </main>
  );
}
