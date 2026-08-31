import React from "react";
import type { ProductBadge as ProductBadgeType } from "@/types/product";

type ProductBadgeProps = {
  badge: string | ProductBadgeType;
  className?: string;
};

export function ProductBadge({ badge, className = "" }: ProductBadgeProps) {
  if (!badge) return null;

  const label = typeof badge === "string" ? badge : badge.label;
  const tone = typeof badge === "string" ? "neutral" : badge.tone || "neutral";

  const badgeClassName =
    tone === "primary"
      ? "bg-primary text-primary-contrast"
      : "bg-surface text-foreground";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs min-[375px]:text-sm sm:text-[13px] font-medium pointer-events-none inline-flex items-center justify-center ${badgeClassName} ${className}`}
    >
      {label}
    </span>
  );
}
