"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, Check } from "lucide-react";
import { useCart } from "@/features/cart/context/cart-context";
import { useAuth } from "@/components/providers/auth-context";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { initiateCheckout, verifyPayment } from "@/features/checkout/services/checkout.service";
import { CartItem } from "@/features/cart/types/cart";
import { UserAddress } from "@/features/checkout/types/checkout";
import { AddressDrawer } from "@/features/account/components/address-drawer";
import type { AddressSchemaType } from "@/features/account/schemas/account-schemas";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ApiAddressResponse {
  status: number;
  data: UserAddress[];
  message?: string;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const router = useRouter();
  const { items, subtotal: cartSubtotal, clearCart } = useCart();
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"PREPAID" | "COD">("PREPAID");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAddressDrawerOpen, setIsAddressDrawerOpen] = useState(false);
  const { Razorpay } = useRazorpay();

  const loadAddresses = useCallback(async () => {
    try {
      const res = await apiClient.get<ApiAddressResponse>("/addresses");
      if (res.status === 200 && Array.isArray(res.data)) {
        setAddresses(res.data);
        const defaultAddr = res.data.find((a) => a.isDefault) || res.data[0];
        if (defaultAddr) setSelectedAddress(defaultAddr._id);
      }
    } catch (error) {
      console.error("Failed to load addresses:", error);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    const fetchAddresses = async () => {
      try {
        const res = await apiClient.get<ApiAddressResponse>("/addresses");
        if (isMounted && res.status === 200 && Array.isArray(res.data)) {
          setAddresses(res.data);
          const defaultAddr = res.data.find((a) => a.isDefault) || res.data[0];
          if (defaultAddr) setSelectedAddress(defaultAddr._id);
        }
      } catch (error) {
        console.error("Failed to load addresses:", error);
      }
    };

    fetchAddresses();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Display-only preview amounts based on current subtotal
  const previewPayNow = paymentMethod === "COD" ? Math.floor(cartSubtotal / 2) : cartSubtotal;
  const previewPayOnDelivery = paymentMethod === "COD" ? cartSubtotal - previewPayNow : 0;

  const handleSaveAddress = async (data: AddressSchemaType) => {
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    const payload = {
      fullName,
      phone: data.phone,
      email: user?.email || "customer@verstivo.com",
      addressLine1: data.address1,
      addressLine2: data.address2 || "",
      city: data.city,
      state: data.province,
      postalCode: data.postalCode,
      country: data.country,
      isDefault: Boolean(data.setAsDefault || addresses.length === 0),
    };

    try {
      const res = await apiClient.post<{ status: number; data: UserAddress }>("/addresses", payload);
      if (res.status === 201 && res.data) {
        toast.success("New address added successfully!");
        await loadAddresses();
        setSelectedAddress(res.data._id);
        setIsAddressDrawerOpen(false);
      }
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to save address";
      toast.error(message);
    }
  };

  const handleProceedToPayment = async () => {
    if (isProcessing) return;

    if (!selectedAddress) {
      toast.error("Please select a shipping address");
      return;
    }

    if (!items || items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const hasAvailableItems = items.some(
      (item) => item.product.isAvailable ?? ((item.product.stock ?? 1) > 0)
    );

    if (!hasAvailableItems) {
      toast.error("All items in your cart are currently out of stock");
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Authoritative backend checkout initiation
      const res = await initiateCheckout(selectedAddress, paymentMethod);

      if (res.status !== 200 || !res.data?.razorpayOrderId) {
        throw new Error(res.message || "Failed to initiate checkout");
      }

      const { orderId, razorpayOrderId, amount, currency, keyId } = res.data;

      if (!keyId) {
        throw new Error("Payment gateway configuration error: keyId is missing from server");
      }

      const selectedAddrObj = addresses.find((a) => a._id === selectedAddress);

      // 2. Open Razorpay modal with backend authoritative amount
      const options: RazorpayOrderOptions = {
        key: keyId,
        amount: amount, // in paise
        currency: (currency || "INR") as RazorpayOrderOptions["currency"],
        name: "Verstivo",
        description: paymentMethod === "COD" ? "Advance Payment (50%)" : "Prepaid Order Payment",
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            // 3. Server-side payment verification
            const verifyRes = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.status === 200) {
              toast.success(
                paymentMethod === "COD"
                  ? "50% Advance received! Order confirmed."
                  : "Payment successful! Order confirmed."
              );
              await clearCart();
              onClose();
              const finalOrderId = verifyRes.data?.orderId || orderId;
              router.push(`/checkout/success?orderId=${finalOrderId}`);
            } else {
              throw new Error(verifyRes.message || "Payment verification failed");
            }
          } catch (verifyErr: unknown) {
            console.error("Payment verification error:", verifyErr);
            const verifyMsg =
              verifyErr instanceof Error ? verifyErr.message : "Payment verification failed.";
            toast.error(verifyMsg);
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            toast.info("Payment cancelled. You can retry when you're ready.");
          },
        },
        prefill: {
          name: selectedAddrObj?.fullName || "",
          email: selectedAddrObj?.email || "",
          contact: selectedAddrObj?.phone || "",
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp = new Razorpay(options);

      rzp.on("payment.failed", function (failResponse) {
        setIsProcessing(false);
        const description = failResponse.error?.description || "Payment failed. Please try again.";
        toast.error(description);
      });

      rzp.open();
    } catch (err: unknown) {
      console.error("Checkout error:", err);
      const errMsg = err instanceof Error ? err.message : "Checkout failed";
      toast.error(errMsg);
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
            <div>
              <h2 className="text-xl font-bold text-black tracking-tight">Checkout</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Select address and payment method</p>
            </div>
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-900">
            {/* 1. Shipping Address Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-700">
                  Shipping Address
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddressDrawerOpen(true)}
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add New
                </button>
              </div>

              {addresses.length === 0 ? (
                <div className="p-4 border border-dashed border-neutral-300 rounded-2xl text-center bg-neutral-50/50">
                  <p className="text-sm text-neutral-600 mb-2">No saved address found.</p>
                  <button
                    type="button"
                    onClick={() => setIsAddressDrawerOpen(true)}
                    className="text-xs font-semibold px-4 py-2 bg-black text-white rounded-full hover:bg-neutral-800 transition-all cursor-pointer"
                  >
                    + Add Shipping Address
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto pr-1">
                  {addresses.map((addr) => {
                    const isSelected = selectedAddress === addr._id;
                    return (
                      <div
                        key={addr._id}
                        onClick={() => setSelectedAddress(addr._id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                          isSelected
                            ? "border-black bg-neutral-50/80 ring-1 ring-black shadow-xs"
                            : "border-neutral-200 hover:border-neutral-300 bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <p className="font-semibold text-sm text-black">{addr.fullName}</p>
                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
                          {addr.addressLine1}, {addr.city}, {addr.state} - {addr.postalCode}
                        </p>
                        <p className="text-[11px] text-neutral-500 mt-1">{addr.phone}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 2. Payment Method Section */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-700 mb-3">
                Payment Method
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Prepaid Option */}
                <div
                  onClick={() => setPaymentMethod("PREPAID")}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === "PREPAID"
                      ? "border-black bg-neutral-50/80 ring-1 ring-black shadow-xs"
                      : "border-neutral-200 hover:border-neutral-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-sm text-black">Prepaid (100% Online)</span>
                    <input
                      type="radio"
                      name="modalPaymentMethod"
                      checked={paymentMethod === "PREPAID"}
                      onChange={() => setPaymentMethod("PREPAID")}
                      className="accent-black"
                    />
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Pay 100% online now via Razorpay (UPI, Cards, Netbanking).
                  </p>
                </div>

                {/* COD 50% Option */}
                <div
                  onClick={() => setPaymentMethod("COD")}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === "COD"
                      ? "border-black bg-neutral-50/80 ring-1 ring-black shadow-xs"
                      : "border-neutral-200 hover:border-neutral-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-sm text-black">Cash on Delivery (COD)</span>
                    <input
                      type="radio"
                      name="modalPaymentMethod"
                      checked={paymentMethod === "COD"}
                      onChange={() => setPaymentMethod("COD")}
                      className="accent-black"
                    />
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Pay 50% advance online now. Pay remaining 50% on delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Items & Order Summary Breakdown */}
            <div className="border-t border-neutral-100 pt-4">
              <div className="space-y-2 mb-3 max-h-28 overflow-y-auto pr-1">
                {items.map((item: CartItem) => {
                  const isAvailable = item.product.isAvailable ?? ((item.product.stock ?? 1) > 0);
                  const stockCount = item.product.stock ?? 0;
                  const isInsufficientStock = isAvailable && item.quantity > stockCount;
                  const isEligible = isAvailable && !isInsufficientStock;

                  return (
                    <div
                      key={item.product.id}
                      className={`flex justify-between items-center text-xs ${
                        isEligible ? "text-neutral-700" : "text-neutral-400 opacity-60"
                      }`}
                    >
                      <span className="truncate max-w-[70%]">
                        {item.quantity}x {item.product.name}{" "}
                        {item.product.size ? `(${item.product.size})` : ""}
                        {!isAvailable ? (
                          <span className="ml-1 text-[10px] text-red-600 font-semibold uppercase">
                            (Out of Stock)
                          </span>
                        ) : isInsufficientStock ? (
                          <span className="ml-1 text-[10px] text-amber-700 font-semibold">
                            (Only {stockCount} available)
                          </span>
                        ) : null}
                      </span>
                      <span className={`font-medium ${isEligible ? "text-black" : "text-neutral-400 line-through"}`}>
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Price Breakdown */}
              <div className="bg-neutral-50 rounded-2xl p-4 space-y-2 text-xs border border-neutral-100">
                <div className="flex justify-between text-neutral-600">
                  <span>Order Subtotal</span>
                  <span className="font-semibold text-black">
                    ₹{cartSubtotal.toLocaleString()}
                  </span>
                </div>

                {paymentMethod === "COD" ? (
                  <>
                    <div className="flex justify-between font-bold text-black border-t border-neutral-200 pt-2 text-sm">
                      <span>Pay Now (50% Advance via Razorpay)</span>
                      <span>₹{previewPayNow.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-amber-800 font-medium pt-0.5">
                      <span>Due on Delivery (Remaining 50%)</span>
                      <span>₹{previewPayOnDelivery.toLocaleString()}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between font-bold text-black border-t border-neutral-200 pt-2 text-sm">
                    <span>Pay Now (100% via Razorpay)</span>
                    <span>₹{cartSubtotal.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-4 sm:p-5 border-t border-neutral-100 bg-white">
            {(() => {
              const hasEligibleItems = items.some((item) => {
                const isAvailable = item.product.isAvailable ?? ((item.product.stock ?? 1) > 0);
                const stockCount = item.product.stock ?? 0;
                return isAvailable && item.quantity <= stockCount;
              });

              return (
                <button
                  onClick={handleProceedToPayment}
                  disabled={!selectedAddress || isProcessing || !hasEligibleItems || cartSubtotal <= 0}
                  className="w-full h-12 rounded-full bg-black text-white font-medium text-sm flex items-center justify-center hover:bg-neutral-800 disabled:opacity-40 transition-all cursor-pointer"
                >
                  {isProcessing
                    ? "Opening Razorpay..."
                    : !hasEligibleItems || cartSubtotal <= 0
                    ? "No items available to checkout"
                    : paymentMethod === "COD"
                    ? `Pay ₹${previewPayNow.toLocaleString()} Advance (Razorpay)`
                    : `Pay ₹${cartSubtotal.toLocaleString()} (Razorpay)`}
                </button>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Embedded AddressDrawer for adding a new address right from the modal */}
      <AddressDrawer
        isOpen={isAddressDrawerOpen}
        onClose={() => setIsAddressDrawerOpen(false)}
        onSave={handleSaveAddress}
      />
    </>
  );
}
