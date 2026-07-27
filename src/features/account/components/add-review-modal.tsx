"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { toast } from "sonner";

export interface ReviewProductData {
  title: string;
  subtitle: string;
  image: string;
}

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ReviewProductData | null;
}

export function AddReviewModal({ isOpen, onClose, product }: AddReviewModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  if (!isOpen || !product) return null;

  const activeRating = hoverRating || rating;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    toast.success("Thank you! Your review has been submitted.");
    setRating(0);
    setComment("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Dark Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centered Modal Container (Square corners rounded-none, Darker border-slate-200) */}
      <div className="relative w-full max-w-[540px] sm:max-w-[580px] bg-white rounded-none shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">
            Add Review
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Product Thumbnail & Details */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-[##F8F8F8] rounded-xl flex items-center justify-center shrink-0 border border-slate-100 p-2">
              <Image
                src={product.image}
                alt={product.title}
                width={70}
                height={70}
                className="object-contain max-h-full max-w-full"
              />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">
                {product.title}
              </h4>
              <p className="text-xs text-slate-500 uppercase tracking-tight mt-0.5">
                {product.subtitle}
              </p>
            </div>
          </div>

          {/* Star Rating Section */}
          <div className="text-center">
            <h5 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
              How was your ride?
            </h5>

            {/* 5 Stars completely borderless */}
            <div className="flex items-center justify-center gap-2 sm:gap-2.5 my-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const isSelected = star <= activeRating;

                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                    aria-label={`Rate ${star} stars`}
                  >
                    <svg
                      className={`w-8 h-8 sm:w-9 sm:h-9 transition-colors ${isSelected
                          ? "text-[#0e1726] fill-[#0e1726]"
                          : "text-[#e5e7eb] fill-[#e5e7eb]"
                        }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-slate-500 mt-2 font-normal">
              Your feedback is anonymous
            </p>
          </div>

          {/* Write a review comment textarea */}
          <div>
            <label className="text-xs sm:text-sm font-medium text-slate-900 mb-2 block">
              Write a review
            </label>
            <textarea
              rows={4}
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2 text-center">
            <button
              type="submit"
              className="w-[180px] sm:w-[200px] mx-auto py-3 rounded-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-colors shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
