"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { OrderDetailsModal, type OrderDetailsData } from "./order-details-modal";
import { AddReviewModal, type ReviewProductData } from "./add-review-modal";

type OrderFilter = "all" | "active" | "delivered";

interface OrderItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  quantity: number;
  image: string;
}

interface OrderRecord {
  id: string;
  orderNumber: string;
  orderDate: string;
  total: string;
  statusType: "active" | "delivered";
  statusHeading: string;
  statusSubtext?: string;
  details: OrderDetailsData;
  items: OrderItem[];
}

const MOCK_ORDERS: OrderRecord[] = [
  {
    id: "ord-1",
    orderNumber: "303-3504141-6107504",
    orderDate: "9 October 2024",
    total: "$31.62 USD",
    statusType: "active",
    statusHeading: "Arriving Wednesday",
    details: {
      orderNumber: "303-3504141-6107504",
      orderDate: "9 October 2024",
      paymentMethod: {
        brand: "VISA",
        last4: "4242",
      },
      address: {
        name: "Sophie Van den Berg",
        line1: "Keizersgracht 241, 1016 EA Amsterdam, Netherlands",
        cityStateZip: "Noord-Holland 1016 EA",
      },
      deliveryMethod: "Express shipping (2–3 days)",
      subtotal: "₹12,478.00",
      shipping: "Free",
      total: "₹12,478.00",
    },
    items: [
      {
        id: "item-1",
        title: "Florida Soft Footbed",
        subtitle: "FLORIDA SOFT FOOTBED BIRKO-FLOR",
        price: "₹6,293.00",
        quantity: 1,
        image: "/assets/images/florida-soft-footbed.png",
      },
      {
        id: "item-2",
        title: "Florida Soft Footbed",
        subtitle: "FLORIDA SOFT FOOTBED BIRKO-FLOR",
        price: "₹6,293.00",
        quantity: 1,
        image: "/assets/images/florida-soft-footbed.png",
      },
    ],
  },
  {
    id: "ord-2",
    orderNumber: "303-3504141-6107504",
    orderDate: "14 September 2024",
    total: "$31.62 USD",
    statusType: "delivered",
    statusHeading: "Delivered 16 Sept 2024",
    statusSubtext: "Parcel was left in letterbox",
    details: {
      orderNumber: "303-3504141-6107504",
      orderDate: "14 September 2024",
      paymentMethod: {
        brand: "VISA",
        last4: "4242",
      },
      address: {
        name: "Sophie Van den Berg",
        line1: "Keizersgracht 241, 1016 EA Amsterdam, Netherlands",
        cityStateZip: "Noord-Holland 1016 EA",
      },
      deliveryMethod: "Express shipping (2–3 days)",
      subtotal: "₹6,293.00",
      shipping: "Free",
      total: "₹6,293.00",
    },
    items: [
      {
        id: "item-3",
        title: "Florida Soft Footbed",
        subtitle: "FLORIDA SOFT FOOTBED BIRKO-FLOR",
        price: "₹6,293.00",
        quantity: 1,
        image: "/assets/images/florida-soft-footbed.png",
      },
    ],
  },
];

export function OrderHistoryTab() {
  const [filter, setFilter] = useState<OrderFilter>("all");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<OrderDetailsData | null>(null);
  const [reviewProduct, setReviewProduct] = useState<ReviewProductData | null>(null);

  const filteredOrders = MOCK_ORDERS.filter((ord) => {
    if (filter === "all") return true;
    return ord.statusType === filter;
  });

  const handleViewOrder = (order: OrderRecord) => {
    setSelectedOrderDetails(order.details);
  };

  const handleTrackOrder = (orderNumber: string) => {
    toast.success(`Tracking shipment for Order #${orderNumber}`);
  };

  const handleWriteReview = (item: OrderItem) => {
    setReviewProduct({
      title: item.title,
      subtitle: item.subtitle,
      image: item.image,
    });
  };

  if (MOCK_ORDERS.length === 0) {
    return (
      <div className="w-full pt-1">
        <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2 sm:mb-3">
          Order History
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          You haven’t purchased anything from Verstivo yet.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      {/* Sub-Filter Pills (16px font size, 400 weight) */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`px-5 py-2 rounded-full text-[16px] font-medium transition-all cursor-pointer ${
            filter === "all"
              ? "bg-primary text-white shadow-2xs"
              : "bg-[#F8F8F8] text-black hover:bg-slate-200/80"
          }`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setFilter("active")}
          className={`px-5 py-2 rounded-full text-[16px] font-medium transition-all cursor-pointer ${
            filter === "active"
              ? "bg-primary text-white shadow-2xs"
              : "bg-[#F8F8F8] text-black hover:bg-slate-200/80"
          }`}
        >
          Active
        </button>
        <button
          type="button"
          onClick={() => setFilter("delivered")}
          className={`px-5 py-2 rounded-full text-[16px] font-medium transition-all cursor-pointer ${
            filter === "delivered"
              ? "bg-primary text-white shadow-2xs"
              : "bg-[#F8F8F8] text-black hover:bg-slate-200/80"
          }`}
        >
          Delivered
        </button>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-8 sm:p-12 text-center shadow-xs">
          <p className="text-sm font-medium text-slate-500">
            No orders found in this status category.
          </p>
        </div>
      ) : (
        <div className="space-y-5 sm:space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-[#D0D0D0] rounded-2xl overflow-hidden shadow-xs"
            >
              {/* Order Header Summary Bar */}
              <div className="bg-[#F8F8F8] px-5 sm:px-8 py-3.5 sm:py-4 flex flex-wrap items-center justify-between gap-4 sm:gap-6 text-xs">
                <div className="flex items-center gap-8 sm:gap-14">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Order placed:</span>
                    <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                      {order.orderDate}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[11px]">Total:</span>
                    <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                      {order.total}
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-slate-500 block text-[11px]">Order Number:</span>
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                    # {order.orderNumber}
                  </span>
                </div>
              </div>

              {/* Order Body Content (Reduced top and bottom padding) */}
              <div className="px-5 sm:px-8 py-3.5 sm:py-4">
                {/* Status Heading */}
                <div className="mb-2 sm:mb-2.5">
                  <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                    {order.statusHeading}
                  </h4>
                  {order.statusSubtext && (
                    <p className="text-xs text-slate-500 mt-0.5 font-normal">
                      {order.statusSubtext}
                    </p>
                  )}
                </div>

                {/* Items List (Reduced spacing between item rows) */}
                <div className="space-y-2.5">
                  {order.items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      {/* Product Thumbnail & Details */}
                      <div className="flex items-center gap-4">
                        <div className="relative w-[160px] h-[160px] bg-[#F8F8F8] rounded-none flex items-center justify-center shrink-0 border border-slate-100 p-3 overflow-hidden">
                          {/* Quantity Badge (Square shape) */}
                          <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-black text-white text-[12px] font-semibold rounded-sm flex items-center justify-center z-10">
                            {item.quantity}
                          </span>
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={140}
                            height={140}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div>
                          <h5 className="text-[18px] font-semibold text-black">
                            {item.title}
                          </h5>
                          <p className="text-[14px] text-slate-500 tracking-tight uppercase mt-0.5 mb-1">
                            {item.subtitle}
                          </p>
                          <p className="text-[18px] font-semibold text-black mt-4.5">
                            {item.price}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons (Rendered on first item row) */}
                      {idx === 0 && (
                        <div className="flex items-center gap-2.5 self-start sm:self-center mt-2 sm:mt-0">
                          <button
                            type="button"
                            onClick={() => handleViewOrder(order)}
                            className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-black hover:bg-slate-800 text-white text-xs lg:text-[18px] font-medium transition-colors shadow-2xs cursor-pointer"
                          >
                            View Order
                          </button>

                          {order.statusType === "active" ? (
                            <button
                              type="button"
                              onClick={() => handleTrackOrder(order.orderNumber)}
                              className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white text-xs lg:text-[18px] font-medium transition-colors shadow-2xs cursor-pointer"
                            >
                              Track Order
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleWriteReview(item)}
                              className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white text-xs lg:text-[18px] font-medium transition-colors shadow-2xs cursor-pointer"
                            >
                              Write a review
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={Boolean(selectedOrderDetails)}
        onClose={() => setSelectedOrderDetails(null)}
        order={selectedOrderDetails}
      />

      {/* Add Review Modal */}
      <AddReviewModal
        isOpen={Boolean(reviewProduct)}
        onClose={() => setReviewProduct(null)}
        product={reviewProduct}
      />
    </div>
  );
}
