"use client";

import React, { useState, useEffect } from "react";
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
      className={`inline-flex transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-primary ${className}`}
      aria-label={`Add ${productName} to wishlist`}
    >
      <HeartIcon
        filled={liked}
        className={`size-4.5 lg:size-5 transition-colors text-black ${iconClassName}`}
      />
    </button>
  );
}
