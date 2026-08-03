"use client";

import Image from "next/image";
import { useState } from "react";

export function FounderAndMission() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20" aria-label="Founder Note and Brand Mission">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px] gap-8 sm:gap-10 lg:gap-14 xl:gap-20 items-start">
          
          {/* Left Column - Story, Mission & Vision Content */}
          <div className="space-y-12 sm:space-y-14 lg:space-y-16 order-2 lg:order-1">
            
            {/* A Note from the Founder */}
            <div className="space-y-4 sm:space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold tracking-tight text-slate-900">
                A Note from the Sahil
              </h2>

              <div className="space-y-3.5 sm:space-y-4 text-sm sm:text-base lg:text-[15px] xl:text-[15.5px] leading-relaxed text-slate-700 font-normal">
                <p>
                  CHAMPL started with a simple question: Why can&apos;t everyday footwear be as comfortable,
                  well-designed, and premium as the world&apos;s best brands?
                </p>
                <p>
                  Growing up in India, I saw that a pair of champals is part of everyday life. It&apos;s something we all
                  wear, yet it rarely receives the attention it deserves. I believed this everyday essential could
                  be reimagined with better design, superior comfort, and uncompromising quality.
                </p>
                <p className="font-medium text-slate-900">That belief became CHAMPL.</p>
                <p>
                  Our goal is not just to create footwear—it&apos;s to build a brand that people trust. Every product we
                  make reflects our commitment to comfort, craftsmanship, durability, and timeless design. We pay
                  attention to the smallest details because we believe every step matters.
                </p>
                <p>
                  CHAMPL is proudly inspired by India, but our ambition is global. We want to create products that
                  stand alongside the best brands in the world while staying true to our roots.
                </p>
                <p>
                  Thank you for believing in our vision and for being part of the CHAMPL journey. We are just getting
                  started, and we&apos;re excited to take every step forward with you.
                </p>
                
                <div className="pt-3 pb-1">
                  <p className="font-semibold text-slate-900 italic text-base">Walk Beyond Ordinary.</p>
                  <div className="mt-3">
                    <p className="font-semibold text-slate-900 text-base">Sahil Gol</p>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">Founder & CEO, CHAMPL</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Mission */}
            <div className="space-y-3.5 sm:space-y-4 border-t border-slate-200/80 pt-8 sm:pt-10">
              <h2 className="text-2xl sm:text-3xl lg:text-[28px] font-semibold tracking-tight text-slate-900">
                Our Mission
              </h2>
              <div className="space-y-3 text-sm sm:text-base lg:text-[15px] xl:text-[15.5px] leading-relaxed text-slate-700">
                <p>
                  To redefine everyday comfort by creating thoughtfully designed footwear that blends premium
                  quality, timeless style, and lasting durability.
                </p>
                <p>
                  We are committed to making every step more comfortable while delivering products that people
                  trust, value, and love to wear. Through innovation, craftsmanship, and customer-first thinking, we
                  aim to elevate an everyday essential into an exceptional experience.
                </p>
              </div>
            </div>

            {/* Our Vision */}
            <div className="space-y-3.5 sm:space-y-4 border-t border-slate-200/80 pt-8 sm:pt-10">
              <h2 className="text-2xl sm:text-3xl lg:text-[28px] font-semibold tracking-tight text-slate-900">
                Our Vision
              </h2>
              <div className="space-y-3 text-sm sm:text-base lg:text-[15px] xl:text-[15.5px] leading-relaxed text-slate-700">
                <p>
                  To build CHAMPL into India&apos;s most trusted comfort footwear brand and a globally recognized
                  symbol of quality, innovation, and modern Indian design.
                </p>
                <p>
                  We envision a future where footwear is not only comfortable and durable but also reflects
                  confidence, simplicity, and authenticity. Our goal is to take an idea inspired by the humble
                  Indian champal and share it with the world.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column - Founder Profile Card */}
          <div className="w-full max-w-[340px] mx-auto lg:ml-auto lg:mr-0 lg:sticky lg:top-28 order-1 lg:order-2">
            <div className="bg-[#f9f9fb] p-3.5 sm:p-4 rounded-none border border-slate-200/80">
              <div className="relative aspect-[4/4.8] w-full overflow-hidden rounded-none bg-slate-200">
                {!imageError ? (
                  <Image
                    src="/assets/images/hero-lifestyle.jpg"
                    alt="Sahil Gol - CEO & Founder of CHAMPL"
                    fill
                    sizes="(max-width: 1023px) 340px, 340px"
                    className="object-cover object-[70%_20%]"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-slate-900 text-white p-6 text-center">
                    <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-2xl mb-3 border border-primary/40">
                      SG
                    </div>
                    <span className="font-semibold text-lg">Sahil Gol</span>
                    <span className="text-xs text-slate-300 mt-0.5">CEO & Founder</span>
                  </div>
                )}
              </div>
              <div className="mt-3.5 px-1 pb-1">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900">Sahil Gol</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">CEO & Founder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
