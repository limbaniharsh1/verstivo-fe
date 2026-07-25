import type { MetadataRoute } from "next";
import { env } from "@/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL;

  const staticRoutes = [
    "",
    "/bestsellers",
    "/login",
    "/create-account",
    "/forgot-password",
    "/reset-password",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const productRoutes = [
    "arizona-soft-footbed",
    "florida-taupe-1",
    "florida-taupe-2",
    "florida-taupe-3",
  ].map((id) => ({
    url: `${baseUrl}/products/${id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
