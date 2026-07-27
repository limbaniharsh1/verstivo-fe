export type AccountTabType =
  | "personal-info"
  | "shipping-address"
  | "order-history"
  | "wishlist";

export interface AccountTabItem {
  id: AccountTabType;
  label: string;
}

export interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
