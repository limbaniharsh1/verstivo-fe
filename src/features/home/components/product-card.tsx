"use client";

import { BaseProductCard } from "@/components/product/BaseProductCard";
import type { BaseProduct } from "@/types/product";

type ProductCardProps = {
  product: BaseProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  return <BaseProductCard product={product} variant="default" />;
}


