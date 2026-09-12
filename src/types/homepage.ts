import { BaseProduct } from "./product";

export type HomepageSectionType =
  | "hero"
  | "product_slider"
  | "shop_by_product"
  | "promotional_split"
  | "craftsmanship"
  | "social_gallery"
  | "media"
  | "collection_cards";

export type ProductSliderSource = "manual" | "new_arrivals" | "bestseller" | "collection";

export interface ImageRef {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface ButtonRef {
  text: string;
  redirectUrl: string;
}

export interface HeroContent {
  title: string;
  description?: string;
  desktopImage: ImageRef;
  mobileImage?: { url?: string; alt?: string };
  button?: ButtonRef;
}

export interface ProductSliderContent {
  title: string;
  subtitle?: string;
  source: ProductSliderSource;
  limit?: number;
  productIds?: string[];
  products?: BaseProduct[];
}

export interface ShopByProductItem {
  title: string;
  subtitle?: string;
  image: ImageRef;
  button: ButtonRef;
  sortOrder?: number;
}

export interface ShopByProductContent {
  title?: string;
  items: ShopByProductItem[];
}

export interface PromotionalSplitCard {
  title: string;
  description?: string;
  image: ImageRef;
  button: ButtonRef;
}

export interface PromotionalSplitContent {
  cards: PromotionalSplitCard[];
}

export interface CraftsmanshipContent {
  title: string;
  paragraphs: string[];
  image: ImageRef;
  imagePosition?: "left" | "right";
  button?: ButtonRef;
}

export interface SocialGalleryItem {
  id?: string;
  mediaUrl: string;
  mediaAlt?: string;
  redirectUrl?: string;
  productReference?: {
    title?: string;
    subtitle?: string;
    price?: string;
    thumbnail?: string;
  };
  sortOrder?: number;
}

export interface SocialGalleryContent {
  heading: string;
  description?: string;
  button?: ButtonRef;
  items: SocialGalleryItem[];
}

export interface MediaSettings {
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export interface MediaContent {
  title?: string;
  description?: string;
  mediaType: "image" | "gif" | "video";
  mediaUrl: string;
  posterUrl?: string;
  button?: ButtonRef;
  settings?: MediaSettings;
}

export interface CollectionCardItem {
  id: string;
  name: string;
  slug: string;
  title: string;
  description: string;
  image: {
    url: string;
    alt?: string;
  };
  button: {
    text: string;
    redirectUrl: string;
  };
  isActive: boolean;
}

export interface CollectionCardsContent {
  collectionIds: string[];
  collections: CollectionCardItem[];
}

export interface IHomepageSection<T = any> {
  id: string;
  type: HomepageSectionType;
  sortOrder: number;
  content: T;
  isActive?: boolean;
}

export interface HomepageData {
  sections: IHomepageSection[];
}

export interface HomepageApiResponse {
  status: number;
  message: string;
  data: HomepageData;
}
