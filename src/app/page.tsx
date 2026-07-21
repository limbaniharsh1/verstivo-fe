import { SiteHeader } from "@/components/layout/site-header";
import { CraftsmanshipSection } from "@/features/home/components/craftsmanship-section";
import { HeroBanner } from "@/features/home/components/hero-banner";
import { MostLovedProducts } from "@/features/home/components/most-loved-products";
import { PromotionalSplit } from "@/features/home/components/promotional-split";
import { ShopByProduct } from "@/features/home/components/shop-by-product";
import { TrendingProducts } from "@/features/home/components/trending-products";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroBanner />
        <TrendingProducts />
        <PromotionalSplit />
        <ShopByProduct />
        <CraftsmanshipSection />
        <MostLovedProducts />
      </main>
    </>
  );
}
