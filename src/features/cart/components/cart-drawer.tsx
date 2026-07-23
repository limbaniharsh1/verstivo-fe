"use client";

import { X } from "lucide-react";
import { useCart } from "../context/cart-context";
import { EmptyCartState } from "./empty-cart-state";
import { CartItemCard } from "./cart-item-card";

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    totalCount,
    formattedSubtotal,
    editingSizeItemId,
    setEditingSizeItemId,
  } = useCart();

  return (
    <>
      {/* Dimmed Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Slide-over Right Panel Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-full sm:max-w-[480px] md:max-w-[540px] lg:max-w-[560px] 2xl:max-w-[600px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping Cart Drawer"
        aria-modal="true"
        role="dialog"
      >
        {/* Drawer Header */}
        <div className="flex h-[64px] sm:h-[70px] shrink-0 items-center justify-between border-b border-neutral-200 px-3.5 xs:px-5 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="text-[18px] sm:text-[20px] font-semibold text-black tracking-tight">
              Cart
            </span>
            <span className="grid size-5 place-items-center rounded-full bg-[#0000d6] text-[11px] font-bold text-white">
              {totalCount}
            </span>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="p-1 text-black hover:opacity-70 transition-opacity cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X size={22} strokeWidth={1.75} />
          </button>
        </div>

        {/* Drawer Content */}
        {items.length === 0 ? (
          <EmptyCartState />
        ) : (
          <div className="flex flex-1 flex-col justify-between overflow-hidden">
            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-3.5 xs:px-5 sm:px-6 py-2">
              {items.map((item) => (
                <CartItemCard key={item.product.id} item={item} />
              ))}
            </div>

            {/* Cart Summary & Checkout Footer OR Select Size Footer */}
            {editingSizeItemId ? (
              <div className="border-t border-neutral-200 bg-white p-3.5 xs:p-5">
                <button
                  type="button"
                  onClick={() => setEditingSizeItemId(null)}
                  className="w-full h-11 sm:h-12 rounded-full bg-[#b2b5f7] hover:bg-[#0000d6] active:scale-[0.99] text-white font-semibold text-[14px] sm:text-[15px] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                >
                  Select size
                </button>
              </div>
            ) : (
              <div className="border-t border-neutral-200 bg-white p-4 xs:p-5 space-y-3">
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
                  <button
                    type="button"
                    onClick={() => {
                      alert("Proceeding to Checkout!");
                    }}
                    className="w-full h-11 sm:h-12 rounded-full bg-[#0000d6] hover:bg-[#0000b8] active:scale-[0.99] text-white font-medium text-[14px] sm:text-[15px] flex items-center justify-center transition-all cursor-pointer"
                  >
                    Continue to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
