"use client";

import { BESTSELLER_PRODUCTS } from "../data/bestsellers-data";
import { BestsellerItemCard } from "./bestseller-item-card";

export function EmptyCartState() {
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
        {BESTSELLER_PRODUCTS.map((product) => (
          <BestsellerItemCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
