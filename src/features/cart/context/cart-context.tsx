"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { CartContextType, CartItem, ProductItem } from "../types/cart";
import { useUser } from "@/hooks/use-user";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/auth-context";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingSizeItemId, setEditingSizeItemId] = useState<string | null>(null);

  const { data: currentUser } = useUser();
  const isLoggedIn = !!currentUser;
  const { openAuth } = useAuth();

  // Helper to map backend cart response to frontend CartItem
  const fetchCartFromBackend = useCallback(async () => {
    try {
      const res = await apiClient.get("/cart");
      if (res.data?.status === 200 && res.data?.data) {
        const backendItems = res.data.data.items || [];
        const mappedItems: CartItem[] = backendItems.map((item: any) => {
          const sizeLabel = item.size ? `UK ${item.size}` : "";
          const subtitle = item.colorName ? `${item.colorName} · ${sizeLabel}` : sizeLabel;
          return {
            product: {
              id: `${item.productId}-${item.colorId}-${item.size}`,
              name: item.name || item.product?.name || "",
              subtitle: subtitle,
              price: item.price,
              originalPrice: item.originalPrice,
              formattedPrice: `₹${item.price.toLocaleString("en-IN")}`,
              formattedOriginalPrice: item.originalPrice ? `₹${item.originalPrice.toLocaleString("en-IN")}` : undefined,
              size: item.size ? `UK ${item.size}` : undefined,
              image: item.image,
              imageAlt: item.name || item.product?.name || "",
              sizes: item.sizes || [],
            },
            quantity: item.quantity,
          };
        });
        setItems(mappedItems);
      }
    } catch (err) {
      console.error("Failed to fetch cart from backend:", err);
    }
  }, []);

  // Sync cart state on login state change
  useEffect(() => {
    if (isLoggedIn) {
      fetchCartFromBackend();
    } else {
      setItems([]);
    }
  }, [isLoggedIn, fetchCartFromBackend]);

  const openCart = useCallback(() => {
    if (!isLoggedIn) {
      openAuth();
      return;
    }
    setIsOpen(true);
  }, [isLoggedIn, openAuth]);

  const closeCart = useCallback(() => {
    setIsOpen(false);
    setEditingSizeItemId(null);
  }, []);

  const toggleCart = useCallback(() => {
    if (!isLoggedIn) {
      openAuth();
      return;
    }
    setIsOpen((prev) => !prev);
  }, [isLoggedIn, openAuth]);

  const parseItemId = (id: string) => {
    const parts = id.split("-");
    const productId = parts[0];
    const colorId = parts[1] || null;
    const sizeStr = parts[2] || "";
    const match = sizeStr.match(/\d+/);
    const size = match ? Number(match[0]) : null;
    return { productId, colorId, size };
  };

  const addItem = useCallback(async (product: ProductItem) => {
    if (!isLoggedIn) {
      return;
    }
    const { productId, colorId, size } = parseItemId(product.id);
    try {
      await apiClient.post("/cart/items", {
        productId,
        colorId,
        size,
        quantity: 1
      });
      await fetchCartFromBackend();
      setIsOpen(true);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add item to cart");
    }
  }, [isLoggedIn, fetchCartFromBackend]);

  const removeItem = useCallback(async (productId: string) => {
    if (!isLoggedIn) return;
    const { productId: originalProductId, colorId, size } = parseItemId(productId);
    try {
      await apiClient.delete("/cart/items", {
        data: {
          productId: originalProductId,
          colorId,
          size
        }
      });
      await fetchCartFromBackend();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to remove item from cart");
    }
  }, [isLoggedIn, fetchCartFromBackend]);

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    if (!isLoggedIn) return;
    if (quantity <= 0) {
      await removeItem(productId);
      return;
    }
    const { productId: originalProductId, colorId, size } = parseItemId(productId);
    try {
      await apiClient.patch("/cart/items", {
        productId: originalProductId,
        colorId,
        size,
        quantity
      });
      await fetchCartFromBackend();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update quantity");
    }
  }, [isLoggedIn, removeItem, fetchCartFromBackend]);

  const updateSize = useCallback(async (productId: string, sizeLabel: string) => {
    if (!isLoggedIn) return;
    const { productId: originalProductId, colorId, size: oldSize } = parseItemId(productId);
    const match = sizeLabel.match(/\d+/);
    const newSize = match ? Number(match[0]) : null;
    
    const existingItem = items.find(item => item.product.id === productId);
    const qty = existingItem ? existingItem.quantity : 1;

    try {
      await apiClient.post("/cart/items", {
        productId: originalProductId,
        colorId,
        size: newSize,
        quantity: qty
      });
      await apiClient.delete("/cart/items", {
        data: {
          productId: originalProductId,
          colorId,
          size: oldSize
        }
      });
      await fetchCartFromBackend();
      setEditingSizeItemId(null);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update size");
    }
  }, [isLoggedIn, items, fetchCartFromBackend]);

  const clearCart = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      await apiClient.delete("/cart");
      await fetchCartFromBackend();
      setEditingSizeItemId(null);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to clear cart");
    }
  }, [isLoggedIn, fetchCartFromBackend]);

  const totalCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [items]);

  const formattedSubtotal = useMemo(() => {
    return `₹${subtotal.toLocaleString("en-IN")}.00`;
  }, [subtotal]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  const value = useMemo(
    () => ({
      items,
      isOpen,
      editingSizeItemId,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      updateSize,
      setEditingSizeItemId,
      clearCart,
      totalCount,
      subtotal,
      formattedSubtotal,
    }),
    [
      items,
      isOpen,
      editingSizeItemId,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      updateSize,
      setEditingSizeItemId,
      clearCart,
      totalCount,
      subtotal,
      formattedSubtotal,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
