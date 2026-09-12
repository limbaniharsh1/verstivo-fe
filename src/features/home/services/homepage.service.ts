import { env } from "@/env";
import { HomepageApiResponse, HomepageData } from "@/types/homepage";

/**
 * Server-side fetching utility for the dynamic homepage.
 *
 * Locked Architecture:
 * - Uses cache: "no-store" because the backend already caches the response in Node.js
 *   in-memory RAM and automatically invalidates on any admin section/product update.
 * - Does not perform any secondary product queries because product summaries are
 *   already resolved and included by the backend.
 * - Fails gracefully: If the backend is unavailable or returns an error, returns { sections: [] }
 *   so the storefront layout renders without throwing a 500 page.
 */
export async function getHomepageData(): Promise<HomepageData> {
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";
  const url = `${baseUrl.replace(/\/+$/, "")}/homepage`;

  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.error(`[Homepage Service] Failed to fetch homepage: HTTP ${res.status}`);
      return { sections: [] };
    }

    const json = (await res.json()) as HomepageApiResponse;
    if (json?.data?.sections && Array.isArray(json.data.sections)) {
      return json.data;
    }

    return { sections: [] };
  } catch (error) {
    console.error("[Homepage Service] Network error while fetching homepage:", error);
    return { sections: [] };
  }
}
