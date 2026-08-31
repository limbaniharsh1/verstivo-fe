import { BenefitsBar } from "@/components/common/benefits-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ProductDetailView } from "@/features/product-detail";
import { apiClient } from "@/lib/api-client";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Fetch product details from the API server-side
async function fetchProduct(slug: string) {
  try {
    const response = await apiClient.get<any>(`/products/${slug}`, {
      next: { revalidate: 60 } // Next.js ISR/SSR cache for 60 seconds
    });
    return response?.data || null;
  } catch (error) {
    console.error("Error fetching product on SSR:", error);
    return null;
  }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) {
    return {
      title: "Product Not Found | PAIRBORN",
    };
  }
  return {
    title: `${product.name} | PAIRBORN`,
    description: product.subtitle || product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const rawProduct = await fetchProduct(slug);

  if (!rawProduct) {
    notFound();
  }

  // Map API response to ProductDetailData interface
  const priceVal = typeof rawProduct.price === "number" ? rawProduct.price : 0;
  const originalPriceVal = typeof rawProduct.originalPrice === "number" ? rawProduct.originalPrice : 0;
  
  let discountBadge = "";
  if (originalPriceVal > priceVal) {
    const discountPct = Math.round(((originalPriceVal - priceVal) / originalPriceVal) * 100);
    if (discountPct > 0) {
      discountBadge = `${discountPct}% OFF`;
    }
  }

  // Gather unique UK sizes across all color variants
  const sizeSet = new Set<number>();
  rawProduct.colorVariants?.forEach((v: any) => {
    v.stockBySize?.forEach((s: any) => {
      if (s.size !== undefined && s.stock > 0) {
        sizeSet.add(s.size);
      }
    });
  });
  const sizes = Array.from(sizeSet)
    .sort((a, b) => a - b)
    .map(s => `UK ${s}`);

  // Format colors
  const colors = (rawProduct.colorVariants || []).map((v: any) => {
    const cName = v.color?.name || "";
    const cId = v.color?._id || v.color?.id || v._id;
    return {
      id: cId,
      slug: v.color?.slug || cName.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-'),
      name: cName,
      image: v.images?.[0]?.medium || v.images?.[0]?.low || v.images?.[0]?.high || "",
      galleryImages: (v.images || []).map((img: any, idx: number) => ({
        id: img._id || `${cId}-img-${idx}`,
        src: img.medium || img.low || img.high || "",
        alt: img.alt || `${rawProduct.name} - ${cName}`,
      })),
      stockBySize: v.stockBySize || [],
    };
  });

  const defaultGallery = colors[0]?.galleryImages || [];

  const product = {
    id: rawProduct._id || rawProduct.id,
    name: rawProduct.name,
    subtitle: rawProduct.subtitle || "",
    price: `₹${priceVal.toLocaleString("en-IN")}`,
    originalPrice: originalPriceVal ? `₹${originalPriceVal.toLocaleString("en-IN")}` : "",
    discountBadge,
    taxLabel: "MRP inclusive of all taxes",
    selectedColorName: colors[0]?.name || "",
    colors,
    sizes,
    galleryImages: defaultGallery,
    description: rawProduct.description || "",
    material: `Upper material: ${rawProduct.materials?.map((m: any) => m.name).join(", ") || "Premium materials"}. Insole: Real leather lining. Outsole: Light EVA cushion.`,
    returnsAndExchange: "We offer a 14-day hassle-free return and exchange policy for all unworn items in original packaging with original tags attached.",
    customerCare: "Need help with sizing or care instructions? Contact our customer support team 24/7 at support@pairborn.com or call +91 (800) 123-4567.",
  };

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white">
        <ProductDetailView product={product} />
        <BenefitsBar />
      </main>
      <SiteFooter />
    </>
  );
}
