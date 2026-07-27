"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
    mediaAlt: "Verstivo Florida Soft Footbed community style",
    productTitle: "Florida Soft Footbed",
    productSubtitle: "FLORIDA SOFT FOOTBED BIRKO-FLOR",
    productPrice: "₹6,293.00",
    productThumbnail: "/assets/images/florida-soft-footbed.png",
    href: "/bestsellers",
  },
  {
    id: "post-2",
    mediaSrc: "/e2c52b823e60edece1efe3482b5df023fdc14b71.gif",
    mediaAlt: "Verstivo Florida Soft Footbed community highlight",
    productTitle: "Florida Soft Footbed",
    productSubtitle: "FLORIDA SOFT FOOTBED BIRKO-FLOR",
    productPrice: "₹6,293.00",
    productThumbnail: "/assets/images/florida-soft-footbed.png",
    href: "/bestsellers",
  },
  {
    id: "post-3",
    mediaSrc: "/e2c52b823e60edece1efe3482b5df023fdc14b71.gif",
    mediaAlt: "Verstivo Florida Soft Footbed lifestyle look",
    productTitle: "Florida Soft Footbed",
    productSubtitle: "FLORIDA SOFT FOOTBED BIRKO-FLOR",
    productPrice: "₹6,293.00",
    productThumbnail: "/assets/images/florida-soft-footbed.png",
    href: "/bestsellers",
  },
  {
    id: "post-4",
    mediaSrc: "/e2c52b823e60edece1efe3482b5df023fdc14b71.gif",
    mediaAlt: "Verstivo Florida Soft Footbed fashion reel",
    productTitle: "Florida Soft Footbed",
    productSubtitle: "FLORIDA SOFT FOOTBED BIRKO-FLOR",
    productPrice: "₹6,293.00",
    productThumbnail: "/assets/images/florida-soft-footbed.png",
    href: "/bestsellers",
  },
  {
    id: "post-5",
    mediaSrc: "/f2713d5baed71040d12bc0c237031f6104715403.png",
    mediaAlt: "Verstivo Arizona Soft Footbed summer look",
    productTitle: "Arizona Soft Footbed",
    productSubtitle: "ARIZONA SUEDE LEATHER ROSE",
    productPrice: "₹8,490.00",
    productThumbnail: "/assets/images/menu/arizona.png",
    href: "/bestsellers",
  },
];

export function SocialGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const totalScroll = el.scrollWidth - el.clientWidth;
    if (totalScroll <= 0) {
      setScrollProgress(0);
      return;
    }
    const currentProgress = (el.scrollLeft / totalScroll) * 100;
    setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    handleScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full overflow-hidden bg-soft-surface py-12 lg:py-16">
      <div className="mx-auto flex w-full flex-col lg:flex-row items-center lg:items-center">
        {/* Left Column Text Content */}
        <div className="w-full lg:w-[38%] xl:w-[36%] shrink-0 px-6 min-[375px]:px-8 sm:px-12 md:px-14 lg:px-16 xl:px-20 py-8 lg:py-12">
          <div className="max-w-[420px]">
            <h2 className="text-[28px] min-[375px]:text-[32px] sm:text-[36px] lg:text-[40px] xl:text-[44px] font-semibold leading-tight tracking-[-0.03em] text-foreground">
              @verstivo.in
            </h2>
            <p className="mt-3.5 sm:mt-4 text-[13.5px] min-[375px]:text-[14px] sm:text-[15px] lg:text-[15.5px] font-normal leading-relaxed text-foreground/85">
              Share your VERSTIVO-Style and inspire others! Just mention @verstivo.in on Instagram to become part of our highlight gallery.
            </p>
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-5 sm:mt-6 inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 text-[13.5px] sm:text-[14px] font-semibold text-white !text-white shadow-xs transition-all hover:bg-primary-hover active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Follow Us
            </Link>
          </div>
        </div>

        {/* Right Column Scrollable Gallery */}
        <div className="w-full lg:w-[62%] xl:w-[64%] min-w-0 flex-1 flex flex-col justify-center mt-6 lg:mt-0">
          <div
            ref={scrollRef}
            className="scrollbar-hidden flex gap-2.5 overflow-x-auto snap-x snap-mandatory px-3 sm:px-6 lg:px-2 py-2"
          >
            {SOCIAL_POSTS.map((post) => (
              <article
                key={post.id}
                className="group relative flex w-[230px] min-[390px]:w-[250px] sm:w-[270px] lg:w-[calc((100%-1rem)/3.5)] shrink-0 snap-start flex-col overflow-visible bg-white shadow-xs transition-shadow duration-300 hover:shadow-md"
              >
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
                  <div className="absolute -top-7 sm:-top-8 left-4 sm:left-5 flex size-[52px] sm:size-[58px] items-center justify-center rounded-md bg-[#f0f0f4] p-1 shadow-sm border border-black/5">
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
                <div className="flex flex-col pt-7 sm:pt-8 pb-5 px-4 sm:px-5 bg-white text-left">
                  <h3 className="text-[14px] sm:text-[16px] font-semibold text-foreground leading-snug tracking-tight line-clamp-1">
                    {post.productTitle}
                  </h3>
                  <p className="mt-1 text-[9px] sm:text-[11px] font-medium text-gray-500 uppercase tracking-wider line-clamp-1">
                    {post.productSubtitle}
                  </p>
                  <p className="mt-2 text-[14px] sm:text-[16px] font-semibold text-foreground">
                    {post.productPrice}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Scroll Progress Bar Track */}
          <div className="mt-6 sm:mt-8 px-6 sm:px-8 lg:px-6 flex items-center justify-center">
            <div className="h-[3px] w-[280px] sm:w-[380px] lg:w-[460px] max-w-full bg-gray-300/70 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-black rounded-full transition-all duration-150"
                style={{ width: `${Math.max(25, scrollProgress)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
