import { IHomepageSection } from "@/types/homepage";
import { HeroBanner } from "./hero-banner";
import { ProductCarousel } from "./product-carousel";
import { ShopByProduct } from "./shop-by-product";
import { PromotionalSplit } from "./promotional-split";
import { CraftsmanshipSection } from "./craftsmanship-section";
import { SocialGallery } from "./social-gallery";
import { MediaSection } from "./media-section";
import { CollectionCards } from "./collection-cards";

interface SectionRendererProps {
  sections: IHomepageSection[];
}

/**
 * Master Server Component that renders dynamic homepage sections.
 *
 * Responsibilities:
 * 1. Preserves backend ordering strictly (iterates over sections as returned by GET /api/v1/homepage).
 * 2. Supports arbitrary ordering and multiple sections of the same type.
 * 3. Gracefully handles unknown or future section types by returning null (prevents crashing).
 * 4. Grants priority loading for LCP to the first hero section rendered, regardless of array position.
 */
export function SectionRenderer({ sections }: SectionRendererProps) {
  if (!sections || sections.length === 0) {
    return null;
  }

  // Identify the first hero section to grant priority loading for LCP, regardless of array position
  const firstHeroIndex = sections.findIndex((section) => section.type === "hero");

  return (
    <>
      {sections.map((section, index) => {
        const key = section.id || `${section.type}-${index}`;

        switch (section.type) {
          case "hero":
            return (
              <HeroBanner
                key={key}
                content={section.content}
                isPriority={index === firstHeroIndex}
              />
            );

          case "product_slider":
            return (
              <ProductCarousel
                key={key}
                heading={section.content?.title || "Featured Products"}
                subtitle={section.content?.subtitle}
                headingId={`slider-${key}`}
                products={section.content?.products || []}
              />
            );

          case "shop_by_product":
            return (
              <ShopByProduct
                key={key}
                title={section.content?.title}
                items={section.content?.items || []}
              />
            );

          case "promotional_split":
            return (
              <PromotionalSplit
                key={key}
                cards={section.content?.cards || []}
              />
            );

          case "craftsmanship":
            return (
              <CraftsmanshipSection
                key={key}
                content={section.content}
              />
            );

          case "social_gallery":
            return (
              <SocialGallery
                key={key}
                content={section.content}
              />
            );

          case "media":
            return (
              <MediaSection
                key={key}
                content={section.content}
              />
            );

          case "collection_cards":
            return (
              <CollectionCards
                key={key}
                cards={section.content?.collections || []}
              />
            );

          default:
            if (process.env.NODE_ENV === "development") {
              console.warn(
                `[SectionRenderer] Unsupported or future section type received: ${(section as any).type}`
              );
            }
            return null;
        }
      })}
    </>
  );
}
