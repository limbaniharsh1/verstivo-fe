import { ProductCarousel } from "@/features/home/components/product-carousel";
import { TRENDING_PRODUCTS } from "@/features/home/data/trending-products";

export function TrendingProducts() {
  return (
    <ProductCarousel
      heading="New Arrivals & Trending Picks"
      headingId="trending-products-heading"
      products={TRENDING_PRODUCTS}
    />
  );
}
