"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";

type SocialPost = {
  id: string;
  mediaSrc: string;
  mediaAlt: string;
  productTitle: string;
  productSubtitle: string;
  productPrice: string;
  productThumbnail: string;
  href: string;
};

const SOCIAL_POSTS: SocialPost[] = [
  {
    id: "post-1",
    mediaSrc: "/e2c52b823e60edece1efe3482b5df023fdc14b71.gif",
    mediaAlt: "Pairborn Florida Soft Footbed community style",
    productTitle: "Florida Soft Footbed",
    productSubtitle: "FLORIDA SOFT FOOTBED BIRKO-FLOR",
    productPrice: "₹6,293.00",
    productThumbnail: "/assets/images/florida-soft-footbed.png",
    href: "/products/florida-soft-footbed",
  },
  {
    id: "post-2",
    mediaSrc: "/e2c52b823e60edece1efe3482b5df023fdc14b71.gif",
    mediaAlt: "Pairborn Florida Soft Footbed community highlight",
    productTitle: "Florida Soft Footbed",
    productSubtitle: "FLORIDA SOFT FOOTBED BIRKO-FLOR",
    productPrice: "₹6,293.00",
    productThumbnail: "/assets/images/florida-soft-footbed.png",
    href: "/products/florida-soft-footbed",
  },
  {
    id: "post-3",
    mediaSrc: "/e2c52b823e60edece1efe3482b5df023fdc14b71.gif",
    mediaAlt: "Pairborn Florida Soft Footbed lifestyle look",
    productTitle: "Florida Soft Footbed",
    productSubtitle: "FLORIDA SOFT FOOTBED BIRKO-FLOR",
    productPrice: "₹6,293.00",
    productThumbnail: "/assets/images/florida-soft-footbed.png",
    href: "/products/florida-soft-footbed",
  },
  {
    id: "post-4",
    mediaSrc: "/e2c52b823e60edece1efe3482b5df023fdc14b71.gif",
    mediaAlt: "Pairborn Florida Soft Footbed fashion reel",
    productTitle: "Florida Soft Footbed",
    productSubtitle: "FLORIDA SOFT FOOTBED BIRKO-FLOR",
    productPrice: "₹6,293.00",
    productThumbnail: "/assets/images/florida-soft-footbed.png",
    href: "/products/florida-soft-footbed",
  },
  {
    id: "post-5",
    mediaSrc: "/f2713d5baed71040d12bc0c237031f6104715403.png",
    mediaAlt: "Pairborn Arizona Soft Footbed summer look",
    productTitle: "Arizona Soft Footbed",
    productSubtitle: "ARIZONA SUEDE LEATHER ROSE",
    productPrice: "₹8,490.00",
    productThumbnail: "/assets/images/menu/arizona.png",
    href: "/products/arizona-soft-footbed",
  },
];

export function SocialGallery() {
  const [swiperProgress, setSwiperProgress] = useState(0);

  return (
    <section className="w-full overflow-hidden bg-soft-surface py-12 lg:py-16">
      <div className="mx-auto flex w-full flex-col lg:flex-row items-center lg:items-center">
        {/* Left Column Text Content */}
        <div className="w-full lg:w-[38%] xl:w-[36%] shrink-0 px-6 min-[375px]:px-8 sm:px-12 md:px-14 lg:px-16 xl:px-20 py-8 lg:py-12">
          <div className="max-w-[420px]">
            <h2 className="text-[28px] min-[375px]:text-[32px] sm:text-[36px] lg:text-[40px] xl:text-[44px] font-semibold leading-tight tracking-[-0.03em] text-foreground">
              @pairborn.in
            </h2>
            <p className="mt-3.5 sm:mt-4 text-[13.5px] min-[375px]:text-[14px] sm:text-[15px] lg:text-[15.5px] font-normal leading-relaxed text-foreground/85">
              Share your PAIRBORN-Style and inspire others! Just mention @pairborn.in on Instagram to become part of our highlight gallery.
            </p>
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-5 sm:mt-6 rounded-full bg-primary text-white !text-white shadow-xs transition-all hover:bg-primary-hover active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary btn-banner-size"
            >
              Follow Us
            </Link>
          </div>
        </div>

        {/* Right Column Scrollable Gallery */}
        <div className="w-full lg:w-[62%] xl:w-[64%] min-w-0 flex-1 flex flex-col justify-center mt-6 lg:mt-0 relative">
          <Swiper
            onSwiper={(swiper) => {
              setSwiperProgress(swiper.progress);
            }}
            onProgress={(swiper) => {
              setSwiperProgress(swiper.progress);
            }}
            spaceBetween={10}
            slidesPerView={1.5}
            breakpoints={{
              390: {
                slidesPerView: 1.5,
              },
              480: {
                slidesPerView: 1.8,
              },
              640: {
                slidesPerView: 2.2,
              },
              768: {
                slidesPerView: 3.2,
              },
              1024: {
                slidesPerView: 3.5,
              },
            }}
            className="w-full !px-6 min-[375px]:!px-8 sm:!px-12 md:!px-14 lg:!px-2 !overflow-visible lg:!overflow-hidden select-none cursor-grab active:cursor-grabbing"
          >
            {SOCIAL_POSTS.map((post) => (
              <SwiperSlide key={post.id} className="social-gallery-slide">
                <article className="group relative flex w-full flex-col overflow-visible bg-white shadow-xs transition-shadow duration-300 hover:shadow-md">
                  {/* Clickable Overlay Link to Product Details */}
                  <Link
                    href={post.href}
                    className="absolute inset-0 z-30"
                    aria-label={`View details for ${post.productTitle}`}
                  />
                  {/* Media area */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                    <Image
                      src={post.mediaSrc}
                      alt={post.mediaAlt}
                      fill
                      sizes="(max-width: 640px) 270px, 305px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized={post.mediaSrc.endsWith(".gif")}
                    />
                  </div>

                  {/* Overlapping Floating Product Thumbnail */}
                  <div className="relative z-20 px-4 sm:px-5">
                    <div className="absolute -top-7 sm:-top-8 left-4 sm:left-5 flex size-[52px] sm:size-[58px] items-center justify-center rounded-sm bg-[#f0f0f4] p-1">
                      <Image
                        src={post.productThumbnail}
                        alt={post.productTitle}
                        width={52}
                        height={52}
                        className="object-contain max-h-full max-w-full"
                      />
                    </div>
                  </div>

                  {/* Footer details */}
                  <div className="flex flex-col pt-7 sm:pt-10 pb-5 px-4 sm:px-5 bg-white text-left">
                    <h3 className="text-responsive-lg font-semibold text-foreground leading-snug tracking-tight line-clamp-1">
                      {post.productTitle}
                    </h3>
                    <p className="pt-0.5 3xl:pt-1 text-responsive-subtitle font-medium text-gray-500 uppercase tracking-wider line-clamp-1">
                      {post.productSubtitle}
                    </p>
                    <p className="pt-1 sm:pt-1.5 xl:pt-3 text-responsive-lg font-semibold text-foreground">
                      {post.productPrice}
                    </p>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Progress Bar */}
          <div className="w-80 sm:w-[450px] h-1 bg-neutral-200/80 relative mx-auto mt-8 overflow-hidden">
            <div
              className="h-full bg-black absolute top-0 transition-all duration-100 ease-out"
              style={{
                width: "30%",
                left: `${swiperProgress * 70}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
