"use client";

import { BaseProductCard } from "@/components/product/BaseProductCard";
import type { BaseProduct } from "@/types/product";
import { useUser } from "@/hooks/use-user";
import { useWishlistKeys, useToggleWishlist } from "@/hooks/use-wishlist";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/auth-context";

type SearchProductCardProps = {
  product: BaseProduct;
};

export function SearchProductCard({ product }: SearchProductCardProps) {
  const { data: currentUser } = useUser();
  const isLoggedIn = !!currentUser;
  const { openAuth } = useAuth();

  const { data: wishlistKeys } = useWishlistKeys();
  const toggleMutation = useToggleWishlist();

  const isLiked = isLoggedIn
    ? (wishlistKeys || []).some((key) => key.startsWith(product.id + "_"))
    : false;

  const handleToggle = async (liked: boolean) => {
    if (!isLoggedIn) {
      openAuth();
      return;
    }
    const existingKeys = (wishlistKeys || []).filter((key) => key.startsWith(product.id + "_"));
    if (existingKeys.length > 0) {
      for (const key of existingKeys) {
        const parts = key.split("_");
        await toggleMutation.mutateAsync({
          productId: product.id,
          colorId: parts[1],
          size: Number(parts[2]),
        });
      }
    } else {
      await toggleMutation.mutateAsync({
        productId: product.id,
        colorId: "",
        size: 0,
      });
    }
  };

  return (
    <BaseProductCard
      product={product}
      variant="search"
      isWishlistLiked={isLiked}
      onWishlistToggle={handleToggle}
    />
  );
}
