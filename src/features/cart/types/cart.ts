export interface ProductItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  formattedPrice: string;
  formattedOriginalPrice?: string;
  size?: string;
  image: string;
  imageAlt: string;
  sizes?: number[];
  stock?: number;
  isAvailable?: boolean;
  hasSufficientStock?: boolean;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  editingSizeItemId: string | null;
  sizeDrawerProduct: any | null;
  isSizeDrawerOpen: boolean;
  openSizeDrawer: (product: any) => void;
  closeSizeDrawer: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: ProductItem, quantity?: number) => Promise<boolean>;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateSize: (productId: string, size: string) => void;
  setEditingSizeItemId: (productId: string | null) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  formattedSubtotal: string;
}
