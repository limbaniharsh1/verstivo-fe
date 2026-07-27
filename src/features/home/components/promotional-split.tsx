import { PromoCard } from "@/features/home/components/promo-card";

export function PromotionalSplit() {
  return (
    <section
      className="grid gap-1 bg-surface md:grid-cols-2"
      aria-label="Featured collections"
    >
      <PromoCard
        title="Free Summer Travel"
        description={"3-Piece gift with your $100+ purchase.\nUse code: SHINE"}
        href="/sale"
        linkLabel="Shop Summer"
        imageSrc="/39c9ee8f9c58d7b72e55a72574b740b5e0c57f2e.png"
        imageAlt="Person wearing blue sandals on rocks near the ocean"
        imagePosition="object-bottom"
      />
      <PromoCard
        title="Bestseller"
        description="The coveted styles on everybody's wishlist."
        href="/bestsellers"
        linkLabel="Shop Bestseller"
        imageSrc="/f2713d5baed71040d12bc0c237031f6104715403.png"
        imageAlt="Person wearing pink buckle sandals with white pants"
        imagePosition="object-bottom"
      />
    </section>
  );
}
