import { PromoCard } from "@/features/home/components/promo-card";
import { CollectionCardItem } from "@/types/homepage";

interface CollectionCardsProps {
  cards?: CollectionCardItem[];
}

export const DEFAULT_FALLBACK_IMAGE = "/d621727966d80500cb8ab5b8dfba5627e47f588b.png";

export function CollectionCards({ cards }: CollectionCardsProps) {
  if (!cards || cards.length === 0) {
    return null;
  }

  const displayCards = cards.slice(0, 2);
  const gridColsClass = displayCards.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2";

  return (
    <section
      className={`grid gap-1 bg-surface ${gridColsClass}`}
      aria-label="Featured collections"
    >
      {displayCards.map((card, index) => {
        const title = card.title || card.name;
        const description = card.description || "";
        const href = card.button?.redirectUrl || "";
        const linkLabel = card.button?.text || "Discover";
        const imageSrc = card.image?.url || DEFAULT_FALLBACK_IMAGE;

        return (
          <PromoCard
            key={card.id || index}
            title={title}
            description={description}
            href={href}
            linkLabel={linkLabel}
            imageSrc={imageSrc}
            imageAlt={card.image?.alt || title}
            imagePosition={index === 0 ? "object-bottom" : "object-center"}
          />
        );
      })}
    </section>
  );
}
