/**
 * Generates a consistent product detail page URL with optional variant parameters.
 */
export function getProductUrl(
  product: { slug?: string; id?: string; defaultColorSlug?: string; defaultSize?: number },
  options?: { color?: string; size?: string | number }
): string {
  const slug = product.slug || product.id || "arizona-soft-footbed";
  const color = options?.color || product.defaultColorSlug;
  const size = options?.size || product.defaultSize;

  const params = new URLSearchParams();
  if (color) params.set("color", color);
  if (size) params.set("size", String(size));

  const query = params.toString();
  return `/products/${slug}${query ? `?${query}` : ""}`;
}
