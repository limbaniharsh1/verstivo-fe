"use client";

import React from "react";
import { GoogleIcon } from "@/features/auth/components/google-icon";

type SocialAuthButtonsProps = {
  onGoogleClick?: () => void;
  label?: string;
};

export function SocialAuthButtons({
  onGoogleClick = () => alert("Google Sign-In initiated"),
  label = "Login with Google",
}: SocialAuthButtonsProps) {
  return (
    <button
      type="button"
      onClick={onGoogleClick}
      className="w-full h-[46px] sm:h-[48px] rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 active:scale-[0.99] text-black font-medium text-[14.5px] sm:text-[15px] flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xs"
    >
      <GoogleIcon size={19} />
      <span>{label}</span>
    </button>
  );
}
