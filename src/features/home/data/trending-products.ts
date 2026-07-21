export type ProductBadge = {
  label: string;
  tone: "neutral" | "primary";
};

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  image: string;
  imageAlt: string;
  badge?: ProductBadge;
};

const productDetails = {
  name: "Florida Soft Footbed",
  subtitle: "Florida Soft Footbed Birko-Flor",
  price: "₹6,293.00",
  image: "/assets/images/florida-soft-footbed.png",
  imageAlt: "Florida Soft Footbed sandals in taupe",
} as const;

export const TRENDING_PRODUCTS: readonly Product[] = [
  {
    id: "florida-taupe-1",
    ...productDetails,
    badge: { label: "Bestseller", tone: "neutral" },
  },
  {
    id: "florida-taupe-2",
    ...productDetails,
    badge: { label: "30% OFF", tone: "primary" },
  },
  {
    id: "florida-taupe-3",
    ...productDetails,
    badge: { label: "Bestseller", tone: "neutral" },
  },
  {
    id: "florida-taupe-4",
    ...productDetails,
    badge: { label: "30% OFF", tone: "primary" },
  },
];
