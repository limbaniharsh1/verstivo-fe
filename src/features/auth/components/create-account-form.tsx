"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FormInput } from "./form-input";
import { createAccountSchema, type CreateAccountSchemaType } from "@/lib/schemas/auth";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { AuthSuccessBanner } from "@/components/auth/AuthSuccessBanner";

export function CreateAccountForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateAccountSchemaType>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (_data: CreateAccountSchemaType) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSuccess(true);
    toast.success("Account created successfully!");
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="w-full max-w-[360px] sm:max-w-[380px] mx-auto py-10 sm:py-16 px-4">
      {/* Title */}
      <h1 className="text-[30px] sm:text-[34px] font-semibold text-black tracking-tight text-center mb-1.5">
        Create Account
      </h1>

      {/* Subtitle with Switch Link */}
      <p className="text-[14px] sm:text-[15px] text-neutral-600 text-center mb-7">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-black underline underline-offset-4 hover:opacity-75 transition-opacity"
        >
          Log in.
        </Link>
      </p>

      {/* Success Notification */}
      {isSuccess && (
        <AuthSuccessBanner message="Account created successfully! Welcome to Blupair." />
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
        {/* First Name Field */}
        <FormInput
          placeholder="First name"
          {...register("firstName")}
          error={errors.firstName?.message}
          autoComplete="given-name"
        />

        {/* Last Name Field */}
        <FormInput
          placeholder="Last name"
          {...register("lastName")}
          error={errors.lastName?.message}
          autoComplete="family-name"
        />

        {/* Email Field */}
        <FormInput
          type="email"
          placeholder="Email"
          {...register("email")}
          error={errors.email?.message}
          autoComplete="email"
        />

        {/* Password Field */}
        <FormInput
          isPassword
          placeholder="Password"
          {...register("password")}
          error={errors.password?.message}
          autoComplete="new-password"
        />

        {/* Main Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[46px] sm:h-[48px] rounded-full bg-[#0000d6] hover:bg-[#0000b8] active:scale-[0.99] disabled:opacity-70 text-white font-medium text-[14.5px] sm:text-[15px] flex items-center justify-center transition-all cursor-pointer shadow-xs"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </div>
      </form>

      <AuthDivider />

      <SocialAuthButtons label="Sign up with Google" onGoogleClick={() => toast.info("Google Sign-Up initiated")} />
    </div>
  );
}


