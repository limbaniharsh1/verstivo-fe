import { BenefitsBar } from "@/components/common/benefits-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  BESTSELLER_PRODUCTS,
  BestsellerGrid,
  BestsellerHero,
  BestsellerToolbar,
} from "@/features/bestsellers";

export const metadata = {
  title: "Bestsellers | VERSTIVO",
  description:
    "Explore VERSTIVO's top-selling iconic footwear including Florida Soft Footbed Birko-Flor sandals.",
};

export default function BestsellersPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white">
        <BestsellerHero />
        <BestsellerToolbar totalCount={BESTSELLER_PRODUCTS.length} />
        <BestsellerGrid products={BESTSELLER_PRODUCTS} />
        <BenefitsBar />
      </main>
      <SiteFooter />
    </>
  );
}
