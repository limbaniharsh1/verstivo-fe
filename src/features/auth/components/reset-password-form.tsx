"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FormInput } from "./form-input";
import { resetPasswordSchema, type ResetPasswordSchemaType } from "@/lib/schemas/auth";
import { AuthSuccessBanner } from "@/components/auth/AuthSuccessBanner";

export function ResetPasswordForm() {
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (_data: ResetPasswordSchemaType) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSent(true);
    toast.success("Verification email sent!");
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
        <AuthSuccessBanner message="Verification email sent! Please check your inbox." />
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Email* Field */}
        <FormInput
          type="email"
          placeholder="Email*"
          {...register("email")}
          error={errors.email?.message}
          autoComplete="email"
        />

        {/* Send verification email Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[46px] sm:h-[48px] rounded-full bg-primary hover:bg-primary-hover active:scale-[0.99] disabled:opacity-70 text-white font-medium text-[14.5px] sm:text-[15px] flex items-center justify-center transition-all cursor-pointer shadow-xs"
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


