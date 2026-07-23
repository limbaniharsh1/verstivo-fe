"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FormInput } from "./form-input";
import { GoogleIcon } from "./google-icon";
import { CheckCircle2 } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate production API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1000);
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
      {isSuccess && (
        <div className="mb-5 p-3.5 rounded-[10px] bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13.5px] flex items-center gap-2 animate-in fade-in duration-300">
          <CheckCircle2 size={17} className="text-emerald-600 shrink-0" />
          <span>Logged in successfully! Redirecting...</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
        {/* Email Field */}
        <FormInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          error={errors.email}
          autoComplete="email"
        />

        {/* Password Field */}
        <div>
          <FormInput
            isPassword
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password)
                setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            error={errors.password}
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

      {/* Divider */}
      <div className="relative flex items-center justify-center my-5">
        <div className="border-t border-neutral-200/90 w-full" />
        <span className="bg-white px-3.5 text-[13px] text-neutral-400 font-normal absolute">
          or
        </span>
      </div>

      {/* Google Login Button */}
      <button
        type="button"
        onClick={() => alert("Google Sign-In initiated")}
        className="w-full h-[46px] sm:h-[48px] rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 active:scale-[0.99] text-black font-medium text-[14.5px] sm:text-[15px] flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xs"
      >
        <GoogleIcon size={19} />
        <span>Login with Google</span>
      </button>
    </div>
  );
}
