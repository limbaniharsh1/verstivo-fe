"use client";

import React, { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { BestsellerItemCard } from "./bestseller-item-card";
import { useCart } from "../context/cart-context";
import { useAuth } from "@/components/providers/auth-context";

export function EmptyCartState() {
  const { data, isLoading } = useProducts({ limit: 6 });
  const { addItem } = useCart();
  const { user, openAuth } = useAuth();
  
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const productsList = data?.data || [];

  const mappedProducts = productsList.map((prod: any) => {
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

    const sizesList = prod.colorVariants?.[0]?.stockBySize
      ? prod.colorVariants[0].stockBySize.filter((s: any) => s.stock > 0).map((s: any) => s.size)
      : [4, 5, 6, 7, 8, 9, 10];

    return {
      id: prod._id || prod.id,
      slug: prod.slug,
      name: prod.name,
      subtitle: prod.subtitle || "",
      price: prod.price,
      originalPrice: prod.originalPrice,
      formattedPrice: `₹${prod.price.toLocaleString("en-IN")}`,
      formattedOriginalPrice: prod.originalPrice ? `₹${prod.originalPrice.toLocaleString("en-IN")}` : undefined,
      image: prod.colorVariants?.[0]?.images?.[0]?.medium || prod.colorVariants?.[0]?.images?.[0]?.low || prod.colorVariants?.[0]?.images?.[0]?.high || "",
      imageAlt: prod.name,
      defaultColorSlug,
      defaultColorId,
      defaultSize,
      sizes: sizesList,
    };
  });

  const handleAddClick = (product: any) => {
    if (!user) {
      openAuth();
      return;
    }
    // Toggle size selection UI
    setSelectedProductId(selectedProductId === product.id ? null : product.id);
  };

  const handleSizeSelect = (product: any, size: number) => {
    const colorId = product.defaultColorId || "";
    // Build cart item ID
    const itemId = `${product.id}-${colorId}-${size}`;

    addItem({
      id: itemId,
      name: product.name,
      subtitle: `${product.subtitle} · UK ${size}`,
      price: product.price,
      formattedPrice: product.formattedPrice,
      image: product.image,
      imageAlt: product.imageAlt,
    });
  };

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
      {/* Empty State Banner */}
      <div className="space-y-0 tracking-tight">
        <p className="text-[20px] sm:text-[22px] font-semibold tracking-tight leading-[1.2]">
          Your cart is empty.
        </p>
        <p className="text-[20px] sm:text-[22px] font-semibold tracking-tight leading-[1.2]">
          Why not try one of our bestsellers?
        </p>
      </div>

      {/* Bestseller List */}
      <div className="pt-1">
        {isLoading ? (
          <div className="space-y-3 py-4 animate-pulse">
            <div className="h-16 bg-neutral-100 rounded-sm w-full" />
            <div className="h-16 bg-neutral-100 rounded-sm w-full" />
            <div className="h-16 bg-neutral-100 rounded-sm w-full" />
          </div>
        ) : (
          mappedProducts.map((product: any) => (
            <BestsellerItemCard
              key={product.id}
              product={product}
              showSizes={selectedProductId === product.id}
              onAddClick={() => handleAddClick(product)}
              onSizeSelect={(size) => handleSizeSelect(product, size)}
            />
          ))
        )}
      </div>
    </div>
  );
}
