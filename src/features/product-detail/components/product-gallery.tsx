"use client";

import Image from "next/image";
import { useState } from "react";

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

type ProductGalleryProps = {
  images: GalleryImage[];
};

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const activeImage = images[selectedImageIndex] || images[0];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 lg:gap-6 w-full">
      {/* Thumbnail Bar */}
      <div className="flex flex-row md:flex-col gap-2.5 sm:gap-3 overflow-x-auto md:overflow-y-auto scrollbar-hidden shrink-0 py-1 md:py-0">
        {images.map((img, idx) => {
          const isSelected = selectedImageIndex === idx;

          return (
            <button
              key={img.id}
              type="button"
              onClick={() => setSelectedImageIndex(idx)}
              onMouseEnter={() => setSelectedImageIndex(idx)}
              className={`relative size-14 sm:size-16 md:size-[68px] lg:size-[74px] shrink-0 rounded-lg overflow-hidden border transition-all cursor-pointer bg-transparent ${
                isSelected
                  ? "border-black"
                  : "border-transparent opacity-80 hover:opacity-100"
              }`}
              aria-label={`Select product image ${idx + 1}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="80px"
                className="object-contain p-1"
              />
            </button>
          );
        })}
      </div>

      {/* Main Image Stage - Clean borderless background */}
      <div className="relative flex-1 aspect-[1.15/1] sm:aspect-[1.2/1] md:aspect-[1.1/1] lg:aspect-[1.15/1] max-h-[580px] w-full rounded-xl bg-white flex items-center justify-center p-2 sm:p-4 lg:p-6">
        {activeImage ? (
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-2 sm:p-4 transition-all duration-300"
          />
        ) : null}
      </div>
    </div>
  );
}
