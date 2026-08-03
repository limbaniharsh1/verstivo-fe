"use client";

import { Minus, Plus, RefreshCw, Truck, Banknote } from "lucide-react";
import { HeartIcon } from "@/components/common/HeartIcon";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/features/cart";
import { ProductAccordions } from "./product-accordions";
import { SizeGuideDrawer } from "./size-guide-drawer";
import type { ProductDetailData } from "../data/product-detail-data";
import { PAYMENT_METHODS } from "@/constants/payment-methods";



type ProductInfoProps = {
  product: ProductDetailData;
  selectedColorId?: string;
  onSelectColor?: (colorId: string) => void;
};

export function ProductInfo({
  product,
  selectedColorId: propSelectedColorId,
  onSelectColor,
}: ProductInfoProps) {
  const { addItem } = useCart();
  const [internalSelectedColor, setInternalSelectedColor] = useState(
    product.colors[0]?.id || ""
  );

  const selectedColor = propSelectedColorId ?? internalSelectedColor;

  const handleColorChange = (colorId: string) => {
    setInternalSelectedColor(colorId);
    onSelectColor?.(colorId);
  };
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const activeColorObj =
    product.colors.find((c) => c.id === selectedColor) || product.colors[0];

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);

    // Convert to Cart ProductItem and add to store
    addItem({
      id: `${product.id}-${selectedColor}-${selectedSize}`,
      name: product.name,
      subtitle: `${product.subtitle} (${selectedSize})`,
      price: 7693,
      formattedPrice: product.price,
      image: activeColorObj?.image || product.galleryImages[0]?.src || "",
      imageAlt: product.name,
    });
  };

  const accordionItems = [
    {
      id: "description",
      title: "Products Description",
      content: product.description,
    },
    {
      id: "material",
      title: "Material",
      content: product.material,
    },
    {
      id: "returns",
      title: "Returns and Exchange",
      content: product.returnsAndExchange,
    },
    {
      id: "customer-care",
      title: "Customer Care",
      content: product.customerCare,
    },
  ];

  return (
    <div className="flex flex-col w-full text-foreground">
      {/* Title & Subtitle */}
      <h1 className="text-xl min-[360px]:text-2xl sm:text-3xl lg:text-[34px] font-semibold tracking-tight text-black leading-tight">
        {product.name}
      </h1>
      <p className="text-xs sm:text-base text-neutral-600 font-normal mt-1">
        {product.subtitle}
      </p>

      {/* Price & Offer Section */}
      <div className="mt-3.5 sm:mt-4 xl:mt-5 flex flex-wrap items-center gap-2 sm:gap-2.5">
        <span className="text-xl min-[360px]:text-2xl sm:text-3xl xl:text-[34px] font-semibold text-black tracking-tight">
          {product.price}
        </span>
        <span className="text-xs min-[360px]:text-sm sm:text-base xl:text-[28px] font-medium text-neutral-400 line-through">
          {product.originalPrice}
        </span>
        <span className="inline-flex items-center rounded-full bg-[#0000D1] px-2 min-[360px]:px-2.5 py-0.5 text-[10px] min-[360px]:text-[11px] xl:text-base font-normal text-white uppercase tracking-wider">
          {product.discountBadge}
        </span>
      </div>
      <p className="text-[10.5px] min-[360px]:text-[11.5px] sm:text-sm xl:text-base font-normal mt-1">
        {/* {product.taxLabel} */}
        MRP inclusive of all taxes
      </p>

      {/* Color Selection */}
      <div className="mt-5 sm:mt-6">
        <p className="text-xs sm:text-sm xl:text-base font-medium text-black">
          Color: <span className="font-normal">{activeColorObj?.name}</span>
        </p>
        <div className="flex items-center gap-2.5 sm:gap-3 mt-2 sm:mt-2.5">
          {product.colors.map((color) => {
            const isSelected = selectedColor === color.id;
            return (
              <button
                key={color.id}
                type="button"
                onClick={() => handleColorChange(color.id)}
                className={`relative size-11 min-[360px]:size-12 sm:size-14 xl:size-18 3xl:size-24 rounded-md overflow-hidden border transition-all cursor-pointer bg-[#ffffff] focus:outline-none ${isSelected
                    ? "border-black"
                    : "border-neutral-200 hover:border-black"
                  }`}
                aria-label={`Select color ${color.name}`}
              >
                <Image
                  src={color.image}
                  alt={color.name}
                  fill
                  sizes="60px"
                  className="object-contain p-1"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Size Selection */}
      <div className="mt-5 sm:mt-6 xl:mt-7">
        <div className="flex flex-wrap items-center justify-between gap-1 text-xs sm:text-sm xl:text-base">
          <span className="font-semibold text-black">
            Select Size <span className="font-normal">· UK / EU</span>
          </span>
          <button
            type="button"
            onClick={() => setIsSizeGuideOpen(true)}
            className="text-[#0000D1] font-medium hover:underline text-[11.5px] sm:text-[13px] xl:text-base cursor-pointer"
          >
            Size Guide
          </button>
        </div>

        {/* Size Grid */}
        <div className="grid grid-cols-2 min-[380px]:grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-1.5 min-[360px]:gap-2 sm:gap-2.5 mt-2.5 sm:mt-3">
          {product.sizes.map((size, index) => {
            const isSelected = selectedSize === `${size}-${index}`;
            return (
              <button
                key={`${size}-${index}`}
                type="button"
                onClick={() => {
                  setSelectedSize(`${size}-${index}`);
                  setSizeError(false);
                }}
                className={`flex h-9.5 sm:h-[42px] items-center justify-center rounded-lg border text-[11px] min-[360px]:text-[11.5px] sm:text-[12.5px] lg:text-sm font-semibold transition-all cursor-pointer px-2 whitespace-nowrap bg-[#ffffff] ${isSelected
                    ? "border-black text-black"
                    : "border-border text-neutral-500 hover:border-black hover:text-black"
                  }`}
              >
                {size}
              </button>
            );
          })}
        </div>
        {sizeError ? (
          <p className="text-red-600 text-xs mt-2 font-medium">
            Please select a size before adding to cart.
          </p>
        ) : null}
      </div>

      {/* Quantity & Buy Action Row */}
      <div className="mt-5 sm:mt-6 flex flex-wrap min-[360px]:flex-nowrap items-center gap-2 sm:gap-3">
        {/* Quantity Selector */}
        <div className="flex h-10 sm:h-11 items-center rounded-full border border-neutral-300 bg-white shrink-0 overflow-hidden min-w-[110px] min-[360px]:min-w-[120px] sm:min-w-[130px]">
          <button
            type="button"
            onClick={handleDecreaseQuantity}
            className="flex-1 h-full flex items-center justify-center border-r border-neutral-200 text-black hover:bg-neutral-50 active:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Decrease quantity"
          >
            <Minus size={14} strokeWidth={2} />
          </button>
          <span className="flex-1 h-full flex items-center justify-center border-r border-neutral-200 text-black text-xs sm:text-sm font-semibold select-none">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncreaseQuantity}
            className="flex-1 h-full flex items-center justify-center text-black hover:bg-neutral-50 active:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Increase quantity"
          >
            <Plus size={14} strokeWidth={2} />
          </button>
        </div>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex h-10 sm:h-11 flex-1 min-w-[130px] items-center justify-center rounded-full bg-[#0000D1] hover:bg-[#0000A8] active:scale-[0.99] text-white font-semibold text-[13px] sm:text-[14.5px] transition-all cursor-pointer shadow-sm"
        >
          {selectedSize ? "Add to Cart" : "Select Size"}
        </button>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => setIsWishlisted((prev) => !prev)}
          className="grid size-10 sm:size-11 place-items-center rounded-full border border-border bg-white text-black hover:bg-surface-muted transition-colors cursor-pointer shrink-0"
          aria-label="Add to wishlist"
        >
          <HeartIcon
            filled={isWishlisted}
            className={`size-4.5 sm:size-5 transition-colors ${isWishlisted ? "text-red-500" : "text-black"
              }`}
          />
        </button>
      </div>

      <div className="mt-6 sm:mt-7 flex flex-row flex-wrap items-center justify-between gap-x-2 gap-y-2.5 py-0.5">
        <span className="text-[12px] sm:text-[13.5px] font-normal text-neutral-500 shrink-0 whitespace-nowrap">
          Accepted Payment Methods
        </span>
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
          {PAYMENT_METHODS.map((method) => (
            <div
              key={method.name}
              className="py-1.5 px-1 rounded-sm border border-neutral-200/90 bg-white flex items-center justify-center"
            >
              <img
                src={method.icon}
                alt={method.name}
                className="max-h-3 w-auto"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Service Features Row */}
      <div className="mt-6 sm:mt-7 grid grid-cols-3 gap-1.5 min-[360px]:gap-2 border-b border-[#D0D0D0] pt-0 pb-4 sm:pb-5 text-center">
        {/* Free express shipping */}
        <div className="flex flex-col items-center justify-center gap-1.5 min-[360px]:gap-2 px-0.5 min-[360px]:px-1">
          <svg className="size-5 min-[360px]:size-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <circle cx="12" cy="12" r="3" />
            <path d="M6 12h.01M18 12h.01" />
          </svg>
          <span className="text-[11px] min-[360px]:text-[12px] sm:text-[13.5px] font-normal text-black leading-tight">
            Free express shipping
          </span>
        </div>

        {/* Easy Exchange */}
        <div className="flex flex-col items-center justify-center gap-1.5 min-[360px]:gap-2 px-0.5 min-[360px]:px-1">
          <svg className="size-5 min-[360px]:size-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" rx="2" />
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
          <span className="text-[11px] min-[360px]:text-[12px] sm:text-[13.5px] font-normal text-black leading-tight">
            Easy Exchange
          </span>
        </div>

        {/* Cash on Delivery */}
        <div className="flex flex-col items-center justify-center gap-1.5 min-[360px]:gap-2 px-0.5 min-[360px]:px-1">
          <svg className="size-5 min-[360px]:size-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="11" r="7" />
            <path d="M12 7.5v7M9.5 9.5h5M9.5 12.5h5" />
            <path d="M17.5 17.5l2.5 2.5m0 0l-2.5 2.5m2.5-2.5h-4" />
          </svg>
          <span className="text-[11px] min-[360px]:text-[12px] sm:text-[13.5px] font-normal text-black leading-tight">
            Cash on Delivery
          </span>
        </div>
      </div>

      {/* Accordions */}
      <ProductAccordions items={accordionItems} />

      {/* Interactive Size Guide Drawer */}
      <SizeGuideDrawer
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
