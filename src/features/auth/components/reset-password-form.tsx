"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FormInput } from "./form-input";
import { CheckCircle2 } from "lucide-react";

export function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email address is required.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError(undefined);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate production API email sending
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1000);
  };

  return (
    <div className="w-full max-w-[360px] sm:max-w-[380px] mx-auto py-10 sm:py-16 px-4">
      {/* Title */}
      <h1 className="text-[30px] sm:text-[34px] font-semibold text-black tracking-tight text-center mb-1.5">
        Reset Password
      </h1>

      {/* Subtitle */}
      <p className="text-[14px] sm:text-[15px] text-neutral-500 text-center mb-7">
        We will send you an email to reset your password
      </p>

      {/* Success Notification */}
      {isSent && (
        <div className="mb-5 p-3.5 rounded-[10px] bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13.5px] flex items-center gap-2 animate-in fade-in duration-300">
          <CheckCircle2 size={17} className="text-emerald-600 shrink-0" />
          <span>Verification email sent! Please check your inbox.</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Email* Field */}
        <FormInput
          type="email"
          placeholder="Email*"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(undefined);
          }}
          error={error}
          autoComplete="email"
        />

        {/* Send verification email Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[46px] sm:h-[48px] rounded-full bg-[#0000d6] hover:bg-[#0000b8] active:scale-[0.99] disabled:opacity-70 text-white font-medium text-[14.5px] sm:text-[15px] flex items-center justify-center transition-all cursor-pointer shadow-xs"
        >
          {isSubmitting ? "Sending email..." : "Send verification email"}
        </button>

        {/* Back to login Link */}
        <div className="text-center pt-2">
          <Link
            href="/login"
            className="text-[14.5px] sm:text-[15px] font-semibold text-black hover:underline transition-all inline-block"
          >
            Back to login
          </Link>
        </div>
      </form>
    </div>
  );
}
