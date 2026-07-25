import React from "react";
import { Star } from "lucide-react";

type ProductRatingProps = {
  rating: number;
  count?: number;
  maxStars?: number;
  starSize?: number;
  className?: string;
};

export function ProductRating({
  rating,
  count,
  maxStars = 5,
  starSize = 14,
  className = "",
}: ProductRatingProps) {
  return (
    <div className={`flex items-center gap-1 text-amber-500 ${className}`}>
      {Array.from({ length: maxStars }).map((_, i) => (
        <Star
          key={i}
          size={starSize}
          className={i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-neutral-300"}
        />
      ))}
      {count !== undefined ? (
        <span className="text-[11px] text-neutral-500 font-medium ml-1">({count})</span>
      ) : null}
    </div>
  );
}
