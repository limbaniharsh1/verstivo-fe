"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FormInput } from "./form-input";
import { GoogleIcon } from "./google-icon";
import { CheckCircle2 } from "lucide-react";

export function CreateAccountForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
    } = {};

    // First Name validation
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    // Last Name validation
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

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
        <div className="mb-5 p-3.5 rounded-[10px] bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13.5px] flex items-center gap-2 animate-in fade-in duration-300">
          <CheckCircle2 size={17} className="text-emerald-600 shrink-0" />
          <span>Account created successfully! Welcome to Verstivo.</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
        {/* First Name Field */}
        <FormInput
          placeholder="First name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            if (errors.firstName)
              setErrors((prev) => ({ ...prev, firstName: undefined }));
          }}
          error={errors.firstName}
          autoComplete="given-name"
        />

        {/* Last Name Field */}
        <FormInput
          placeholder="Last name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            if (errors.lastName)
              setErrors((prev) => ({ ...prev, lastName: undefined }));
          }}
          error={errors.lastName}
          autoComplete="family-name"
        />

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

      {/* Divider */}
      <div className="relative flex items-center justify-center my-5">
        <div className="border-t border-neutral-200/90 w-full" />
        <span className="bg-white px-3.5 text-[13px] text-neutral-400 font-normal absolute">
          or
        </span>
      </div>

      {/* Google Sign-up Button */}
      <button
        type="button"
        onClick={() => alert("Google Sign-Up initiated")}
        className="w-full h-[46px] sm:h-[48px] rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 active:scale-[0.99] text-black font-medium text-[14.5px] sm:text-[15px] flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xs"
      >
        <GoogleIcon size={19} />
        <span>Sign up with Google</span>
      </button>
    </div>
  );
}
