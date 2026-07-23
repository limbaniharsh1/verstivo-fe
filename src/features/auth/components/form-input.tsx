"use client";

import React, { useState, forwardRef } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isPassword?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, isPassword = false, type = "text", className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full space-y-1">
        {label && (
          <label className="block text-[13.5px] font-medium text-black mb-1">
            {label}
          </label>
        )}
        <div
          className={`relative flex items-center h-[46px] sm:h-[48px] w-full rounded-[10px] sm:rounded-[12px] border bg-white px-3.5 sm:px-4 transition-all duration-200 ${
            error
              ? "border-rose-500 focus-within:border-rose-500 focus-within:ring-1 focus-within:ring-rose-500"
              : "border-neutral-300/90 focus-within:border-black focus-within:ring-1 focus-within:ring-black"
          }`}
        >
          <input
            ref={ref}
            type={inputType}
            className={`w-full h-full bg-transparent text-[14px] sm:text-[14.5px] text-black placeholder:text-neutral-400 focus:outline-none ${className}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="p-1 text-neutral-500 hover:text-black transition-colors cursor-pointer shrink-0 ml-2"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff size={19} strokeWidth={1.5} />
              ) : (
                <Eye size={19} strokeWidth={1.5} />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="text-[12.5px] text-rose-600 font-medium mt-1.5 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
            <AlertCircle size={14} className="shrink-0" />
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
