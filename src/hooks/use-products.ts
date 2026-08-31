import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export interface PaginatedResponse<T> {
  status: number;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface UseProductsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export function useProducts(params: UseProductsParams = {}) {
  const queryParams: Record<string, string> = {};
  if (params.page) queryParams.page = String(params.page);
  if (params.limit) queryParams.limit = String(params.limit);
  if (params.search) queryParams.search = params.search;

  return useQuery({
    queryKey: ["products", queryParams],
    queryFn: () =>
      apiClient.get<PaginatedResponse<any>>("/products", {
        params: queryParams,
      }),
  });
}
