"use client";

import { useState } from "react";
import {
  PRODUCT_REVIEWS_LIST,
  REVIEWS_SUMMARY_DATA,
} from "../data/product-reviews-data";

function StarIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

export function ProductReviews() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className="w-full bg-white py-6 sm:py-8 md:py-10 text-slate-900">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-16 items-start">
          {/* Left Summary Sidebar */}
          <div className="w-full lg:w-[290px] xl:w-[320px] shrink-0 lg:sticky lg:top-24">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight flex items-baseline gap-2">
              Reviews
              <span className="font-normal text-slate-500 text-lg sm:text-xl">
                ({REVIEWS_SUMMARY_DATA.totalReviewsDisplay})
              </span>
            </h2>

            <p className="mt-5 text-sm font-semibold text-slate-900">
              Overall rating
            </p>

            <div className="mt-1 flex items-center gap-3">
              <span className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-none">
                {REVIEWS_SUMMARY_DATA.overallRating}
              </span>
              <div className="flex items-center gap-1 text-primary">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-6 h-6 fill-current"
                  />
                ))}
              </div>
            </div>

            {/* Rating Breakdown Bars */}
            <div className="mt-6 space-y-3 w-full max-w-[280px] sm:max-w-[300px]">
              {REVIEWS_SUMMARY_DATA.breakdown.map((item) => (
                <div
                  key={item.stars}
                  className="flex items-center gap-2 text-sm"
                >
                  <span className="w-7 shrink-0 flex items-center gap-1 text-sm text-black font-medium">
                    {item.stars}
                    <StarIcon className="w-4 h-4 fill-current text-black" />
                  </span>
                  <div className="flex-1 h-1.5 bg-slate-200/80 overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="w-8 shrink-0 text-right text-sm text-black font-normal">
                    {item.countDisplay}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Reviews List & Pagination */}
          <div className="flex-1 min-w-0 w-full">
            <div className="space-y-6 sm:space-y-8">
              {PRODUCT_REVIEWS_LIST.map((review) => (
                <div
                  key={review.id}
                  className="pt-6 sm:pt-8 border-t border-slate-200/80 first:border-t-0 first:pt-0"
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
                    {/* Author Meta */}
                    <div className="w-full sm:w-36 lg:w-44 shrink-0">
                      <h4 className="font-semibold text-slate-900 text-sm sm:text-base leading-tight">
                        {review.author}
                      </h4>
                      <p className="text-xs text-slate-800 mt-1">
                        {review.country}
                      </p>
                      <p className="text-xs text-slate-800 mt-2">
                        {review.userTenure}
                      </p>
                    </div>

                    {/* Review Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4 mb-2.5">
                        <div className="flex items-center gap-0.5 text-primary">
                          {[...Array(review.rating)].map((_, i) => (
                            <StarIcon key={i} className="w-5 h-5 fill-current" />
                          ))}
                        </div>
                        <span className="text-xs text-slate-400 font-normal">
                          {review.date}
                        </span>
                      </div>

                      <p className="text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                        {review.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-10 sm:mt-14 pt-4 flex justify-center items-center gap-2 sm:gap-2.5">
              {[1, 2, 3, 4, 5].map((page) => {
                const isActive = page === currentPage;
                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs font-medium flex items-center justify-center transition-all ${
                      isActive
                        ? "bg-black text-white shadow-sm"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                    aria-label={`Go to page ${page}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
