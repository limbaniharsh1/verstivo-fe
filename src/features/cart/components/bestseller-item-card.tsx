"use client";

import { BaseProductCard } from "@/components/product/BaseProductCard";
import type { ProductItem } from "../types/cart";

interface BestsellerItemCardProps {
  product: ProductItem;
}

export function BestsellerItemCard({ product }: BestsellerItemCardProps) {
  return (
    <BaseProductCard
      product={{
        ...product,
        price: product.price ?? product.formattedPrice,
      }}
      variant="horizontal"
    />
  );
}

