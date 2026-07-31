import Link from "next/link";
import { ArrowRight, Compass, Home, ShoppingCart as ShoppingBag, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BenefitsBar } from "@/components/common/benefits-bar";

export default function NotFoundPage() {
  return (
    <>
      <SiteHeader />

      <main className="min-h-[75vh] flex flex-col items-center justify-center bg-white px-4 py-16 sm:py-24 relative overflow-hidden select-none">
        {/* Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[360px] sm:size-[500px] bg-gradient-to-tr from-[#0000C9]/8 via-[#0000C9]/4 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100/90 border border-neutral-200 text-[11px] font-semibold uppercase tracking-wider text-neutral-600 mb-6 shadow-2xs">
            <Compass size={14} className="text-[#0000C9] shrink-0" />
            <span>404 — Page Not Found</span>
          </div>

          {/* Big Stylized 404 Number */}
          <h1 className="font-monument text-7xl sm:text-9xl font-black text-black tracking-tight leading-none mb-4">
            404
          </h1>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight mb-3">
            Looks like you&apos;ve stepped off the beaten path
          </h2>

          {/* Subtitle / Explanation */}
          <p className="text-neutral-500 text-sm sm:text-base max-w-lg mb-8 leading-relaxed">
            The page you are looking for doesn&apos;t exist or has been moved. Explore our popular footwear collections below.
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-12">
            <Link
              href="/"
              className="w-full sm:w-auto h-12 px-7 rounded-full bg-[#0000C9] hover:bg-[#0600b8] active:scale-[0.98] !text-white text-white font-medium text-sm sm:text-[15px] flex items-center justify-center gap-2.5 transition-all shadow-xs cursor-pointer whitespace-nowrap shrink-0"
            >
              <Home size={17} className="shrink-0 text-white !text-white" />
              <span className="text-white !text-white">Back to Homepage</span>
            </Link>


            <Link
              href="/bestsellers"
              className="w-full sm:w-auto h-12 px-7 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 active:scale-[0.98] text-black font-medium text-sm sm:text-[15px] flex items-center justify-center gap-2.5 transition-all shadow-xs cursor-pointer whitespace-nowrap shrink-0"
            >
              <ShoppingBag size={17} className="shrink-0 text-black" />
              <span>Explore Bestsellers</span>
            </Link>
          </div>

          {/* Popular Destinations Container */}
          <div className="w-full max-w-xl pt-8 border-t border-neutral-200/90">
            <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-4">
              Popular Destinations
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <Link
                href="/bestsellers"
                className="group p-4 rounded-xl border border-neutral-200/90 bg-neutral-50/60 hover:bg-white hover:border-[#0000C9]/40 hover:shadow-sm transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="size-10 rounded-lg bg-white border border-neutral-200/80 flex items-center justify-center text-[#0000C9] shrink-0 shadow-2xs">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-black group-hover:text-[#0000C9] transition-colors leading-tight">
                      Bestseller Collection
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">Trending styles & iconic designs</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-neutral-400 group-hover:text-[#0000C9] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </Link>

              <Link
                href="/create-account"
                className="group p-4 rounded-xl border border-neutral-200/90 bg-neutral-50/60 hover:bg-white hover:border-[#0000C9]/40 hover:shadow-sm transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="size-10 rounded-lg bg-white border border-neutral-200/80 flex items-center justify-center text-[#0000C9] shrink-0 shadow-2xs">
                    <Compass size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-black group-hover:text-[#0000C9] transition-colors leading-tight">
                      Join Blupair
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">Create an account for perks</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-neutral-400 group-hover:text-[#0000C9] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <BenefitsBar />
      <SiteFooter />
    </>
  );
}
