import React from "react";

export default function GlobalLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4">
      <div className="relative size-12">
        <div className="absolute inset-0 rounded-full border-3 border-neutral-200" />
        <div className="absolute inset-0 rounded-full border-3 border-[#0000d6] border-t-transparent animate-spin" />
      </div>
      <p className="mt-4 text-xs tracking-widest text-neutral-400 font-mono uppercase">
        Loading Pairborn
      </p>
    </div>
  );
}
