export type ProductBadgeTone = "neutral" | "primary";

export type ProductBadge = {
  label: string;
  tone?: ProductBadgeTone;
};

export interface BaseProduct {
  id: string;
  name: string;
  subtitle: string;
  price: string | number;
  image: string;
  imageAlt: string;
  badge?: string | ProductBadge;
  category?: string;
  rating?: number;
  ratingCount?: number;
}
