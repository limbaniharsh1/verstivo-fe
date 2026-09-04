export type ProductBadgeTone = "neutral" | "primary";

export type ProductBadge = {
  label: string;
  tone?: ProductBadgeTone;
};

export interface BaseProduct {
  id: string;
  slug?: string;
  name: string;
  subtitle: string;
  price: string | number;
  originalPrice?: string | number;
  image: string;
  hoverImage?: string;
  imageAlt: string;
  badge?: string | ProductBadge;
  category?: string;
  rating?: number;
  ratingCount?: number;
  defaultColorSlug?: string;
  defaultColorId?: string;
  defaultSize?: number;
  sizes?: number[] | string[];
}
