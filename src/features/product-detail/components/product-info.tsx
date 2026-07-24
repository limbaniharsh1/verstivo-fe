"use client";

import { Heart, Minus, Plus, RefreshCw, Truck, Banknote } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/features/cart";
import { ProductAccordions } from "./product-accordions";
import { SizeGuideDrawer } from "./size-guide-drawer";
import type { ProductDetailData } from "../data/product-detail-data";

type ProductInfoProps = {
  product: ProductDetailData;
};

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.id || "");
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
      <h1 className="text-xl min-[360px]:text-2xl sm:text-3xl lg:text-[32px] font-semibold tracking-tight text-black leading-tight">
        {product.name}
      </h1>
      <p className="text-xs sm:text-sm text-neutral-500 font-normal mt-1">
        {product.subtitle}
      </p>

      {/* Price & Offer Section */}
      <div className="mt-3.5 sm:mt-4 flex flex-wrap items-baseline gap-2 sm:gap-2.5">
        <span className="text-xl min-[360px]:text-2xl sm:text-[26px] font-semibold text-black tracking-tight">
          {product.price}
        </span>
        <span className="text-xs min-[360px]:text-sm sm:text-base font-normal text-neutral-400 line-through">
          {product.originalPrice}
        </span>
        <span className="inline-flex items-center rounded-full bg-[#0000D1] px-2 min-[360px]:px-2.5 py-0.5 text-[10px] min-[360px]:text-[11px] font-bold text-white uppercase tracking-wider">
          {product.discountBadge}
        </span>
      </div>
      <p className="text-[10.5px] min-[360px]:text-[11.5px] text-neutral-500 font-normal mt-1">
        {product.taxLabel}
      </p>

      {/* Color Selection */}
      <div className="mt-5 sm:mt-6">
        <p className="text-xs sm:text-sm font-medium text-black">
          Color: <span className="font-normal text-neutral-700">{activeColorObj?.name}</span>
        </p>
        <div className="flex items-center gap-2.5 sm:gap-3 mt-2 sm:mt-2.5">
          {product.colors.map((color) => {
            const isSelected = selectedColor === color.id;
            return (
              <button
                key={color.id}
                type="button"
                onClick={() => setSelectedColor(color.id)}
                className={`relative size-11 min-[360px]:size-12 sm:size-14 rounded-lg overflow-hidden border transition-all cursor-pointer bg-white ${
                  isSelected
                    ? "border-black"
                    : "border-neutral-200 hover:border-neutral-400"
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
      <div className="mt-5 sm:mt-6">
        <div className="flex flex-wrap items-center justify-between gap-1 text-xs sm:text-sm">
          <span className="font-semibold text-black">
            Select Size <span className="font-normal text-neutral-500">· UK / EU</span>
          </span>
          <button
            type="button"
            onClick={() => setIsSizeGuideOpen(true)}
            className="text-[#0000D1] font-medium hover:underline text-[11.5px] sm:text-[13px] cursor-pointer"
          >
            Size, Fit + Switch Guide
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
                className={`flex h-9.5 sm:h-[42px] items-center justify-center rounded-lg border text-[11px] min-[360px]:text-[11.5px] sm:text-[12.5px] lg:text-[12px] xl:text-[13px] font-medium transition-all cursor-pointer px-2 whitespace-nowrap ${
                  isSelected
                    ? "border-black bg-black text-white shadow-xs"
                    : "border-border bg-white text-neutral-800 hover:border-black"
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
          <Heart
            className={`size-4.5 sm:size-5 transition-colors ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-black"
            }`}
            strokeWidth={1.6}
          />
        </button>
      </div>

      {/* Accepted Payment Methods - Responsive Single Line Scroll */}
      <div className="mt-6 sm:mt-7 flex flex-col min-[540px]:flex-row min-[540px]:items-center min-[540px]:justify-between gap-2 overflow-x-auto scrollbar-hidden py-0.5">
        <span className="text-[12px] sm:text-[13.5px] font-normal text-neutral-500 shrink-0 whitespace-nowrap">
          Accepted Payment Methods
        </span>
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 flex-nowrap">
          {/* Razorpay */}
          <div className="h-6.5 sm:h-7 px-1.5 sm:px-2 rounded-md border border-neutral-200/90 bg-white flex items-center justify-center shadow-2xs">
            <div className="flex items-center gap-1">
              <svg className="h-2.5 sm:h-3 w-auto" viewBox="0 0 24 24" fill="none">
                <path d="M10 2L2 22H6L9.5 13H14L16 9H11L13 4H19L20 2H10Z" fill="#0C2340"/>
                <path d="M6 22L9.5 13H14L12 18H16L14 22H6Z" fill="#0284C7"/>
              </svg>
              <span className="text-[10px] sm:text-[11px] font-extrabold italic tracking-tight text-[#0C2340]">Razorpay</span>
            </div>
          </div>

          {/* RuPay */}
          <div className="h-6.5 sm:h-7 px-1.5 sm:px-2 rounded-md border border-neutral-200/90 bg-white flex items-center justify-center shadow-2xs">
            <div className="flex items-center gap-0.5">
              <span className="text-[10.5px] sm:text-[11.5px] font-extrabold italic tracking-tighter text-[#0B2265]">RuPay</span>
              <svg className="h-2 w-2" viewBox="0 0 16 16" fill="none">
                <path d="M2 14L8 2H12L6 14H2Z" fill="#00A859"/>
                <path d="M7 14L13 2H16L10 14H7Z" fill="#EF8123"/>
              </svg>
            </div>
          </div>

          {/* GPay */}
          <div className="h-6.5 sm:h-7 px-1.5 sm:px-2 rounded-md border border-neutral-200/90 bg-white flex items-center justify-center shadow-2xs">
            <div className="flex items-center gap-0.5 sm:gap-1">
              <svg className="h-3 w-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span className="text-[10.5px] sm:text-[11.5px] font-semibold text-[#5F6368]">Pay</span>
            </div>
          </div>

          {/* PhonePe */}
          <div className="h-6.5 sm:h-7 px-1.5 sm:px-2 rounded-md border border-neutral-200/90 bg-white flex items-center justify-center shadow-2xs">
            <div className="flex items-center gap-0.5 sm:gap-1">
              <div className="size-3 rounded-full bg-[#5F259F] flex items-center justify-center text-white text-[7.5px] font-bold">
                पे
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#5F259F]">PhonePe</span>
            </div>
          </div>

          {/* Paytm */}
          <div className="h-6.5 sm:h-7 px-1.5 sm:px-2 rounded-md border border-neutral-200/90 bg-white flex items-center justify-center shadow-2xs">
            <div className="flex items-center">
              <span className="text-[10.5px] sm:text-[11.5px] font-extrabold text-[#002E6E]">pay</span>
              <span className="text-[10.5px] sm:text-[11.5px] font-extrabold text-[#00BAF2]">tm</span>
            </div>
          </div>

          {/* BHIM */}
          <div className="h-6.5 sm:h-7 px-1.5 sm:px-2 rounded-md border border-neutral-200/90 bg-white flex items-center justify-center shadow-2xs">
            <div className="flex items-center gap-0.5">
              <span className="text-[10.5px] sm:text-[11.5px] font-extrabold italic tracking-tighter text-[#002970]">BHIM</span>
              <svg className="h-2 w-2" viewBox="0 0 16 16" fill="none">
                <path d="M2 14L8 2H11L5 14H2Z" fill="#00A859"/>
                <path d="M6.5 14L12.5 2H15.5L9.5 14H6.5Z" fill="#EF8123"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Service Features Row */}
      <div className="mt-6 sm:mt-7 grid grid-cols-3 gap-1.5 min-[360px]:gap-2 border-y border-neutral-200/90 py-4 sm:py-5 text-center">
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
