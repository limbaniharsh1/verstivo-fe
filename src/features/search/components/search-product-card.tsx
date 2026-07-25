"use client";

import { BaseProductCard } from "@/components/product/BaseProductCard";
import type { BaseProduct } from "@/types/product";

type SearchProductCardProps = {
  product: BaseProduct;
};

export function SearchProductCard({ product }: SearchProductCardProps) {
  return <BaseProductCard product={product} variant="search" />;
}

