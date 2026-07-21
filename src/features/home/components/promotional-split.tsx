import { PromoCard } from "@/features/home/components/promo-card";

export function PromotionalSplit() {
  return (
    <section
      className="grid gap-0.5 bg-surface md:grid-cols-2"
      aria-label="Featured collections"
    >
      <PromoCard
        title="Free Summer Travel"
        description={"3-Piece gift with your $100+ purchase.\nUse code: SHINE"}
        href="/sale"
        linkLabel="Shop Summer"
        imageSrc="/assets/images/33c0d153e6bec9e7a876d78ebf4f02d66e4fd911.png"
        imageAlt="Person wearing taupe sandals on a sunny summer day"
        imagePosition="object-[center_62%]"
      />
      <PromoCard
        title="Bestseller"
        description="The curated styles on everybody's wishlist"
        href="/bestsellers"
        linkLabel="Shop Bestseller"
        imageSrc="/assets/images/1fe07ec4b610c0e9dd220081baed9ee3525f02e1.png"
        imageAlt="Person wearing blue buckle sandals outdoors"
        imagePosition="object-[center_68%]"
      />
    </section>
  );
}
