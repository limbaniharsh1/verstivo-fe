import type { Product } from "@/features/home/data/trending-products";

const productBase = {
  name: "Florida Soft Footbed",
  subtitle: "FLORIDA SOFT FOOTBED BIRKO-FLOR",
  price: "₹6,293.00",
  image: "/assets/images/florida-soft-footbed.png",
  imageAlt: "Florida Soft Footbed Birko-Flor sandals in taupe",
  badge: {
    label: "Bestseller",
    tone: "neutral" as const,
  },
};

export const BESTSELLER_PRODUCTS: readonly Product[] = Array.from({ length: 12 }, (_, index) => ({
  id: `bestseller-florida-${index + 1}`,
  ...productBase,
}));
