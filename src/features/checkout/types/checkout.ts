export interface CheckoutInitRequest {
  addressId: string;
  paymentMethod?: 'PREPAID' | 'COD';
}

export interface CheckoutInitData {
  orderId: string;
  razorpayOrderId: string;
  amount: number; // in paise
  currency: string;
  keyId: string;
  paymentMethod: 'PREPAID' | 'COD';
  totalAmount: number;
  onlineRequiredAmount: number;
  codRequiredAmount: number;
}

export interface CheckoutInitResponse {
  status: number;
  message: string;
  data: CheckoutInitData;
}

export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyPaymentData {
  orderId: string;
  paymentMethod: 'PREPAID' | 'COD';
  paymentStatus: 'Pending' | 'PartiallyPaid' | 'Paid' | 'Failed';
  fulfillmentStatus: 'Processing' | 'Shipped' | 'Delivered';
  totalAmount: number;
  onlineRequiredAmount: number;
  onlinePaidAmount: number;
  codRequiredAmount: number;
  codPaidAmount: number;
  remainingAmount: number;
  razorpayOrderId: string;
  razorpayPaymentId: string;
}

export interface VerifyPaymentResponse {
  status: number;
  message: string;
  data: VerifyPaymentData;
}

export interface UserAddress {
  _id: string;
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface UserOrder {
  _id: string;
  userId: string;
  totalAmount: number;
  paymentMethod: 'PREPAID' | 'COD';
  paymentStatus: 'Pending' | 'PartiallyPaid' | 'Paid' | 'Failed';
  fulfillmentStatus: 'Processing' | 'Shipped' | 'Delivered';
  onlineRequiredAmount?: number;
  onlinePaidAmount?: number;
  codRequiredAmount?: number;
  codPaidAmount?: number;
  createdAt: string;
  updatedAt: string;
}
