'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/features/cart/context/cart-context';

export default function CheckoutSuccessPage() {
  const { fetchCart } = useCart();

  useEffect(() => {
    // Refresh cart to ensure it's empty locally after checkout success
    fetchCart();
  }, [fetchCart]);

  return (
    <div className="max-w-2xl mx-auto p-6 my-20 text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h1 className="text-3xl font-bold">Order Confirmed!</h1>
      <p className="text-gray-600">
        Thank you for your purchase. We have received your order and will begin processing it shortly.
      </p>
      <div className="pt-8">
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
