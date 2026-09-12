"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { CartContextType, CartItem, ProductItem } from "../types/cart";
import { useUser } from "@/hooks/use-user";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/auth-context";

import { SizeSelectionDrawer } from "@/components/product/SizeSelectionDrawer";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingSizeItemId, setEditingSizeItemId] = useState<string | null>(null);

  const [sizeDrawerProduct, setSizeDrawerProduct] = useState<any | null>(null);
  const [isSizeDrawerOpen, setIsSizeDrawerOpen] = useState(false);

  const { data: currentUser } = useUser();
  const isLoggedIn = !!currentUser;
  const { openAuth } = useAuth();

  const openSizeDrawer = useCallback((product: any) => {
    if (!isLoggedIn) {
      openAuth();
      return;
    }
    setSizeDrawerProduct(product);
    setIsSizeDrawerOpen(true);
  }, [isLoggedIn, openAuth]);

  const closeSizeDrawer = useCallback(() => {
    setIsSizeDrawerOpen(false);
    setSizeDrawerProduct(null);
  }, []);

  // Helper to map backend cart response to frontend CartItem
  const fetchCartFromBackend = useCallback(async () => {
    try {
      const res = await apiClient.get<any>("/cart");
      if (res.status === 200 && res.data) {
        const backendItems = res.data.items || [];
        const mappedItems: CartItem[] = backendItems.map((item: any) => {
          const sizeLabel = item.size ? `UK ${item.size}` : "";
          const subtitle = item.colorName ? `${item.colorName} · ${sizeLabel}` : sizeLabel;
          const isItemAvailable = item.isAvailable ?? ((item.stock ?? 1) > 0);
          const hasSufficient = item.hasSufficientStock ?? (isItemAvailable && (item.stock ?? 0) >= item.quantity);
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
              stock: item.stock,
              isAvailable: isItemAvailable,
              hasSufficientStock: hasSufficient,
            },
            quantity: item.quantity,
          };
        });
        console.log("MAPPED ITEMS", mappedItems);
        setItems(mappedItems);
        return mappedItems;
      }
    } catch (err) {
      console.error("Failed to fetch cart from backend:", err);
    }
    return [];
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
    // Support :: as a safe delimiter to avoid splitting UUIDs or hyphenated IDs
    if (id.includes("::")) {
      const parts = id.split("::");
      const productId = parts[0];
      const colorId = parts.length === 3 ? parts[1] : null;
      const sizeStr = parts.length === 3 ? parts[2] : parts[1];
      const match = (sizeStr || "").match(/\d+(\.\d+)?/);
      const size = match ? Number(match[0]) : null;
      return { productId, colorId, size };
    }
    
    // Fallback for older hypenated ids
    const parts = id.split("-");
    const productId = parts[0];
    const colorId = parts.length > 2 ? parts[1] : null;
    const sizeStr = parts.length > 2 ? parts[2] : parts[1] || "";
    const match = sizeStr.match(/\d+(\.\d+)?/);
    const size = match ? Number(match[0]) : null;
    return { productId, colorId, size };
  };

  const addItem = useCallback(async (product: ProductItem, quantity: number = 1): Promise<boolean> => {
    if (!isLoggedIn) {
      return false;
    }
    const { productId, colorId, size } = parseItemId(product.id);
    try {
      const res = await apiClient.post<any>("/cart/items", {
        productId,
        colorId,
        size,
        quantity
      });
      
      // Try to use the returned cart data to update state directly
      if (res.status === 200 && res.data) {
        const backendItems = res.data.items || [];
        const mappedItems: CartItem[] = backendItems.map((item: any) => {
          const sizeLabel = item.size ? `UK ${item.size}` : "";
          const subtitle = item.colorName ? `${item.colorName} · ${sizeLabel}` : sizeLabel;
          const isItemAvailable = item.isAvailable ?? ((item.stock ?? 1) > 0);
          const hasSufficient = item.hasSufficientStock ?? (isItemAvailable && (item.stock ?? 0) >= item.quantity);
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
              stock: item.stock,
              isAvailable: isItemAvailable,
              hasSufficientStock: hasSufficient,
            },
            quantity: item.quantity,
          };
        });
        setItems(mappedItems);
      } else {
        await fetchCartFromBackend();
      }
      
      setEditingSizeItemId(null);
      setIsOpen(true);
      return true;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add item to cart");
      return false;
    }
  }, [isLoggedIn, fetchCartFromBackend]);

  const removeItem = useCallback(async (productId: string) => {
    if (!isLoggedIn) return;
    const { productId: originalProductId, colorId, size } = parseItemId(productId);
    try {
      await apiClient.delete<any>("/cart/items", {
        body: JSON.stringify({
          productId: originalProductId,
          colorId,
          size
        })
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
      await apiClient.patch<any>("/cart/items", {
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
      await apiClient.delete<any>("/cart/items", {
        body: JSON.stringify({
          productId: originalProductId,
          colorId,
          size: oldSize
        })
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
      await apiClient.delete<any>("/cart");
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
    return items.reduce((acc, item) => {
      const isAvailable = item.product.isAvailable ?? ((item.product.stock ?? 1) > 0);
      const hasSufficient = item.product.hasSufficientStock ?? (isAvailable && (item.product.stock ?? 0) >= item.quantity);
      if (!isAvailable || !hasSufficient) return acc;
      return acc + item.product.price * item.quantity;
    }, 0);
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
      sizeDrawerProduct,
      isSizeDrawerOpen,
      openSizeDrawer,
      closeSizeDrawer,
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
      sizeDrawerProduct,
      isSizeDrawerOpen,
      openSizeDrawer,
      closeSizeDrawer,
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

  return (
    <CartContext.Provider value={value}>
      {children}
      <SizeSelectionDrawer
        isOpen={isSizeDrawerOpen}
        onClose={closeSizeDrawer}
        product={sizeDrawerProduct}
      />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
