"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLogout, useUser } from "@/hooks/use-user";
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
  const router = useRouter();
  const logoutMutation = useLogout();
  const { data: user, isLoading } = useUser();
  const isLoggedIn = !!user;
  const tabParam = searchParams.get("tab") as AccountTabType | null;

  const [activeTab, setActiveTab] = useState<AccountTabType>("personal-info");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
      return;
    }

    if (isLoggedIn) {
      if (tabParam && ACCOUNT_TABS.some((t) => t.id === tabParam)) {
        setActiveTab(tabParam);
      } else {
        setActiveTab("personal-info");
      }
    }
  }, [tabParam, isLoggedIn, user, isLoading, router]);

  const visibleTabs = ACCOUNT_TABS;

  return (
    <div className="w-full bg-white text-slate-900">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 pt-4 sm:pt-6 pb-6 sm:pb-8">
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-900 tracking-tight">
            Welcome {user?.firstname || "User"}
          </h1>

          {isLoggedIn ? (
            <button
              onClick={async () => {
                try {
                  await logoutMutation.mutateAsync();
                  router.push("/");
                } catch (err) {
                  console.error("Logout failed:", err);
                }
              }}
              disabled={logoutMutation.isPending}
              className="whitespace-nowrap px-4 sm:px-5 py-2 rounded-full border border-slate-200/90 text-sm sm:text-[16px] font-medium text-slate-800 hover:bg-slate-50 hover:border-slate-300 transition-all focus:outline-none focus:ring-2 focus:ring-slate-300 cursor-pointer disabled:opacity-50"
            >
              {logoutMutation.isPending ? "Signing Out..." : "Sign Out"}
            </button>
          ) : null}
        </div>

        {/* Tab Navigation Pill Buttons */}
        <div className="mt-3.5 sm:mt-4 mb-10 sm:mb-10 flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {visibleTabs.length > 1 && visibleTabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  // Update tab search param when switching manually
                  router.push(`/account?tab=${tab.id}`);
                }}
                className={`whitespace-nowrap px-4 sm:px-5 py-2 rounded-full text-sm sm:text-[16px] font-medium transition-all cursor-pointer ${
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
