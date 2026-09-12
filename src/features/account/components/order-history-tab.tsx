"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { apiClient } from "@/lib/api-client";
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
  rawTotal: number;
  statusType: "active" | "delivered";
  statusHeading: string;
  statusSubtext?: string;
  paymentMethod: "PREPAID" | "COD";
  paymentStatus: "Pending" | "PartiallyPaid" | "Paid" | "Failed";
  totalAmountFormatted: string;
  paidAmountFormatted: string;
  dueAmountFormatted: string;
  isCodPartiallyPaid: boolean;
  isPrepaidPaid: boolean;
  details: OrderDetailsData;
  items: OrderItem[];
}

export function OrderHistoryTab() {
  const [filter, setFilter] = useState<OrderFilter>("all");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<OrderDetailsData | null>(null);
  const [reviewProduct, setReviewProduct] = useState<ReviewProductData | null>(null);

  const { data: ordersResponse, isLoading, error } = useQuery({
    queryKey: ["user-orders"],
    queryFn: async () => {
      const res = await apiClient.get<any>("/orders/me");
      return res.data || [];
    },
  });

  const rawOrders: any[] = Array.isArray(ordersResponse) ? ordersResponse : [];

  // Filter out pending, abandoned, or failed orders for users
  const confirmedRawOrders = rawOrders.filter(
    (ord: any) => ord.paymentStatus === "Paid" || ord.paymentStatus === "PartiallyPaid"
  );

  const orders: OrderRecord[] = confirmedRawOrders.map((ord: any) => {
    const isDelivered = ord.fulfillmentStatus === "Delivered";
    const statusType: "active" | "delivered" = isDelivered ? "delivered" : "active";

    const createdDate = ord.createdAt ? new Date(ord.createdAt) : new Date();
    const formattedDate = createdDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    let statusHeading = "Processing Order";
    if (ord.fulfillmentStatus === "Shipped") {
      statusHeading = "Shipped · On the way";
    } else if (ord.fulfillmentStatus === "Delivered") {
      statusHeading = "Delivered";
    }

    const orderNumber = ord._id?.toString() || "";
    const displayTotal = `₹${(ord.totalAmount || 0).toLocaleString("en-IN")}.00`;
    const subtotal = `₹${(ord.subtotal || ord.totalAmount || 0).toLocaleString("en-IN")}.00`;

    const mappedItems: OrderItem[] = (ord.items || []).map((item: any, idx: number) => {
      const sizeLabel = item.size ? `UK ${item.size}` : "";
      const subtitle = item.colorName ? `${item.colorName} · ${sizeLabel}` : sizeLabel;
      return {
        id: `${ord._id}-${idx}`,
        title: item.productName || "Product",
        subtitle: subtitle || "Standard Variant",
        price: `₹${(item.price * item.quantity).toLocaleString("en-IN")}.00`,
        quantity: item.quantity,
        image: item.image || "/assets/images/florida-soft-footbed.png",
      };
    });

    const addr = ord.shippingAddress || {};
    const cityStateZip = [addr.city, addr.state, addr.postalCode].filter(Boolean).join(", ");
    const country = addr.country || "India";

    const last4 = ord.razorpayPaymentId
      ? ord.razorpayPaymentId.slice(-4)
      : ord.razorpayOrderId
      ? ord.razorpayOrderId.slice(-4)
      : "1001";

    const paymentBrand = ord.paymentMethod === "COD" ? "COD" : "Online / Razorpay";

    // Payment amounts calculation using authoritative backend fields
    const totalAmount = ord.totalAmount || 0;
    const onlinePaidAmount = ord.onlinePaidAmount || 0;
    const codPaidAmount = ord.codPaidAmount || 0;
    const paidAmount = onlinePaidAmount + codPaidAmount;
    const dueAmount = Math.max(0, totalAmount - paidAmount);

    const totalAmountFormatted = `₹${totalAmount.toLocaleString("en-IN")}`;
    const paidAmountFormatted = `₹${paidAmount.toLocaleString("en-IN")}`;
    const dueAmountFormatted = `₹${dueAmount.toLocaleString("en-IN")}`;

    const isCodPartiallyPaid = ord.paymentMethod === "COD" && ord.paymentStatus === "PartiallyPaid";
    const isPrepaidPaid = ord.paymentMethod === "PREPAID" && ord.paymentStatus === "Paid";

    const details: OrderDetailsData = {
      orderNumber,
      orderDate: formattedDate,
      paymentMethod: {
        brand: paymentBrand,
        last4,
      },
      address: {
        name: addr.fullName || "Customer",
        line1: addr.addressLine1 || "Address not provided",
        line2: addr.addressLine2 || undefined,
        cityStateZip: cityStateZip || "",
        country,
      },
      deliveryMethod: "Standard express shipping",
      subtotal,
      shipping: "Free",
      total: displayTotal,
      paymentBreakdown: {
        isCodPartiallyPaid,
        isPrepaidPaid,
        paidAmountFormatted,
        dueAmountFormatted,
      },
      items: mappedItems,
    };

    return {
      id: ord._id,
      orderNumber,
      orderDate: formattedDate,
      total: displayTotal,
      rawTotal: totalAmount,
      statusType,
      statusHeading,
      paymentMethod: ord.paymentMethod,
      paymentStatus: ord.paymentStatus,
      totalAmountFormatted,
      paidAmountFormatted,
      dueAmountFormatted,
      isCodPartiallyPaid,
      isPrepaidPaid,
      details,
      items: mappedItems,
    };
  });

  const filteredOrders = orders.filter((ord) => {
    if (filter === "all") return true;
    return ord.statusType === filter;
  });

  // Group orders by date so that same date orders share a single container card (separated by date)
  interface DateGroup {
    date: string;
    totalAmount: number;
    orderNumbers: string[];
    orders: OrderRecord[];
  }

  const groupedByDate: DateGroup[] = [];
  filteredOrders.forEach((order) => {
    const rawTotal = (order as any).rawTotal || 0;
    const existingGroup = groupedByDate.find((g) => g.date === order.orderDate);
    if (existingGroup) {
      existingGroup.orders.push(order);
      existingGroup.totalAmount += rawTotal;
      if (!existingGroup.orderNumbers.includes(order.orderNumber)) {
        existingGroup.orderNumbers.push(order.orderNumber);
      }
    } else {
      groupedByDate.push({
        date: order.orderDate,
        totalAmount: rawTotal,
        orderNumbers: [order.orderNumber],
        orders: [order],
      });
    }
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

  if (isLoading) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center text-slate-400">
        <Loader2 className="w-7 h-7 animate-spin mb-2" />
        <p className="text-sm font-medium">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full pt-1">
        <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2 sm:mb-3">
          Order History
        </h3>
        <p className="text-xs sm:text-sm text-red-500 font-normal">
          Failed to load order history. Please try refreshing the page.
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="w-full pt-1">
        <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2 sm:mb-3">
          Order History
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          You haven’t purchased anything from Pairborn yet.
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

      {/* Orders List grouped by Date */}
      {groupedByDate.length === 0 ? (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-8 sm:p-12 text-center shadow-xs">
          <p className="text-sm font-medium text-slate-500">
            No orders found in this status category.
          </p>
        </div>
      ) : (
        <div className="space-y-6 sm:space-y-8">
          {groupedByDate.map((group) => (
            <div
              key={group.date}
              className="bg-white border border-[#D0D0D0] rounded-2xl overflow-hidden shadow-xs"
            >
              {/* Single Date Header Bar for all orders on this date */}
              <div className="bg-[#F8F8F8] px-5 sm:px-8 py-3.5 sm:py-4 flex flex-wrap items-center justify-between gap-4 sm:gap-6 text-xs border-b border-[#EAEAEA]">
                <div className="flex items-center gap-8 sm:gap-14">
                  <div>
                    <span className="text-slate-500 block text-[12px]">Order placed:</span>
                    <span className="font-semibold text-slate-900 text-sm">
                      {group.date}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[12px]">Total:</span>
                    <span className="font-semibold text-slate-900 text-sm">
                      ₹{group.totalAmount.toLocaleString("en-IN")}.00
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-slate-500 block text-[12px]">
                    {group.orderNumbers.length > 1 ? "Order Numbers:" : "Order Number:"}
                  </span>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 sm:justify-end">
                    {group.orderNumbers.map((num) => (
                      <span key={num} className="font-semibold text-slate-900 text-sm">
                        # {num}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* All orders on this date inside the single card */}
              <div className="divide-y divide-[#EAEAEA]">
                {group.orders.map((order) => (
                  <div key={order.id} className="px-5 sm:px-8 py-4 sm:py-5">
                    {/* Status Heading & Payment Breakdown */}
                    <div className="mb-2 sm:mb-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                        <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                          {order.statusHeading}
                        </h4>
                        
                        {/* Order Payment Summary */}
                        {order.isCodPartiallyPaid ? (
                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
                            <span className="text-slate-600 font-medium">
                              Total: <span className="text-slate-900 font-semibold">{order.totalAmountFormatted}</span>
                            </span>
                            <span className="text-slate-300">·</span>
                            <span className="text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                              Paid: {order.paidAmountFormatted}
                            </span>
                            <span className="text-slate-300">·</span>
                            <span className="text-amber-800 font-medium bg-amber-50 px-2 py-0.5 rounded">
                              Due on Delivery: {order.dueAmountFormatted}
                            </span>
                          </div>
                        ) : order.isPrepaidPaid ? (
                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
                            <span className="text-slate-600 font-medium">
                              Total: <span className="text-slate-900 font-semibold">{order.totalAmountFormatted}</span>
                            </span>
                            <span className="text-slate-300">·</span>
                            <span className="text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                              Paid in Full ({order.paidAmountFormatted})
                            </span>
                          </div>
                        ) : order.statusSubtext ? (
                          <p className="text-xs text-slate-500 font-normal">
                            {order.statusSubtext}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="space-y-5 sm:space-y-3">
                      {order.items.map((item, idx) => (
                        <div
                          key={item.id}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                          {/* Product Thumbnail & Details */}
                          <div className="flex items-center gap-4">
                            <div className="relative w-[125px] h-[125px] sm:w-[160px] sm:h-[160px] bg-[#F8F8F8] rounded-none flex items-center justify-center shrink-0 border border-slate-100 p-3 overflow-hidden">
                              {/* Quantity Badge */}
                              <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-black text-white text-[12px] font-semibold rounded-sm flex items-center justify-center z-10">
                                {item.quantity}
                              </span>
                              <Image
                                src={item.image}
                                alt={item.title}
                                width={140}
                                height={140}
                                unoptimized
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  const target = e.currentTarget as HTMLImageElement;
                                  if (!target.src.includes("florida-soft-footbed.png")) {
                                    target.src = "/assets/images/florida-soft-footbed.png";
                                  }
                                }}
                              />
                            </div>

                            <div>
                              <h5 className="text-base sm:text-[18px] font-semibold text-black">
                                {item.title}
                              </h5>
                              <p className="text-sm sm:text-[14px] text-slate-500 tracking-tight uppercase mt-0.5 mb-1">
                                {item.subtitle}
                              </p>
                              <p className="text-[18px] font-semibold text-black mt-4.5">
                                {item.price}
                              </p>
                            </div>
                          </div>

                          {/* Action Buttons (Rendered on first item row of this order) */}
                          {idx === 0 && (
                            <div className="flex items-center gap-2.5 self-start sm:self-center mt-1 sm:mt-2 sm:mt-0">
                              <button
                                type="button"
                                onClick={() => handleViewOrder(order)}
                                className="btn-banner-size rounded-full bg-black text-white hover:bg-slate-800 transition-colors cursor-pointer"
                              >
                                View Order
                              </button>

                              {order.statusType === "active" ? (
                                <button
                                  type="button"
                                  onClick={() => handleTrackOrder(order.orderNumber)}
                                  className="btn-banner-size rounded-full bg-primary text-white hover:bg-primary-hover transition-colors cursor-pointer"
                                >
                                  Track Order
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleWriteReview(item)}
                                  className="btn-banner-size rounded-full bg-primary text-white hover:bg-primary-hover transition-colors cursor-pointer"
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
                ))}
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
