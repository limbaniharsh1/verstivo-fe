export type SearchProduct = {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  image: string;
  imageAlt: string;
  badge?: string;
  category: string;
};

export const MOST_SEARCHED_TAGS = [
  "Most searched",
  "Soft Footbed",
  "Birko-Flor",
  "Sandals",
  "Clogs",
  "Bestseller",
] as const;

export const SEARCH_PRODUCTS: readonly SearchProduct[] = [
  {
    id: "search-1",
    name: "Florida Soft Footbed",
    subtitle: "FLORIDA SOFT FOOTBED BIRKO-FLOR",
    price: "₹6,293.00",
    image: "/assets/images/florida-soft-footbed.png",
    imageAlt: "Florida Soft Footbed sandals in taupe",
    badge: "Bestseller",
    category: "Soft Footbed",
  },
  {
    id: "search-2",
    name: "Florida Soft Footbed",
    subtitle: "FLORIDA SOFT FOOTBED BIRKO-FLOR",
    price: "₹6,293.00",
    image: "/assets/images/florida-soft-footbed.png",
    imageAlt: "Florida Soft Footbed sandals in taupe",
    badge: "Bestseller",
    category: "Birko-Flor",
  },
  {
    id: "search-3",
    name: "Florida Soft Footbed",
    subtitle: "FLORIDA SOFT FOOTBED BIRKO-FLOR",
    price: "₹6,293.00",
    image: "/assets/images/florida-soft-footbed.png",
    imageAlt: "Florida Soft Footbed sandals in taupe",
    badge: "Bestseller",
    category: "Sandals",
  },
  {
    id: "search-4",
    name: "Florida Soft Footbed",
    subtitle: "FLORIDA SOFT FOOTBED BIRKO-FLOR",
    price: "₹6,293.00",
    image: "/assets/images/florida-soft-footbed.png",
    imageAlt: "Florida Soft Footbed sandals in taupe",
    badge: "Bestseller",
    category: "Clogs",
  },
  {
    id: "search-5",
    name: "Florida Soft Footbed",
    subtitle: "FLORIDA SOFT FOOTBED BIRKO-FLOR",
    price: "₹6,293.00",
    image: "/assets/images/florida-soft-footbed.png",
    imageAlt: "Florida Soft Footbed sandals in taupe",
    badge: "Bestseller",
    category: "Bestseller",
  },
];
