'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/features/cart/context/cart-context';
import { apiClient } from '@/lib/api-client';
import { UserOrder } from '@/features/checkout/types/checkout';

interface ApiOrdersResponse {
  status: number;
  data: UserOrder[];
  message?: string;
}

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<UserOrder | null>(null);

  useEffect(() => {
    // Clear local cart to ensure it's empty after successful checkout
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    if (!orderId) {
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const res = await apiClient.get<ApiOrdersResponse>('/orders/me');
        if (res.status === 200 && Array.isArray(res.data)) {
          const found = res.data.find((o) => o._id === orderId);
          if (found) {
            setOrder(found);
          }
        }
      } catch (err: unknown) {
        console.error('Failed to load order details for success screen:', err);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const isCOD = order?.paymentMethod === 'COD';
  const onlinePaid = order?.onlinePaidAmount ?? (order?.totalAmount ? (isCOD ? Math.floor(order.totalAmount / 2) : order.totalAmount) : 0);
  const codRemaining = order?.totalAmount ? order.totalAmount - (order.onlinePaidAmount || 0) : 0;

  return (
    <div className="max-w-2xl mx-auto p-6 my-16 text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>

      <h1 className="text-3xl font-bold">Order Confirmed!</h1>
      
      {order && isCOD ? (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-900 text-sm max-w-md mx-auto">
          <p className="font-semibold">50% Advance Payment Received</p>
          <p className="mt-1">
            Remaining ₹{codRemaining.toLocaleString()} will be collected on delivery.
          </p>
        </div>
      ) : (
        <p className="text-gray-600">
          Thank you for your purchase. We have received your order and will begin processing it shortly.
        </p>
      )}

      {orderId && (
        <p className="text-sm font-medium text-gray-500">
          Order Reference: <span className="font-mono text-black">{orderId}</span>
        </p>
      )}

      {/* Order & Payment Summary Card */}
      {order && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-left max-w-md mx-auto space-y-3 text-sm">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600">Payment Method</span>
            <span className="font-semibold">{isCOD ? 'COD (50% Advance)' : 'Prepaid (Online)'}</span>
          </div>

          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600">Payment Status</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
              order.paymentStatus === 'Paid' 
                ? 'bg-green-100 text-green-800' 
                : order.paymentStatus === 'PartiallyPaid'
                ? 'bg-amber-100 text-amber-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {order.paymentStatus === 'PartiallyPaid' ? 'Partially Paid' : order.paymentStatus}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Order Total</span>
            <span className="font-semibold">₹{order.totalAmount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center text-green-700 font-medium">
            <span>Online Advance Paid</span>
            <span>₹{onlinePaid.toLocaleString()}</span>
          </div>

          {isCOD && (
            <div className="flex justify-between items-center text-amber-800 font-medium border-t pt-2">
              <span>Amount Due on Delivery</span>
              <span>₹{codRemaining.toLocaleString()}</span>
            </div>
          )}
        </div>
      )}

      <div className="pt-6">
        <Link 
          href="/shop" 
          className="inline-block px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
