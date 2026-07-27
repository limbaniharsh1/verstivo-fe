"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PersonalInfoTab } from "./personal-info-tab";
import { ShippingAddressTab } from "./shipping-address-tab";
import { OrderHistoryTab } from "./order-history-tab";
import { WishlistTab } from "./wishlist-tab";
import type { AccountTabItem, AccountTabType } from "../types/account-types";

const ACCOUNT_TABS: AccountTabItem[] = [
  { id: "personal-info", label: "Personal Information" },
  { id: "shipping-address", label: "Shipping Address" },
  { id: "order-history", label: "Order History" },
  { id: "wishlist", label: "Wishlist" },
];

export function AccountView() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as AccountTabType | null;

  const [activeTab, setActiveTab] = useState<AccountTabType>(
    tabParam && ACCOUNT_TABS.some((t) => t.id === tabParam)
      ? tabParam
      : "personal-info"
  );

  useEffect(() => {
    if (tabParam && ACCOUNT_TABS.some((t) => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  return (
    <div className="w-full bg-white text-slate-900">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 pt-4 sm:pt-6 pb-6 sm:pb-8">
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-900 tracking-tight">
            Welcome Sahil
          </h1>

          <Link
            href="/login"
            className="px-4 py-1.5 sm:px-5 sm:py-1.5 rounded-full border border-slate-300 text-xs sm:text-sm font-medium text-slate-800 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            Sign Out
          </Link>
        </div>

        {/* Tab Navigation Pill Buttons */}
        <div className="mt-3.5 sm:mt-4 mb-10 sm:mb-10 flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {ACCOUNT_TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-3.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-black text-white shadow-xs"
                    : "bg-white text-slate-800 border border-slate-200/90 hover:bg-slate-50 hover:border-slate-300"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active Tab Component */}
        <div className="w-full">
          {activeTab === "personal-info" && <PersonalInfoTab />}
          {activeTab === "shipping-address" && <ShippingAddressTab />}
          {activeTab === "order-history" && <OrderHistoryTab />}
          {activeTab === "wishlist" && <WishlistTab />}
        </div>
      </div>
    </div>
  );
}
