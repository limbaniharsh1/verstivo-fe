"use client";

import { useState } from "react";
import { toast } from "sonner";
import { BaseProductCard } from "@/components/product/BaseProductCard";
import type { BaseProduct } from "@/types/product";

const INITIAL_WISHLIST_PRODUCTS: BaseProduct[] = [
  {
    id: "florida-soft-footbed-1",
    name: "Florida Soft Footbed",
    subtitle: "FLORIDA SOFT FOOTBED BIRKO-FLOR",
    price: "₹6,293.00",
    image: "/assets/images/florida-soft-footbed.png",
    imageAlt: "Florida Soft Footbed",
    badge: "Bestseller",
  },
  {
    id: "florida-soft-footbed-2",
    name: "Florida Soft Footbed",
    subtitle: "FLORIDA SOFT FOOTBED BIRKO-FLOR",
    price: "₹6,293.00",
    image: "/assets/images/florida-soft-footbed.png",
    imageAlt: "Florida Soft Footbed",
    badge: "Bestseller",
  },
  {
    id: "florida-soft-footbed-3",
    name: "Florida Soft Footbed",
    subtitle: "FLORIDA SOFT FOOTBED BIRKO-FLOR",
    price: "₹6,293.00",
    image: "/assets/images/florida-soft-footbed.png",
    imageAlt: "Florida Soft Footbed",
    badge: "Bestseller",
  },
  {
    id: "florida-soft-footbed-4",
    name: "Florida Soft Footbed",
    subtitle: "FLORIDA SOFT FOOTBED BIRKO-FLOR",
    price: "₹6,293.00",
    image: "/assets/images/florida-soft-footbed.png",
    imageAlt: "Florida Soft Footbed",
    badge: "Bestseller",
  },
];

export function WishlistTab() {
  const [products, setProducts] = useState<BaseProduct[]>(INITIAL_WISHLIST_PRODUCTS);

  const handleRemoveProduct = (productId: string, productName: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    toast.success(`${productName} removed from Wishlist`);
  };

  if (products.length === 0) {
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
      {/* 4 products per row, non-rounded border corners, gap-1.5 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5">
        {products.map((product) => (
          <BaseProductCard
            key={product.id}
            product={product}
            variant="default"
            showBadge={true}
            showWishlist={true}
            isWishlistLiked={true}
            onWishlistToggle={(liked) => {
              if (!liked) {
                handleRemoveProduct(product.id, product.name);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
