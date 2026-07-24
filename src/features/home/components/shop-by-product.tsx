import { ShopByCard } from "@/features/home/components/shop-by-card";

const SHOP_BY_ITEMS = [
  {
    href: "/men",
    imageSrc: "/assets/shopBy/94994ef23d31981c4b6faf2f4a52ce2afcfc8c7c.png",
    imageAlt: "Person reading while wearing brown thong sandals",
    title: "EXPLORE BIRKO-FLOR ®",
    subtitle: "DURABLE, EASY-CARE STYLES WITH EVERYDAY COMFORT.",
  },
  {
    href: "/women",
    imageSrc: "/assets/shopBy/d2f8c92d626beeba2153a7ff588daabdadff7cfe.png",
    imageAlt: "Person wearing red triple-strap sandals",
    title: "EXPLORE BIRKO-FLOR ®",
    subtitle: "DURABLE, EASY-CARE STYLES WITH EVERYDAY COMFORT.",
  },
  {
    href: "/clogs",
    imageSrc: "/assets/shopBy/15525abe1aa2ecbce135b2687b695b356ac8a1cb.png",
    imageAlt: "Person holding a pair of taupe clogs",
    title: "EXPLORE BIRKO-FLOR ®",
    subtitle: "DURABLE, EASY-CARE STYLES WITH EVERYDAY COMFORT.",
  },
  {
    href: "/sandals",
    imageSrc: "/assets/shopBy/95f39fa856f19962e5f1c423485eeead5ff6745a.png",
    imageAlt: "Person wearing black buckle sandals",
    title: "EXPLORE BIRKO-FLOR ®",
    subtitle: "DURABLE, EASY-CARE STYLES WITH EVERYDAY COMFORT.",
  },
] as const;

export function ShopByProduct() {
  return (
    <section
      className="bg-surface px-4 py-8 min-[375px]:px-5 sm:px-8 md:px-8 lg:px-11 lg:py-14 text-foreground"
      aria-labelledby="shop-by-product-heading"
    >
      <div className="mx-auto w-full max-w-[1585px]">
        <h2
          id="shop-by-product-heading"
          className="mb-5 sm:mb-6 md:mb-8 text-left text-[22px] min-[375px]:text-[24px] sm:text-[30px] md:text-[32px] lg:text-[36px] font-semibold tracking-[-0.02em]"
        >
          Shop by Product
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {SHOP_BY_ITEMS.map((item) => (
            <ShopByCard key={item.href} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

