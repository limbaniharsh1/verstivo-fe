export interface MenuColumnLink {
  label: string;
  href: string;
  isShopAll?: boolean;
}

export interface MenuColumn {
  title: string;
  links: MenuColumnLink[];
}

export interface FeaturedMenuItem {
  id: string;
  name: string;
  href: string;
  image: string;
}

export interface MegaMenuContent {
  columns: MenuColumn[];
  featuredItems: FeaturedMenuItem[];
  shopAllHref: string;
}

export type MegaMenuCategoryKey = "shop" | "men" | "women";
