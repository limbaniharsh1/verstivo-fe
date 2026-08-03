"use client";

import { Drawer } from "@/components/common/Drawer";
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

  const titleNode = (
    <div className="flex items-center gap-2">
      <span className="text-[18px] sm:text-[20px] font-semibold text-black tracking-tight">
        Cart
      </span>
      <span className="grid size-5 place-items-center rounded-full bg-[#0000d6] text-[11px] font-bold text-white">
        {totalCount}
      </span>
    </div>
  );

  return (
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
    </Drawer>
  );
}

