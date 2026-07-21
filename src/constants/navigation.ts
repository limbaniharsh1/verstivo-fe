export type NavigationItem = {
  label: string;
  href: string;
  badge?: string;
};

export const PRIMARY_NAVIGATION: readonly NavigationItem[] = [
  { label: "Shop", href: "/shop" },
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Summer Sale", href: "/sale", badge: "NEW" },
  { label: "Bestseller", href: "/bestsellers" },
];
