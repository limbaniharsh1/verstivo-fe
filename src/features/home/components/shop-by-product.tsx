import { ShopByCard } from "@/features/home/components/shop-by-card";
import { ShopByProductItem } from "@/types/homepage";

interface ShopByProductProps {
  title?: string;
  items?: ShopByProductItem[];
}

export function ShopByProduct({ title = "Shop by Product", items }: ShopByProductProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section
      className="bg-surface py-8 lg:py-14 text-foreground"
      aria-labelledby="shop-by-product-heading"
    >
      <div className="container-main">
        <h2
          id="shop-by-product-heading"
          className="mb-5 sm:mb-6 md:mb-8 text-left text-[22px] min-[375px]:text-[24px] sm:text-[30px] md:text-[32px] lg:text-[36px] font-semibold tracking-[-0.02em]"
        >
          {title}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {items.map((item, index) => {
            const href = item.button?.redirectUrl || "/products";
            const imageSrc = item.image?.url || "";
            const imageAlt = item.image?.alt || item.title || "Product category";
            const buttonText = item.button?.text || "Shop Now";

            return (
              <ShopByCard
                key={index}
                href={href}
                imageSrc={imageSrc}
                imageAlt={imageAlt}
                title={item.title}
                subtitle={item.subtitle}
                buttonText={buttonText}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
