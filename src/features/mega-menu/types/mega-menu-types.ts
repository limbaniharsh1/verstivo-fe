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

export interface BackendAttribute {
  _id: string;
  name: string;
  slug: string;
  menuSection: "men" | "women" | "both";
  isActive: boolean;
  colorCode?: string;
  megaMenuImage?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
  };
}

export interface BackendAttributes {
  categories: BackendAttribute[];
  colors: BackendAttribute[];
  materials: BackendAttribute[];
  collections: any[];
}

