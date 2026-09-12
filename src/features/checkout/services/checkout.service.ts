import { apiClient } from "@/lib/api-client";
import {
  CheckoutInitRequest,
  CheckoutInitResponse,
  VerifyPaymentRequest,
  VerifyPaymentResponse,
} from "../types/checkout";

/**
 * Initiates the checkout flow on the backend.
 * Validates the user's cart, calculates the trusted total server-side,
 * creates the internal pending order, creates the Razorpay Order,
 * and returns the authoritative checkout parameters including the public keyId.
 *
 * @param addressId - Selected user shipping address MongoDB ObjectId.
 * @param paymentMethod - Payment method choice: 'PREPAID' (100% online) or 'COD' (50% online advance).
 */
export async function initiateCheckout(
  addressId: string,
  paymentMethod: 'PREPAID' | 'COD' = 'PREPAID'
): Promise<CheckoutInitResponse> {
  const payload: CheckoutInitRequest = { addressId, paymentMethod };
  return apiClient.post<CheckoutInitResponse>("/orders/checkout", payload);
}

/**
 * Verifies payment authenticity on the backend.
 * Performs cryptographic HMAC SHA-256 signature verification,
 * gateway payment reconciliation (amount, currency, status),
 * and triggers idempotent order fulfillment.
 *
 * @param payload - Razorpay modal response containing order ID, payment ID, and signature.
 */
export async function verifyPayment(payload: VerifyPaymentRequest): Promise<VerifyPaymentResponse> {
  return apiClient.post<VerifyPaymentResponse>("/orders/verify", payload);
}
