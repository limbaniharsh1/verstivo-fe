import React from "react";

type ProductSkeletonProps = {
  className?: string;
};

export function ProductSkeleton({ className = "" }: ProductSkeletonProps) {
  return (
    <div className={`flex flex-col w-full animate-pulse select-none ${className}`}>
      {/* Product Image Box Skeleton */}
      <div className="relative aspect-[0.98/1] w-full rounded-lg bg-neutral-200" />

      {/* Info Content Skeletons */}
      <div className="pt-3 pb-2 px-1">
        {/* Title */}
        <div className="h-4 w-3/4 bg-neutral-200 rounded-md" />

        {/* Subtitle */}
        <div className="h-3 w-1/2 bg-neutral-100 rounded-md mt-2" />

        {/* Price */}
        <div className="h-4 w-1/3 bg-neutral-200 rounded-md mt-3.5" />
      </div>
    </div>
  );
}

type ProductGridSkeletonProps = {
  count?: number;
  gridClassName?: string;
};

export function ProductGridSkeleton({
  count = 4,
  gridClassName = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5",
}: ProductGridSkeletonProps) {
  return (
    <div className={gridClassName}>
      {Array.from({ length: count }).map((_, idx) => (
        <ProductSkeleton key={idx} />
      ))}
    </div>
  );
}
