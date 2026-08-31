import { BenefitsBar } from "@/components/common/benefits-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import ShopPageClient from "./shop-page-client";

export const metadata = {
  title: "Shop | PAIRBORN",
  description: "Browse the complete collection of PAIRBORN footwear.",
};

export default function ShopPage() {
  return (
    <>
      <SiteHeader />
      <ShopPageClient />
      <BenefitsBar />
      <SiteFooter />
    </>
  );
}
