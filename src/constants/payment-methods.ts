export interface PaymentMethod {
  name: string;
  icon: string;
}

export const PAYMENT_METHODS: readonly PaymentMethod[] = [
  { name: "Razorpay", icon: "/assets/icons/svg/razorpay.svg" },
  { name: "RuPay", icon: "/assets/icons/svg/rupay.svg" },
  { name: "G Pay", icon: "/assets/icons/svg/gpay.svg" },
  { name: "PhonePe", icon: "/assets/icons/svg/phonepe.svg" },
  { name: "Paytm", icon: "/assets/icons/svg/paytm.svg" },
  { name: "BHIM", icon: "/assets/icons/svg/bhim.svg" },
] as const;
