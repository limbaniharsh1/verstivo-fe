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
        <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-slate-200 flex items-start justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
              Order Details
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
              Order Number # {order.orderNumber} was placed on {order.orderDate}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg cursor-pointer shrink-0 ml-4"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Section 1: Info Grid (Payment, Address, Delivery) */}
        <div className="p-6 sm:p-8 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm">
          {/* Payment Method */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">
              Payment method
            </h4>
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 bg-[#0000C9] text-white font-bold text-[10px] rounded italic tracking-wider">
                {order.paymentMethod.brand}
              </span>
              <span className="text-slate-700 font-medium text-xs sm:text-sm">
                **** **** **** {order.paymentMethod.last4}
              </span>
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">
              Address
            </h4>
            <div className="text-xs text-slate-600 leading-relaxed font-normal space-y-0.5">
              <p className="font-medium text-slate-800">{order.address.name}</p>
              <p>{order.address.line1}</p>
              <p>{order.address.cityStateZip}</p>
            </div>
          </div>

          {/* Delivery Method */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">
              Delivery method
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {order.deliveryMethod}
            </p>
          </div>
        </div>

        {/* Modal Body - Section 2: Pricing Summary */}
        <div className="p-6 sm:p-8">
          <div className="max-w-[340px] ml-auto space-y-3">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="font-semibold text-slate-900">Subtotal</span>
              <span className="font-semibold text-slate-900">{order.subtotal}</span>
            </div>

            {/* Shipping */}
            <div className="flex items-center justify-between text-xs sm:text-sm pb-3 border-b border-slate-200">
              <span className="font-semibold text-slate-900">Shipping</span>
              <span className="font-semibold text-slate-900">{order.shipping}</span>
            </div>

            {/* Total */}
            <div className="flex items-start justify-between pt-1">
              <div>
                <span className="font-semibold text-slate-900 text-sm sm:text-base block">
                  Total
                </span>
                <span className="text-[11px] text-slate-400 font-normal block mt-0.5">
                  Including all taxes
                </span>
              </div>
              <span className="font-semibold text-slate-900 text-sm sm:text-base">
                {order.total}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
