import { env } from "@/env";

export type ApiRequestOptions = RequestInit & {
  params?: Record<string, string>;
};

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = env.NEXT_PUBLIC_API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
    const { params, headers, ...restOptions } = options;

    let url = endpoint.startsWith("http") ? endpoint : `${this.baseUrl}${endpoint}`;

    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    const defaultHeaders: HeadersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    };

    try {
      const response = await fetch(url, {
        ...restOptions,
        headers: defaultHeaders,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API Request failed with status ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error(`[API Client Error] ${options.method || "GET"} ${url}:`, error);
      throw error;
    }
  }

  public get<T>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  public post<T>(endpoint: string, data?: unknown, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public put<T>(endpoint: string, data?: unknown, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public delete<T>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
