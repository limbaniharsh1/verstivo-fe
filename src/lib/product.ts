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

/**
 * Helper to retrieve the medium-quality thumb and hover images from a product's selected or default color variant.
 */
export function getProductCardImages(colorVariant: any): { image: string; hoverImage?: string; imageAlt?: string } {
  if (!colorVariant || !colorVariant.images || colorVariant.images.length === 0) {
    return { image: "" };
  }

  const images = colorVariant.images;

  // 1. Determine the thumb (main) image
  // Check if any image is explicitly marked as isThumb (handling both boolean and string versions)
  const thumbImg = images.find((img: any) => img.isThumb === true || img.isThumb === "true") || images[0];
  const image = thumbImg?.medium || thumbImg?.low || thumbImg?.high || "";
  const imageAlt = thumbImg?.alt;

  // 2. Determine the hover image
  // Check if any image is explicitly marked as isHover
  const hoverImg = images.find((img: any) => img.isHover === true || img.isHover === "true");
  const hoverImage = hoverImg ? (hoverImg.medium || hoverImg.low || hoverImg.high) : undefined;

  return {
    image,
    hoverImage,
    imageAlt,
  };
}

