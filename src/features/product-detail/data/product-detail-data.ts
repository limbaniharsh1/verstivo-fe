export type ProductColor = {
  id: string;
  name: string;
  image: string;
};

export type ProductDetailData = {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  discountBadge: string;
  taxLabel: string;
  selectedColorName: string;
  colors: ProductColor[];
  sizes: string[];
  galleryImages: { id: string; src: string; alt: string }[];
  description: string;
  material: string;
  returnsAndExchange: string;
  customerCare: string;
};

export const SAMPLE_PRODUCT_DETAIL: ProductDetailData = {
  id: "arizona-soft-footbed",
  name: "Arizona Soft Footbed",
  subtitle: "Arizona Soft Footbed Suede Leather",
  price: "₹7,693.00",
  originalPrice: "₹10,990.00",
  discountBadge: "30% OFF",
  taxLabel: "MRP inclusive of all taxes",
  selectedColorName: "Brushed Chrome",
  colors: [
    {
      id: "brushed-chrome",
      name: "Brushed Chrome",
      image: "/assets/images/menu/arizona.png",
    },
    {
      id: "black",
      name: "Habana Black",
      image: "/assets/images/menu/boston.png",
    },
  ],
  sizes: [
    "UK 4 / EU 30",
    "UK 4 / EU 31",
    "UK 4 / EU 32",
    "UK 4 / EU 33",
    "UK 4 / EU 34",
    "UK 4 / EU 35",
    "UK 4 / EU 36",
    "UK 4 / EU 37",
    "UK 4 / EU 38",
    "UK 4 / EU 39",
    "UK 4 / EU 40",
  ],
  galleryImages: [
    {
      id: "img-1",
      src: "/assets/images/menu/arizona.png",
      alt: "Arizona Soft Footbed side view",
    },
    {
      id: "img-2",
      src: "/assets/images/florida-soft-footbed.png",
      alt: "Arizona Soft Footbed front pair view",
    },
    {
      id: "img-3",
      src: "/assets/images/menu/safaga.png",
      alt: "Arizona Soft Footbed sole and side view",
    },
    {
      id: "img-4",
      src: "/assets/images/menu/uji.png",
      alt: "Arizona Soft Footbed top view pair",
    },
    {
      id: "img-5",
      src: "/assets/images/menu/gizeh.png",
      alt: "Arizona Soft Footbed flat profile view",
    },
  ],
  description:
    "The legendary two-strap design from Birkenstock - the Arizona. Iconic style complemented with the signature comfort of the Birkenstock footbed. The upper is made from high-quality, soft suede leather for a relaxed, natural look.",
  material:
    "Upper material: Suede leather. Insole: Real leather lining. Footbed material: Anatomically shaped cork-latex. Outsole: Light EVA cushion.",
  returnsAndExchange:
    "We offer a 14-day hassle-free return and exchange policy for all unworn items in original packaging with original tags attached.",
  customerCare:
    "Need help with sizing or care instructions? Contact our customer support team 24/7 at support@verstivo.com or call +91 (800) 123-4567.",
};

export function getProductDetailById(id: string): ProductDetailData {
  return {
    ...SAMPLE_PRODUCT_DETAIL,
    id: id || SAMPLE_PRODUCT_DETAIL.id,
  };
}
