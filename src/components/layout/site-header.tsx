"use client";

import Link from "next/link";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";

import { AnnouncementBar } from "@/components/common/announcement-bar";
import { PRIMARY_NAVIGATION } from "@/constants/navigation";

const iconButtonClassName =
  "grid h-full shrink-0 place-items-center border-l border-border transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-y border-border bg-surface">
      <div className="site-header-grid mx-auto grid w-full max-w-[1585px] items-center">
        <div className="flex h-full min-w-0 items-center">
          <button
            type="button"
            className="grid size-12 place-items-center lg:hidden"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <nav
            className="hidden h-full w-full min-w-0 items-center px-4 2xl:px-8 lg:flex"
            aria-label="Main navigation"
          >
            <ul className="flex h-full w-full min-w-0 items-center justify-between">
              {PRIMARY_NAVIGATION.map(({ badge, href, label }) => (
                <li key={href} className="relative flex h-full items-center">
                  <Link
                    href={href}
                    className="whitespace-nowrap text-[13px] transition-colors hover:text-primary xl:text-[15px] 2xl:text-[18px]"
                  >
                    {label}
                  </Link>
                  {badge ? (
                    <span className="absolute -right-3 top-3 text-[8px] font-semibold text-primary 2xl:-right-4 2xl:text-[10px]">
                      {badge}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Link
          href="/"
          className="flex h-full w-[132px] items-center justify-center border-x border-border px-2 text-center text-[20px] font-black tracking-[-0.08em] sm:w-[180px] lg:w-[200px] lg:text-[24px] 2xl:w-[238px] 2xl:text-[30px]"
          aria-label="Verstivo home"
        >
          VERSTIVO
        </Link>

        <div className="flex h-full min-w-0 items-center justify-end">
          <label className="hidden h-full min-w-0 flex-1 items-center justify-center border-l border-border px-3 xl:flex 2xl:max-w-[320px] 2xl:px-5">
            <span className="flex h-11 w-full min-w-0 items-center gap-2 rounded-full border-2 border-foreground px-3 2xl:h-[52px] 2xl:gap-3 2xl:px-5">
              <Search className="size-4 shrink-0 2xl:size-[22px]" aria-hidden="true" />
              <span className="sr-only">Search products</span>
              <input
                type="search"
                placeholder="Search Products"
                className="min-w-0 flex-1 appearance-none bg-transparent text-[12px] outline-none placeholder:text-foreground placeholder:opacity-100 xl:text-[15px] 2xl:text-[18px]"
              />
            </span>
          </label>

          <button
            type="button"
            className={`${iconButtonClassName} hidden w-16 sm:grid 2xl:w-[100px]`}
            aria-label="Account"
          >
            <UserRound className="size-5 2xl:size-6" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className={`${iconButtonClassName} hidden w-16 md:grid 2xl:w-[100px]`}
            aria-label="Wishlist"
          >
            <Heart className="size-5 2xl:size-6" strokeWidth={1.5} />
          </button>
          <div className="flex h-full w-[84px] shrink-0 items-center justify-center border-l border-border lg:w-[112px] 2xl:w-[155px]">
            <button
              type="button"
              className="flex h-9 items-center gap-1.5 rounded-full bg-primary px-3 text-[10px] text-primary-contrast transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:h-11 lg:text-[12px] 2xl:h-[52px] 2xl:gap-2 2xl:px-5 2xl:text-[16px]"
              aria-label="Cart with 0 items"
            >
              <ShoppingBag size={18} className="lg:hidden" />
              <span className="hidden lg:inline">Cart</span>
              <span className="grid size-4 place-items-center rounded-full bg-surface text-[8px] font-semibold text-primary lg:size-6 lg:text-[12px]">
                0
              </span>
            </button>
          </div>
        </div>

        {isMenuOpen ? (
          <nav className="absolute inset-x-0 top-full border-b border-border bg-surface p-5 shadow-lg lg:hidden">
            <ul className="space-y-1">
              {PRIMARY_NAVIGATION.map(({ badge, href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm hover:bg-surface-muted"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                    {badge ? (
                      <span className="text-[9px] font-semibold text-primary">{badge}</span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
      <AnnouncementBar />
    </header>
  );
}
