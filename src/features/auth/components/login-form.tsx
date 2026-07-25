"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FormInput } from "./form-input";
import { loginSchema, type LoginSchemaType } from "@/lib/schemas/auth";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { AuthSuccessBanner } from "@/components/auth/AuthSuccessBanner";

export function LoginForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (_data: LoginSchemaType) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSuccess(true);
    toast.success("Logged in successfully!");
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="w-full max-w-[360px] sm:max-w-[380px] mx-auto py-10 sm:py-16 px-4">
      {/* Title */}
      <h1 className="text-[30px] sm:text-[34px] font-semibold text-black tracking-tight text-center mb-1.5">
        Log In
      </h1>

      {/* Subtitle with Switch Link */}
      <p className="text-[14px] sm:text-[15px] text-neutral-600 text-center mb-7">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-black underline underline-offset-4 hover:opacity-75 transition-opacity"
        >
          Create an account.
        </Link>
      </p>

      {/* Success Notification */}
      {isSuccess && <AuthSuccessBanner message="Logged in successfully! Redirecting..." />}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
        {/* Email Field */}
        <FormInput
          type="email"
          placeholder="Email"
          {...register("email")}
          error={errors.email?.message}
          autoComplete="email"
        />

        {/* Password Field */}
        <div>
          <FormInput
            isPassword
            placeholder="Password"
            {...register("password")}
            error={errors.password?.message}
            autoComplete="current-password"
          />

          {/* Forgot Password Link */}
          <div className="text-right mt-1.5">
            <Link
              href="/reset-password"
              className="text-[13px] font-semibold text-black underline underline-offset-4 hover:opacity-75 transition-opacity inline-block"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        {/* Main Log in Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[46px] sm:h-[48px] rounded-full bg-[#0000d6] hover:bg-[#0000b8] active:scale-[0.99] disabled:opacity-70 text-white font-medium text-[14.5px] sm:text-[15px] flex items-center justify-center transition-all cursor-pointer shadow-xs"
          >
            {isSubmitting ? "Signing in..." : "Log in"}
          </button>
        </div>
      </form>

      <AuthDivider />

      <SocialAuthButtons label="Login with Google" />
    </div>
  );
}


