"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";

type SizeGuideDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SizeRow = {
  eu: string;
  us: string;
  uk: string;
  mm: string;
};

const MEN_SIZES: SizeRow[] = [
  { eu: "35", us: "4-4.5", uk: "2.5", mm: "225" },
  { eu: "36", us: "5-5.5", uk: "3.5", mm: "230" },
  { eu: "37", us: "6-6.5", uk: "4-4.5", mm: "240" },
  { eu: "38", us: "7-7.5", uk: "5", mm: "245" },
  { eu: "39", us: "8-8.5", uk: "5.5-6", mm: "250" },
  { eu: "40", us: "9-9.5", uk: "7", mm: "260" },
  { eu: "41", us: "10-10.5", uk: "7.5", mm: "265" },
  { eu: "42", us: "11-11.5", uk: "8", mm: "270" },
  { eu: "43", us: "12-12.5", uk: "9", mm: "280" },
];

const WOMEN_SIZES: SizeRow[] = [
  { eu: "35", us: "4-4.5", uk: "2.5", mm: "225" },
  { eu: "36", us: "5-5.5", uk: "3.5", mm: "230" },
  { eu: "37", us: "6-6.5", uk: "4.5", mm: "240" },
  { eu: "38", us: "7-7.5", uk: "5.5", mm: "245" },
  { eu: "39", us: "8-8.5", uk: "6.5", mm: "250" },
  { eu: "40", us: "9-9.5", uk: "7.5", mm: "260" },
  { eu: "41", us: "10-10.5", uk: "8.5", mm: "265" },
  { eu: "42", us: "11-11.5", uk: "9.5", mm: "270" },
];

export function SizeGuideDrawer({ isOpen, onClose }: SizeGuideDrawerProps) {
  const [activeTab, setActiveTab] = useState<"men" | "women">("men");

  // Prevent page scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentSizes = activeTab === "men" ? MEN_SIZES : WOMEN_SIZES;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-0 min-[380px]:pl-10">
        {/* Slide-over Drawer Panel */}
        <div className="w-screen max-w-full min-[400px]:max-w-md min-[480px]:max-w-[440px] sm:max-w-[460px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-4 min-[360px]:px-6 py-4 min-[360px]:py-5 border-b border-neutral-200">
            <h2 className="text-lg min-[360px]:text-xl sm:text-2xl font-semibold text-black tracking-tight">
              Size Guide
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="grid size-8 min-[360px]:size-9 place-items-center rounded-full text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Close size guide drawer"
            >
              <X size={20} className="sm:size-5.5" strokeWidth={1.8} />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 min-[360px]:px-6 py-5 min-[360px]:py-6 scrollbar-hidden">
            {/* Gender Size Switcher Tabs */}
            <div className="flex items-center gap-2 min-[360px]:gap-3 mb-5 sm:mb-6">
              <button
                type="button"
                onClick={() => setActiveTab("men")}
                className={`px-3.5 min-[360px]:px-5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "men"
                    ? "bg-black text-white shadow-xs"
                    : "bg-white text-black border border-neutral-300 hover:border-black"
                }`}
              >
                Men Size
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("women")}
                className={`px-3.5 min-[360px]:px-5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "women"
                    ? "bg-black text-white shadow-xs"
                    : "bg-white text-black border border-neutral-300 hover:border-black"
                }`}
              >
                Women Size
              </button>
            </div>

            {/* Size Guide Table */}
            <div className="w-full overflow-x-auto scrollbar-hidden">
              <table className="w-full border-collapse table-fixed">
                <thead>
                  <tr className="border-b border-neutral-200 text-[11.5px] min-[360px]:text-xs sm:text-sm font-normal text-neutral-500">
                    <th className="py-3 sm:py-3.5 w-[22%] font-normal text-left">EU</th>
                    <th className="py-3 sm:py-3.5 w-[34%] font-normal text-left">US</th>
                    <th className="py-3 sm:py-3.5 w-[24%] font-normal text-left">UK</th>
                    <th className="py-3 sm:py-3.5 w-[20%] font-normal text-right">MM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-[11.5px] min-[360px]:text-xs sm:text-sm text-neutral-800 font-normal">
                  {currentSizes.map((row, idx) => (
                    <tr key={`${row.eu}-${idx}`} className="hover:bg-neutral-50/60 transition-colors">
                      <td className="py-3 sm:py-3.5 w-[22%] text-left font-normal text-neutral-900">{row.eu}</td>
                      <td className="py-3 sm:py-3.5 w-[34%] text-left font-normal text-neutral-800">{row.us}</td>
                      <td className="py-3 sm:py-3.5 w-[24%] text-left font-normal text-neutral-800">{row.uk}</td>
                      <td className="py-3 sm:py-3.5 w-[20%] text-right font-normal text-neutral-800">{row.mm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
