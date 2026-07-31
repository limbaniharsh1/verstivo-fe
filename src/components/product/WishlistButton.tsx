"use client";

import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    setLiked(initialLiked);
  }, [initialLiked]);

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
      className={`grid size-8 place-items-center rounded-full transition-colors cursor-pointer hover:bg-surface focus-visible:outline-2 focus-visible:outline-primary ${className}`}
      aria-label={`Add ${productName} to wishlist`}
    >
      <Heart
        className={`size-5 transition-colors ${
          liked ? "fill-black text-black" : "text-black"
        } ${iconClassName}`}
        strokeWidth={1.6}
      />
    </button>
  );
}
