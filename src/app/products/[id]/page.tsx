import { BenefitsBar } from "@/components/common/benefits-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  getProductDetailById,
  ProductDetailView,
} from "@/features/product-detail";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductDetailById(id);
  return {
    title: `${product.name} | VERSTIVO`,
    description: product.subtitle,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductDetailById(id);

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
