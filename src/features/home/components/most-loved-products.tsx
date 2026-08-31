import { ProductCarousel } from "@/features/home/components/product-carousel";
import { TRENDING_PRODUCTS } from "@/features/home/data/trending-products";

export function MostLovedProducts() {
  return (
    <ProductCarousel
      heading="TRENDING FOR YOU"
      headingId="most-loved-products-heading"
      products={TRENDING_PRODUCTS}
      showGenderFilter
    />
  );
}
