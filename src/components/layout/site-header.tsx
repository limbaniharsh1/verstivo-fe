import { env } from "@/env";
import { SiteHeaderClient } from "./site-header-client";
import { BackendAttributes } from "@/features/mega-menu/types/mega-menu-types";

async function getAttributes(): Promise<BackendAttributes> {
  const defaultData: BackendAttributes = { categories: [], colors: [], materials: [], collections: [] };
  try {
    const baseUrl = env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";
    const response = await fetch(`${baseUrl}/attributes`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    return json.data || defaultData;
  } catch (error) {
    console.error("[SiteHeader Server Component Error] Failed to fetch attributes:", error);
    return defaultData;
  }
}

export async function SiteHeader() {
  const attributes = await getAttributes();
  return <SiteHeaderClient attributes={attributes} />;
}
