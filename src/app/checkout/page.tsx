'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/features/cart/context/cart-context';
import { useAuth } from '@/components/providers/auth-context';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { initiateCheckout, verifyPayment } from '@/features/checkout/services/checkout.service';
import { CartItem } from '@/features/cart/types/cart';
import { UserAddress } from '@/features/checkout/types/checkout';

interface ApiAddressResponse {
  status: number;
  data: UserAddress[];
  message?: string;
}

interface ApiSingleAddressResponse {
  status: number;
  data: UserAddress;
  message?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal: cartSubtotal, clearCart } = useCart();
  const { user, isLoading: isAuthLoading } = useAuth();
  const isLoggedIn = !!user;
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'PREPAID' | 'COD'>('PREPAID');
  const [isProcessing, setIsProcessing] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '', phone: '', email: '', addressLine1: '', city: '', state: '', postalCode: '', country: 'India'
  });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const { Razorpay } = useRazorpay();

  const loadAddresses = useCallback(async () => {
    try {
      const res = await apiClient.get<ApiAddressResponse>('/addresses');
      if (res.status === 200 && Array.isArray(res.data)) {
        setAddresses(res.data);
        const defaultAddr = res.data.find((a) => a.isDefault) || res.data[0];
        if (defaultAddr) setSelectedAddress(defaultAddr._id);
      }
    } catch (error) {
      console.error('Failed to load addresses:', error);
    }
  }, []);

  useEffect(() => {
    if (isAuthLoading) return;
    if (!isLoggedIn) {
      router.push('/account?mode=login&redirect=/checkout');
      return;
    }

    let isMounted = true;
    const fetchAddresses = async () => {
      try {
        const res = await apiClient.get<ApiAddressResponse>('/addresses');
        if (isMounted && res.status === 200 && Array.isArray(res.data)) {
          setAddresses(res.data);
          const defaultAddr = res.data.find((a) => a.isDefault) || res.data[0];
          if (defaultAddr) setSelectedAddress(defaultAddr._id);
        }
      } catch (error) {
        console.error('Failed to load addresses:', error);
      }
    };

    fetchAddresses();

    return () => {
      isMounted = false;
    };
  }, [isLoggedIn, isAuthLoading, router]);

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiClient.post<ApiSingleAddressResponse>('/addresses', newAddress);
      if (res.status === 201 && res.data) {
        toast.success('Address added');
        setShowAddressForm(false);
        await loadAddresses();
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to add address';
      toast.error(errorMsg);
    }
  };

  // Client-side display-only preview values based on the cart subtotal
  const previewPayNow = paymentMethod === 'COD' ? Math.floor(cartSubtotal / 2) : cartSubtotal;
  const previewPayOnDelivery = paymentMethod === 'COD' ? cartSubtotal - previewPayNow : 0;

  const handleProceedToPayment = async () => {
    // 1. Guard against double-submission
    if (isProcessing) return;

    // 2. Validate selected address and cart items
    if (!selectedAddress) {
      toast.error('Please select an address');
      return;
    }

    if (!items || items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const hasAvailableItems = items.some(
      (item) => item.product.isAvailable ?? ((item.product.stock ?? 1) > 0)
    );

    if (!hasAvailableItems) {
      toast.error('All items in your cart are currently out of stock');
      return;
    }

    setIsProcessing(true);

    try {
      // 3. Initiate checkout via checkout service (backend authoritative calculation and split)
      const res = await initiateCheckout(selectedAddress, paymentMethod);

      if (res.status !== 200 || !res.data?.razorpayOrderId) {
        throw new Error(res.message || 'Failed to initiate checkout');
      }

      const { orderId, razorpayOrderId, amount, currency, keyId } = res.data;

      // 4. Validate backend keyId
      if (!keyId) {
        throw new Error('Payment gateway configuration error: keyId is missing from server');
      }

      const selectedAddrObj = addresses.find(a => a._id === selectedAddress);

      // 5. Configure Razorpay modal options using backend-returned authoritative amount
      const options: RazorpayOrderOptions = {
        key: keyId,
        amount: amount, // in paise, authoritative amount from backend
        currency: (currency || 'INR') as RazorpayOrderOptions['currency'],
        name: 'Verstivo',
        description: paymentMethod === 'COD' ? 'Advance Payment (50%)' : 'Prepaid Order Payment',
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            // 6. Server-side payment verification
            const verifyRes = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.status === 200) {
              toast.success(
                paymentMethod === 'COD'
                  ? 'Advance payment successful! Your order has been confirmed.'
                  : 'Payment successful!'
              );
              // 7. Synchronize local cart state (backend already cleared server cart)
              await clearCart();
              const finalOrderId = verifyRes.data?.orderId || orderId;
              router.push(`/checkout/success?orderId=${finalOrderId}`);
            } else {
              throw new Error(verifyRes.message || 'Payment verification failed');
            }
          } catch (verifyErr: unknown) {
            console.error('Payment verification error:', verifyErr);
            const verifyMsg = verifyErr instanceof Error ? verifyErr.message : 'Payment verification failed. Please contact support.';
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
          name: selectedAddrObj?.fullName || '',
          email: selectedAddrObj?.email || '',
          contact: selectedAddrObj?.phone || '',
        },
        theme: {
          color: '#000000',
        },
      };

      const rzp = new Razorpay(options);

      rzp.on('payment.failed', function (failResponse) {
        setIsProcessing(false);
        const description = failResponse.error?.description || 'Payment failed. Please try again.';
        toast.error(description);
      });

      rzp.open();
    } catch (err: unknown) {
      console.error('Checkout error:', err);
      const errMsg = err instanceof Error ? err.message : 'Checkout failed';
      toast.error(errMsg);
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 my-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Select Shipping Address</h2>
          {addresses.length === 0 && !showAddressForm ? (
            <p className="text-gray-500 mb-4">No addresses found.</p>
          ) : (
            <div className="grid gap-4 mb-4">
              {addresses.map((addr) => (
                <div 
                  key={addr._id} 
                  onClick={() => setSelectedAddress(addr._id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedAddress === addr._id ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <p className="font-medium">{addr.fullName}</p>
                  <p className="text-gray-600 text-sm">{addr.addressLine1}, {addr.city}</p>
                  <p className="text-gray-600 text-sm">{addr.state}, {addr.postalCode}</p>
                </div>
              ))}
            </div>
          )}

          {!showAddressForm && (
            <button 
              onClick={() => setShowAddressForm(true)}
              className="text-sm underline font-medium"
            >
              + Add New Address
            </button>
          )}

          {showAddressForm && (
            <form onSubmit={handleAddAddress} className="space-y-4 border p-4 rounded-lg bg-gray-50 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="Full Name" className="p-2 border rounded" value={newAddress.fullName} onChange={e => setNewAddress({...newAddress, fullName: e.target.value})} />
                <input required placeholder="Phone" className="p-2 border rounded" value={newAddress.phone} onChange={e => setNewAddress({...newAddress, phone: e.target.value})} />
                <input required type="email" placeholder="Email" className="p-2 border rounded col-span-2" value={newAddress.email} onChange={e => setNewAddress({...newAddress, email: e.target.value})} />
                <input required placeholder="Address Line 1" className="p-2 border rounded col-span-2" value={newAddress.addressLine1} onChange={e => setNewAddress({...newAddress, addressLine1: e.target.value})} />
                <input required placeholder="City" className="p-2 border rounded" value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} />
                <input required placeholder="State" className="p-2 border rounded" value={newAddress.state} onChange={e => setNewAddress({...newAddress, state: e.target.value})} />
                <input required placeholder="Postal Code" className="p-2 border rounded" value={newAddress.postalCode} onChange={e => setNewAddress({...newAddress, postalCode: e.target.value})} />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="px-4 py-2 bg-black text-white rounded">Save Address</button>
                <button type="button" onClick={() => setShowAddressForm(false)} className="px-4 py-2 border rounded">Cancel</button>
              </div>
            </form>
          )}
        </div>

        {/* Payment Method Selector */}
        <div className="border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div 
              onClick={() => setPaymentMethod('PREPAID')}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'PREPAID' ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-base">Prepaid (Online)</span>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  checked={paymentMethod === 'PREPAID'} 
                  onChange={() => setPaymentMethod('PREPAID')}
                  className="accent-black"
                />
              </div>
              <p className="text-sm text-gray-600">Pay 100% online now via Razorpay (UPI, Cards, Netbanking).</p>
            </div>

            <div 
              onClick={() => setPaymentMethod('COD')}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-base">Cash on Delivery (COD)</span>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  checked={paymentMethod === 'COD'} 
                  onChange={() => setPaymentMethod('COD')}
                  className="accent-black"
                />
              </div>
              <p className="text-sm text-gray-600">Pay 50% advance online now via Razorpay. Pay remaining 50% on delivery.</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {items.map((item: CartItem) => {
              const isAvailable = item.product.isAvailable ?? ((item.product.stock ?? 1) > 0);
              return (
                <div key={item.product.id} className={`flex justify-between text-sm ${!isAvailable ? "text-gray-400 opacity-60" : ""}`}>
                  <span>
                    {item.quantity}x {item.product.name} {item.product.size ? `(${item.product.size})` : ''}
                    {!isAvailable && <span className="ml-1 text-xs text-red-500 font-semibold">(Out of Stock)</span>}
                  </span>
                  <span className={!isAvailable ? "line-through text-gray-400" : ""}>
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between font-medium text-gray-700">
                <span>Order Total</span>
                <span>₹{cartSubtotal.toLocaleString()}</span>
              </div>

              {paymentMethod === 'COD' ? (
                <>
                  <div className="flex justify-between text-sm font-semibold text-black">
                    <span>Pay Now (50% Online Advance)</span>
                    <span>₹{previewPayNow.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Pay on Delivery (COD Remaining)</span>
                    <span>₹{previewPayOnDelivery.toLocaleString()}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-sm font-semibold text-black">
                  <span>Pay Now (100% Online)</span>
                  <span>₹{cartSubtotal.toLocaleString()}</span>
                </div>
              )}
            </div>

            <button 
              onClick={handleProceedToPayment}
              disabled={!selectedAddress || isProcessing || !items.length}
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 disabled:opacity-50 transition-colors mt-6"
            >
              {isProcessing ? 'Processing...' : paymentMethod === 'COD' ? `Pay ₹${previewPayNow.toLocaleString()} Advance (Razorpay)` : `Pay ₹${cartSubtotal.toLocaleString()} (Razorpay)`}
            </button>
          </div>
        </div>
      </div>
  );
}
