import { ShopByCard } from "@/features/home/components/shop-by-card";

const SHOP_BY_ITEMS = [
  {
    href: "/men",
    imageSrc: "/assets/shopBy/94994ef23d31981c4b6faf2f4a52ce2afcfc8c7c.png",
    imageAlt: "Person reading while wearing brown thong sandals",
  },
  {
    href: "/women",
    imageSrc: "/assets/shopBy/d2f8c92d626beeba2153a7ff588daabdadff7cfe.png",
    imageAlt: "Person wearing red triple-strap sandals",
  },
  {
    href: "/clogs",
    imageSrc: "/assets/shopBy/15525abe1aa2ecbce135b2687b695b356ac8a1cb.png",
    imageAlt: "Person holding a pair of taupe clogs",
  },
  {
    href: "/sandals",
    imageSrc: "/assets/shopBy/95f39fa856f19962e5f1c423485eeead5ff6745a.png",
    imageAlt: "Person wearing black buckle sandals",
  },
] as const;

export function ShopByProduct() {
  return (
    <section
      className="bg-surface px-5 py-10 text-foreground sm:px-8 lg:px-11 lg:py-12"
      aria-labelledby="shop-by-product-heading"
    >
      <div className="mx-auto max-w-[1440px]">
        <h2
          id="shop-by-product-heading"
          className="mb-6 text-[26px] leading-tight font-semibold tracking-[-0.03em] text-foreground sm:text-[30px]"
        >
          Shop by Product
        </h2>

        <ul className="scrollbar-hidden flex snap-x snap-mandatory gap-0.5 overflow-x-auto">
          {SHOP_BY_ITEMS.map((item) => (
            <li
              key={item.href}
              className="min-w-0 shrink-0 basis-[82%] snap-start sm:basis-[48%] lg:basis-1/4"
            >
              <ShopByCard {...item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
