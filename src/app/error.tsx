"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service if configured
    console.error("Unhandled runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="size-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-5 shadow-xs">
        <AlertCircle size={32} />
      </div>

      <h1 className="text-2xl sm:text-3xl font-semibold text-black tracking-tight mb-2">
        Something went wrong
      </h1>

      <p className="text-neutral-600 max-w-md text-sm sm:text-base mb-8">
        We encountered an unexpected error while loading this page. Please try refreshing or return to homepage.
      </p>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="h-11 px-6 rounded-full bg-[#0000d6] hover:bg-[#0000b8] text-white font-medium text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98"
        >
          <RefreshCw size={16} />
          <span>Try again</span>
        </button>

        <Link
          href="/"
          className="h-11 px-6 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-black font-medium text-sm flex items-center transition-all cursor-pointer shadow-xs active:scale-98"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
