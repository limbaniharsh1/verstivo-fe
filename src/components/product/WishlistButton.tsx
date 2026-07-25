"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";

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
  isLiked: initialLiked = false,
  onToggle,
}: WishlistButtonProps) {
  const [liked, setLiked] = useState(initialLiked);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const nextLiked = !liked;
    setLiked(nextLiked);
    onToggle?.(nextLiked);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`grid size-7 sm:size-7.5 md:size-8 place-items-center rounded-full transition-colors cursor-pointer hover:bg-surface focus-visible:outline-2 focus-visible:outline-primary ${className}`}
      aria-label={`Add ${productName} to wishlist`}
    >
      <Heart
        className={`size-4 min-[375px]:size-5 sm:size-4.5 lg:size-5.5 transition-colors ${
          liked ? "fill-red-500 text-red-500" : "text-foreground"
        } ${iconClassName}`}
        strokeWidth={1.6}
      />
    </button>
  );
}
