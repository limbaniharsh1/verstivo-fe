import { BenefitsBar } from "@/components/common/benefits-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  getProductDetailById,
  ProductDetailView,
} from "@/features/product-detail";

export const metadata = {
  title: "Product Details | VERSTIVO",
  description: "Arizona Soft Footbed Suede Leather sandals details.",
};

export default function ProductDetailsStaticPage() {
  const product = getProductDetailById("arizona-soft-footbed");

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white">
        <ProductDetailView product={product} />
        <BenefitsBar />
      </main>
      <SiteFooter />
    </>
  );
}
