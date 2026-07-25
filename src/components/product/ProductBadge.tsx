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
      className={`rounded-full px-2 py-0.5 text-[9.5px] min-[375px]:text-[10px] sm:text-[10.5px] md:text-[11px] font-medium shadow-xs pointer-events-none ${badgeClassName} ${className}`}
    >
      {label}
    </span>
  );
}
