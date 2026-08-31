"use client";

import React from "react";
import { Check } from "lucide-react";
import { CartIcon } from "@/components/common/CartIcon";
import { cn } from "@/lib/utils";

type AddButtonProps = {
  isAdded?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  ariaLabel?: string;
};

export function AddButton({
  isAdded = false,
  onClick,
  className,
  ariaLabel = "Add to cart",
}: AddButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("btn-add", className)}
      aria-label={ariaLabel}
    >
      {isAdded ? (
        <span className="flex items-center justify-center gap-1.5">
          <Check size={14} strokeWidth={2.5} />
          <span>Added</span>
        </span>
      ) : (
        <span className="relative flex items-center justify-center pl-0 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/btn:pl-6">
          <span className="absolute left-1/2 -translate-x-1/2 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/btn:left-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 shrink-0 flex items-center justify-center">
            <CartIcon className="h-[1.05em] w-[1.05em]" />
          </span>
          <span className="shrink-0">
            Add
          </span>
        </span>
      )}
    </button>
  );
}
