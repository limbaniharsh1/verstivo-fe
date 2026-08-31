"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { BaseProductCard } from "@/components/product/BaseProductCard";
import { getProductUrl } from "@/lib/product";
import type { BaseProduct } from "@/types/product";
import { useUser } from "@/hooks/use-user";
import {
  useWishlistItems,
  useToggleWishlist,
} from "@/hooks/use-wishlist";
import { useCart } from "@/features/cart";
import { ProductGridSkeleton } from "@/components/product/ProductSkeleton";
import { useAuth } from "@/components/providers/auth-context";

export function WishlistTab() {
  const { data: currentUser } = useUser();
  const isLoggedIn = !!currentUser;
  const { openAuth } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      openAuth();
    }
  }, [isLoggedIn, openAuth]);

  const [page, setPage] = useState(1);
  const { data: wishlistData, isLoading: isLoggedLoading } = useWishlistItems(page, 20);
  const toggleMutation = useToggleWishlist();

  const { addItem } = useCart();

  // Resolve display items
  let displayItems: any[] = [];
  let isLoading = false;

  if (isLoggedIn) {
    displayItems = wishlistData?.data || [];
    isLoading = isLoggedLoading;
  }

  const handleToggle = (item: any) => {
    if (isLoggedIn) {
      toggleMutation.mutate({
        productId: item.productId,
        colorId: item.colorId,
        size: item.size,
      });
      toast.success("Removed from wishlist");
    }
  };

  const handleAddToCart = (item: any) => {
    if (item.stockStatus === "Out of Stock" || item.stock <= 0) {
      toast.error("This variant is currently out of stock");
      return;
    }

    // Map display item format to Cart model
    addItem({
      id: `${item.productId}-${item.colorId}-${item.size}`,
      name: item.name,
      subtitle: `${item.color?.name || ""} (${item.size})`,
      price: item.price,
      formattedPrice: `₹${item.price.toLocaleString("en-IN")}`,
      image: item.image,
      imageAlt: item.name,
    });
    toast.success("Added to cart");
  };

  if (!isLoggedIn) {
    return (
      <div className="w-full text-center py-16 bg-white border border-neutral-100 rounded-lg max-w-md mx-auto mt-10 p-6 shadow-xs flex flex-col items-center">
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          Your Wishlist
        </h3>
        <p className="text-sm text-slate-500 font-normal mb-6">
          Please log in to view and manage your saved items.
        </p>
        <button
          onClick={openAuth}
          className="h-10 px-6 rounded-full bg-primary hover:bg-primary-hover text-white font-medium text-sm transition-all cursor-pointer"
        >
          Log In
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full">
        <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4 sm:mb-6">
          Wishlist
        </h3>
        <ProductGridSkeleton count={4} />
      </div>
    );
  }

  if (displayItems.length === 0) {
    return (
      <div className="w-full pt-1">
        <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2 sm:mb-3">
          Wishlist
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Items added to your Favourites will be saved here.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4 sm:mb-6">
        Wishlist ({displayItems.length})
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5">
        {displayItems.map((item, idx) => {
          const baseProduct: BaseProduct = {
            id: item.productId,
            slug: item.slug,
            name: item.name,
            subtitle: `${item.color?.name || ""} · UK ${item.size}`,
            price: item.price,
            originalPrice: item.originalPrice,
            image: item.image,
            imageAlt: item.name,
            defaultColorId: item.colorId,
            defaultSize: item.size,
          };

          return (
            <BaseProductCard
              key={`${item.productId}-${item.colorId}-${item.size}-${idx}`}
              product={baseProduct}
              variant="default"
              showBadge={true}
              showWishlist={true}
              isWishlistLiked={true}
              onWishlistToggle={() => handleToggle(item)}
              productUrl={getProductUrl(
                { id: item.productId, slug: item.slug },
                { color: item.color?.slug || item.colorId, size: item.size }
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
