import { ProductCard } from "@/features/home/components/product-card";
import type { Product } from "@/features/home/data/trending-products";

type BestsellerGridProps = {
  products: readonly Product[];
};

export function BestsellerGrid({ products }: BestsellerGridProps) {
  return (
    <section className="w-full bg-white pb-10 sm:pb-12 lg:pb-16 pt-1">
      <div className="mx-auto w-full max-w-[1585px] px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-1 gap-y-3 min-[360px]:gap-y-3.5 sm:gap-y-6 lg:gap-y-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
