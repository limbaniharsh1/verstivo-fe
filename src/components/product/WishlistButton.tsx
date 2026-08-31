"use client";

import React from "react";
import { HeartIcon } from "@/components/common/HeartIcon";

type WishlistButtonProps = {
  productName: string;
  className?: string;
  iconClassName?: string;
  isLiked?: boolean;
  onToggle?: (liked: boolean) => void;
};

export function WishlistButton({
  productName,
  className = "",
  iconClassName = "",
  isLiked = false,
  onToggle,
}: WishlistButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onToggle?.(!isLiked);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-primary ${className}`}
      aria-label={`Add ${productName} to wishlist`}
    >
      <HeartIcon
        filled={isLiked}
        className={`size-4.5 lg:size-5 transition-colors text-black ${iconClassName}`}
      />
    </button>
  );
}
