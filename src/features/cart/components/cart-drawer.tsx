"use client";

import { useState } from "react";
import { Drawer } from "@/components/common/Drawer";
import { useCart } from "../context/cart-context";
import { EmptyCartState } from "./empty-cart-state";
import { CartItemCard } from "./cart-item-card";
import { useAuth } from "@/components/providers/auth-context";
import { CheckoutModal } from "@/features/checkout/components/CheckoutModal";

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    totalCount,
    formattedSubtotal,
  } = useCart();
  const { user, openAuth } = useAuth();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const titleNode = (
    <div className="flex items-center gap-2">
      <span className="text-[18px] sm:text-[20px] font-semibold text-black tracking-tight">
        Cart
      </span>
      <span className="grid size-5 place-items-center rounded-full bg-primary text-[11px] font-bold text-white">
        {totalCount}
      </span>
    </div>
  );

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={closeCart}
        title={titleNode}
        position="right"
        headerClassName="h-[64px] sm:h-[70px] shrink-0 border-b border-neutral-200 px-3.5 xs:px-5 sm:px-6"
        bodyClassName="flex flex-col flex-1 overflow-hidden"
        closeButtonAriaLabel="Close cart drawer"
      >
        {items.length === 0 ? (
          <EmptyCartState />
        ) : (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Scrollable Items List */}
            <div className="flex-1 overflow-y-auto px-4 xs:px-5 sm:px-6 divide-y divide-neutral-200/60">
              {items.map((item) => (
                <CartItemCard
                  key={item.product.id}
                  item={item}
                />
              ))}
            </div>

            {/* Bottom Summary & Actions */}
            {items.length > 0 && (
              <div className="p-4 sm:p-6 border-t border-neutral-200 bg-white space-y-3 shrink-0">
                {/* Subtotal Row */}
                <div className="flex items-center justify-between text-[15px] sm:text-[16px]">
                  <span className="text-black font-semibold">Subtotal</span>
                  <span className="text-black font-medium">{formattedSubtotal}</span>
                </div>

                {/* Shipping Row */}
                <div className="flex items-center justify-between text-[15px] sm:text-[16px]">
                  <span className="text-black font-semibold">Shipping</span>
                  <span className="text-black font-medium">Free</span>
                </div>

                {/* Separator Line */}
                <div className="border-t border-neutral-200/90 my-2" />

                {/* Total Row */}
                <div className="flex items-start justify-between pt-0.5">
                  <div>
                    <span className="text-[15px] sm:text-[16px] font-bold text-black block leading-none">
                      Total
                    </span>
                    <span className="text-[11px] sm:text-[12px] text-neutral-600 font-normal block mt-1">
                      Including all taxes
                    </span>
                  </div>
                  <span className="text-[15px] sm:text-[16px] font-bold text-black">
                    {formattedSubtotal}
                  </span>
                </div>

                {/* Continue to Checkout Button */}
                <div className="pt-1.5 sm:pt-2">
                  {(() => {
                    const hasEligibleItems = items.some((item) => {
                      const isAvailable = item.product.isAvailable ?? ((item.product.stock ?? 1) > 0);
                      const hasSufficient = item.product.hasSufficientStock ?? (isAvailable && (item.product.stock ?? 0) >= item.quantity);
                      return isAvailable && hasSufficient;
                    });

                    return (
                      <button
                        type="button"
                        disabled={!hasEligibleItems}
                        onClick={() => {
                          if (!user) {
                            closeCart();
                            openAuth();
                          } else {
                            closeCart();
                            setIsCheckoutModalOpen(true);
                          }
                        }}
                        className={`w-full h-11 sm:h-12 rounded-full font-medium text-[14px] sm:text-[15px] flex items-center justify-center transition-all ${
                          hasEligibleItems
                            ? "bg-primary text-white !text-white hover:bg-primary-hover active:scale-[0.99] cursor-pointer"
                            : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                        }`}
                      >
                        {hasEligibleItems ? "Continue to Checkout" : "Out of Stock"}
                      </button>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        )}
      </Drawer>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />
    </>
  );
}
