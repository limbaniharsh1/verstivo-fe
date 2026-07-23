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
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  editingSizeItemId: string | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: ProductItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateSize: (productId: string, size: string) => void;
  setEditingSizeItemId: (productId: string | null) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  formattedSubtotal: string;
}
