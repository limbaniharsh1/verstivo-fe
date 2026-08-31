"use client";

import React from "react";
import { X } from "lucide-react";

export interface OrderDetailsData {
  orderNumber: string;
  orderDate: string;
  paymentMethod: {
    brand: "VISA" | "MASTERCARD" | "AMEX";
    last4: string;
  };
  address: {
    name: string;
    line1: string;
    cityStateZip: string;
  };
  deliveryMethod: string;
  subtotal: string;
  shipping: string;
  total: string;
}

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderDetailsData | null;
}

export function OrderDetailsModal({ isOpen, onClose, order }: OrderDetailsModalProps) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Dark Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centered Modal Container (Wider Box with Darker Divider Borders) */}
      <div className="relative w-full max-w-[740px] sm:max-w-[780px] lg:max-w-[820px] bg-white rounded-none shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-5 sm:px-7 sm:py-6 border-b border-slate-200 flex items-start justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
              Order Details
            </h3>
            <p className="text-sm sm:text-base mt-0.25 font-normal">
              Order Number # {order.orderNumber} was placed on {order.orderDate}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-full text-slate-400 hover:bg-black hover:text-white transition-all duration-300 ease-in-out cursor-pointer shrink-0 ml-4"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Section 1: Info Grid (Payment, Address, Delivery) */}
        <div className="p-6 sm:p-7 border-b grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm">
          {/* Payment Method */}
          <div>
            <h4 className="font-medium mb-2 text-responsive-subtitle">
              Payment method
            </h4>
            <div className="flex items-center gap-3">
              {order.paymentMethod.brand.toLowerCase() === "visa" ? (
                <div className="flex items-center justify-center bg-[#F3F4F6] rounded px-2.5 py-1.5 h-7">
                  <img
                    src="/assets/icons/svg/visa.png"
                    alt="Visa"
                    className="h-3 sm:h-2.5 w-auto object-contain"
                  />
                </div>
              ) : (
                <span className="px-1.5 py-0.5 bg-[#0000C9] text-white font-bold text-[10px] rounded italic tracking-wider">
                  {order.paymentMethod.brand}
                </span>
              )}
              <span className="text-gray-custom font-normal text-responsive-subtitle">
                **** **** **** {order.paymentMethod.last4}
              </span>
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-medium mb-2 text-responsive-subtitle">
              Address
            </h4>
            <p className="text-xs text-gray-custom leading-tight font-normal text-responsive-subtitle">
              <span>{order.address.name}</span>
              <span>{order.address.line1}</span>
              <span>{order.address.cityStateZip}</span>
            </p>
          </div>

          {/* Delivery Method */}
          <div>
            <h4 className="font-medium text-responsive-subtitle mb-2">
              Delivery method
            </h4>
            <p className="text-responsive-subtitle text-gray-custom leading-tight font-normal">
              {order.deliveryMethod}
            </p>
          </div>
        </div>

        {/* Modal Body - Section 2: Pricing Summary */}
        <div className="p-6 sm:p-8">
          <div className="max-w-[340px] ml-auto space-y-3">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="font-medium text-responsive-subtitle">Subtotal</span>
              <span className="font-medium text-responsive-subtitle">{order.subtotal}</span>
            </div>

            {/* Shipping */}
            <div className="flex items-center justify-between text-xs sm:text-sm pb-3 border-b border-slate-200">
              <span className="font-medium text-responsive-subtitle">Shipping</span>
              <span className="font-medium text-responsive-subtitle">{order.shipping}</span>
            </div>

            {/* Total */}
            <div className="flex items-start justify-between">
              <div>
                <span className="font-medium text-responsive-subtitle block">
                  Total
                </span>
                <span className="text-sm sm:text-sm text-slate-400 font-normal block">
                  Including all taxes
                </span>
              </div>
              <span className="font-medium text-responsive-subtitle">
                {order.total}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
