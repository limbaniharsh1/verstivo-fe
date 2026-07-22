import { MegaMenuCategoryKey, MegaMenuContent } from "../types/mega-menu-types";

export const MEGA_MENU_DATA: Record<MegaMenuCategoryKey, MegaMenuContent> = {
  shop: {
    shopAllHref: "/shop",
    columns: [
      {
        title: "MATERIAL",
        links: [
          { label: "Leather", href: "/shop?material=leather" },
          { label: "Vegan", href: "/shop?material=vegan" },
          { label: "Water Friendly", href: "/shop?material=water-friendly" },
          { label: "Shop All", href: "/shop?material=all", isShopAll: true },
        ],
      },
      {
        title: "CATEGORY",
        links: [
          { label: "Two Strap", href: "/shop?category=two-strap" },
          { label: "Thong Sandals", href: "/shop?category=thong-sandals" },
          { label: "Clogs", href: "/shop?category=clogs" },
          { label: "Shoes & Boots", href: "/shop?category=shoes-boots" },
          { label: "Professional", href: "/shop?category=professional" },
          { label: "Shop All", href: "/shop?category=all", isShopAll: true },
        ],
      },
      {
        title: "COLOR",
        links: [
          { label: "Black", href: "/shop?color=black" },
          { label: "Brown & Beige", href: "/shop?color=brown-beige" },
          { label: "White & Grey", href: "/shop?color=white-grey" },
          { label: "Blue", href: "/shop?color=blue" },
          { label: "Shop All", href: "/shop?color=all", isShopAll: true },
        ],
      },
    ],
    featuredItems: [
      {
        id: "arizona",
        name: "Arizona",
        href: "/product/arizona",
        image: "/assets/images/menu/arizona.png",
      },
      {
        id: "gizeh",
        name: "Gizeh",
        href: "/product/gizeh",
        image: "/assets/images/menu/gizeh.png",
      },
      {
        id: "boston",
        name: "Boston",
        href: "/product/boston",
        image: "/assets/images/menu/boston.png",
      },
      {
        id: "mayari",
        name: "Mayari",
        href: "/product/mayari",
        image: "/assets/images/menu/mayari.png",
      },
      {
        id: "water-friendly",
        name: "Water Friendly",
        href: "/product/water-friendly",
        image: "/assets/images/menu/water-friendly.png",
      },
      {
        id: "uji",
        name: "Uji",
        href: "/product/uji",
        image: "/assets/images/menu/uji.png",
      },
      {
        id: "safaga",
        name: "Safaga",
        href: "/product/safaga",
        image: "/assets/images/menu/safaga.png",
      },
    ],
  },

  men: {
    shopAllHref: "/men",
    columns: [
      {
        title: "MATERIAL",
        links: [
          { label: "Leather", href: "/men?material=leather" },
          { label: "Oiled Leather", href: "/men?material=oiled-leather" },
          { label: "Water Friendly", href: "/men?material=water-friendly" },
          { label: "Shop All", href: "/men?material=all", isShopAll: true },
        ],
      },
      {
        title: "CATEGORY",
        links: [
          { label: "Two Strap Sandals", href: "/men?category=two-strap" },
          { label: "Clogs & Mules", href: "/men?category=clogs" },
          { label: "Slide Sandals", href: "/men?category=slides" },
          { label: "Boots & Shoes", href: "/men?category=boots" },
          { label: "Shop All", href: "/men?category=all", isShopAll: true },
        ],
      },
      {
        title: "COLOR",
        links: [
          { label: "Black", href: "/men?color=black" },
          { label: "Brown & Tan", href: "/men?color=brown-tan" },
          { label: "Grey & Earthy", href: "/men?color=grey" },
          { label: "Navy Blue", href: "/men?color=navy" },
          { label: "Shop All", href: "/men?color=all", isShopAll: true },
        ],
      },
    ],
    featuredItems: [
      {
        id: "arizona",
        name: "Arizona",
        href: "/product/arizona",
        image: "/assets/images/menu/arizona.png",
      },
      {
        id: "boston",
        name: "Boston",
        href: "/product/boston",
        image: "/assets/images/menu/boston.png",
      },
      {
        id: "water-friendly",
        name: "Water Friendly",
        href: "/product/water-friendly",
        image: "/assets/images/menu/water-friendly.png",
      },
      {
        id: "uji",
        name: "Uji",
        href: "/product/uji",
        image: "/assets/images/menu/uji.png",
      },
      {
        id: "safaga",
        name: "Safaga",
        href: "/product/safaga",
        image: "/assets/images/menu/safaga.png",
      },
    ],
  },

  women: {
    shopAllHref: "/women",
    columns: [
      {
        title: "MATERIAL",
        links: [
          { label: "Soft Leather", href: "/women?material=leather" },
          { label: "Vegan Collection", href: "/women?material=vegan" },
          { label: "Water Friendly", href: "/women?material=water-friendly" },
          { label: "Shop All", href: "/women?material=all", isShopAll: true },
        ],
      },
      {
        title: "CATEGORY",
        links: [
          { label: "Thong Sandals", href: "/women?category=thong-sandals" },
          { label: "Two Strap Sandals", href: "/women?category=two-strap" },
          { label: "Platform & Wedge", href: "/women?category=platform" },
          { label: "Clogs & Mules", href: "/women?category=clogs" },
          { label: "Shop All", href: "/women?category=all", isShopAll: true },
        ],
      },
      {
        title: "COLOR",
        links: [
          { label: "White & Cream", href: "/women?color=white-cream" },
          { label: "Metallic & Gold", href: "/women?color=metallic" },
          { label: "Beige & Mocha", href: "/women?color=beige" },
          { label: "Classic Black", href: "/women?color=black" },
          { label: "Shop All", href: "/women?color=all", isShopAll: true },
        ],
      },
    ],
    featuredItems: [
      {
        id: "gizeh",
        name: "Gizeh",
        href: "/product/gizeh",
        image: "/assets/images/menu/gizeh.png",
      },
      {
        id: "mayari",
        name: "Mayari",
        href: "/product/mayari",
        image: "/assets/images/menu/mayari.png",
      },
      {
        id: "arizona",
        name: "Arizona",
        href: "/product/arizona",
        image: "/assets/images/menu/arizona.png",
      },
      {
        id: "uji",
        name: "Uji",
        href: "/product/uji",
        image: "/assets/images/menu/uji.png",
      },
      {
        id: "boston",
        name: "Boston",
        href: "/product/boston",
        image: "/assets/images/menu/boston.png",
      },
    ],
  },
};
