import { Suspense } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WishlistTab } from "@/features/account/components/wishlist-tab";

export const metadata = {
  title: "Wishlist | PAIRBORN",
  description: "Your saved products at PAIRBORN.",
};

import { redirect } from "next/navigation";

export default function WishlistPage() {
  redirect("/account?tab=wishlist");
}
