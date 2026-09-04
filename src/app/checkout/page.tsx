'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/features/cart/context/cart-context';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';
import useRazorpay from "react-razorpay";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, isLoggedIn, fetchCart } = useCart();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '', phone: '', email: '', addressLine1: '', city: '', state: '', postalCode: '', country: 'India'
  });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [Razorpay] = useRazorpay();

  useEffect(() => {
    if (isLoggedIn) {
      loadAddresses();
    } else {
      router.push('/account?mode=login&redirect=/checkout');
    }
  }, [isLoggedIn, router]);

  const loadAddresses = async () => {
    try {
      const res = await apiClient.get<any>('/addresses');
      if (res.status === 200 && res.data) {
        setAddresses(res.data);
        const defaultAddr = res.data.find((a: any) => a.isDefault) || res.data[0];
        if (defaultAddr) setSelectedAddress(defaultAddr._id);
      }
    } catch (error) {
      console.error('Failed to load addresses:', error);
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiClient.post<any>('/addresses', newAddress);
      if (res.status === 201 && res.data) {
        toast.success('Address added');
        setShowAddressForm(false);
        loadAddresses();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to add address');
    }
  };

  const handleProceedToPayment = async () => {
    if (!selectedAddress) {
      toast.error('Please select an address');
      return;
    }

    setIsProcessing(true);
    try {
      // 1. Create order on backend
      const res = await apiClient.post<any>('/orders/checkout', { addressId: selectedAddress });
      
      if (res.status === 200 && res.data?.razorpayOrderId) {
        const { razorpayOrderId, amount, currency } = res.data;

        // 2. Open Razorpay Modal
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
          amount: amount,
          currency: currency,
          name: "Verstivo",
          description: "Purchase Order",
          order_id: razorpayOrderId,
          handler: async function (response: any) {
            // 3. Verify Payment
            try {
              const verifyRes = await apiClient.post('/orders/verify', {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              if (verifyRes.status === 200) {
                toast.success("Payment successful!");
                await fetchCart(); // refresh to empty cart
                router.push('/checkout/success');
              }
            } catch (err: any) {
              toast.error(err.response?.data?.message || 'Payment verification failed');
            }
          },
          prefill: {
            name: addresses.find(a => a._id === selectedAddress)?.fullName || "",
            email: addresses.find(a => a._id === selectedAddress)?.email || "",
            contact: addresses.find(a => a._id === selectedAddress)?.phone || "",
          },
          theme: {
            color: "#000000",
          },
        };

        const rzp = new Razorpay(options);
        
        rzp.on("payment.failed", function (response: any) {
          toast.error(response.error.description || 'Payment failed');
        });

        rzp.open();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Checkout failed');
    } finally {
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

        <div className="border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {cart?.items.map(item => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.name} ({item.size})</span>
                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold border-t pt-4">
              <span>Total</span>
              <span>₹{cart?.summary.subtotal.toLocaleString()}</span>
            </div>
          </div>
          <button 
            onClick={handleProceedToPayment}
            disabled={!selectedAddress || isProcessing || !cart?.items.length}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : 'Proceed to Payment (Razorpay)'}
          </button>
        </div>
      </div>
    </div>
  );
}
