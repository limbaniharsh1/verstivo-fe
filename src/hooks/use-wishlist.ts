import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { useUser } from "./use-user";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export interface WishlistItem {
  wishlistId?: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  size: number;
  colorId: string;
  color: {
    _id: string;
    name: string;
    slug?: string;
    colorCode: string;
  };
  image: string;
  stock: number;
  stockStatus: "In Stock" | "Out of Stock";
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface PaginatedWishlistResponse {
  status: number;
  data: WishlistItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Main variant-level wishlist keys hook
export function useWishlistKeys() {
  const { data: user } = useUser();
  const isLoggedIn = !!user;

  return useQuery({
    queryKey: ["wishlist-keys"],
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<string[]>>("/wishlist/keys");
      return res.data;
    },
    enabled: isLoggedIn,
    staleTime: 60 * 1000,
  });
}

// Main wishlist paginated list hook
export function useWishlistItems(page: number = 1, limit: number = 20) {
  const { data: user } = useUser();
  const isLoggedIn = !!user;

  return useQuery({
    queryKey: ["wishlist-items", page, limit],
    queryFn: () =>
      apiClient.get<PaginatedWishlistResponse>("/wishlist", {
        params: { page: String(page), limit: String(limit) },
      }),
    enabled: isLoggedIn,
  });
}

// Main toggle mutation with optimistic updates
export function useToggleWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: { productId: string; colorId: string; size: number }) => {
      const res = await apiClient.post<ApiResponse<{ wishlisted: boolean }>>("/wishlist/toggle", {
        productId: variables.productId,
        colorId: variables.colorId,
        size: variables.size,
      });
      return res.data;
    },
    onMutate: async ({ productId, colorId, size }) => {
      await queryClient.cancelQueries({ queryKey: ["wishlist-keys"] });

      const previousKeys = queryClient.getQueryData<string[]>(["wishlist-keys"]) || [];
      const key = `${productId}_${colorId}_${size}`;

      const newKeys = previousKeys.includes(key)
        ? previousKeys.filter((k) => k !== key)
        : [...previousKeys, key];

      queryClient.setQueryData(["wishlist-keys"], newKeys);

      return { previousKeys };
    },
    onError: (err, variables, context) => {
      if (context?.previousKeys) {
        queryClient.setQueryData(["wishlist-keys"], context.previousKeys);
      }
      toast.error(err.message || "Failed to update wishlist");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist-keys"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist-items"] });
    },
  });
}
