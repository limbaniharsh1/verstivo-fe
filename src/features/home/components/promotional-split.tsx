import { env } from "@/env";
import { PromoCard } from "@/features/home/components/promo-card";

async function getHomepageCollections() {
  try {
    const baseUrl = env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";
    const response = await fetch(`${baseUrl}/collections`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    const allCollections = json.data || [];

    // Only show active collections meant for homepage, sorted by sortOrder
    return allCollections
      .filter((c: any) => c.isActive !== false && c.showOnHomepage !== false)
      .sort((a: any, b: any) => (a.sortOrder || 0) - (b.sortOrder || 0))
      .slice(0, 2);
  } catch (error) {
    console.error("[PromotionalSplit] Failed to fetch collections:", error);
    return [];
  }
}

export const DEFAULT_FALLBACK_IMAGE = "/d621727966d80500cb8ab5b8dfba5627e47f588b.png";

export async function PromotionalSplit() {
  const collections = await getHomepageCollections();

  // Fallback default collections if none are fetched from backend
  const displayCollections = collections?.slice(0, 2);

  const gridColsClass = displayCollections.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2";

  if (collections?.length === 0) { return }

  return (
    <section
      className={`grid gap-1 bg-surface ${gridColsClass}`}
      aria-label="Featured collections"
    >
      {displayCollections.map((collection: any) => {
        const title = collection.bannerTitle || collection.name;
        const description = collection.bannerSubtitle || "";
        const href = collection.redirectionUrl
          ? collection.redirectionUrl
          : collection.fallbackImage
            ? `/${collection.slug}`
            : `/${collection.slug || collection._id}`;
        const linkLabel = collection.buttonText || "Shop Collection";
        const imageSrc = collection?.image?.url || DEFAULT_FALLBACK_IMAGE;
        console.log(collection,)

        return (
          <PromoCard
            key={collection._id}
            title={title}
            description={description}
            href={href}
            linkLabel={linkLabel}
            imageSrc={imageSrc}
            imageAlt={title}
            imagePosition="object-bottom"
          />
        );
      })}
    </section>
  );
}
