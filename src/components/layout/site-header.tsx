"use client";

import Link from "next/link";
import {
  Heart,
  Menu,
  Search,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";

import { AnnouncementBar } from "@/components/common/announcement-bar";
import { PRIMARY_NAVIGATION } from "@/constants/navigation";
import { SearchOverlay } from "@/features/search";

const iconButtonClassName =
  "h-full shrink-0 place-items-center border-l-0 xl:border-l xl:border-border transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary cursor-pointer";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="site-header-grid mx-auto grid w-full max-w-[1585px] min-w-0 items-center px-1 sm:px-2">
        <div className="flex h-full min-w-0 items-center">
          <button
            type="button"
            className="grid size-12 place-items-center transition-colors hover:bg-surface-muted lg:hidden cursor-pointer"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <nav
            className="hidden h-full w-full min-w-0 items-center pl-[47px] pr-[27px] 2xl:pl-[42px] 2xl:pr-[39px] lg:flex"
            aria-label="Main navigation"
          >
            <ul className="flex h-full items-center gap-6 xl:gap-8 2xl:gap-10">
              {PRIMARY_NAVIGATION.map(({ badge, href, label }) => (
                <li key={href} className="flex h-full items-center">
                  <Link
                    href={href}
                    className="inline-flex items-start whitespace-nowrap text-[13px] transition-colors hover:text-primary xl:text-[15px] 2xl:text-[18px]"
                  >
                    <span>{label}</span>
                    {badge ? (
                      <span className="ml-1 -mt-1 text-[8px] font-bold text-primary uppercase 2xl:text-[10px]">
                        {badge}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Link
          href="/"
          className="flex h-full min-w-0 max-w-full items-center justify-center border-x-0 xl:border-x xl:border-border px-[70px] text-center text-[15px] min-[375px]:text-[17px] min-[420px]:text-[20px] sm:text-[22px] lg:text-[24px] xl:text-[34px] 2xl:text-[28px]"
          style={{ fontFamily: "var(--font-monument)" }}
          aria-label="Verstivo home"
        >
          <span className="truncate">VERSTIVO</span>
        </Link>

        <div className="flex h-full min-w-0 items-center justify-end">
          {/* Desktop Search Button Trigger */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="hidden h-full min-w-0 flex-1 items-center justify-center border-l border-border px-6 xl:flex 2xl:px-6 cursor-pointer"
            aria-label="Open product search"
          >
            <span className="flex h-11 w-full max-w-[240px] min-w-0 items-center gap-2 rounded-full border border-black px-4 transition-colors xl:max-w-[280px] 2xl:h-[52px] 2xl:max-w-[320px] 2xl:gap-3 2xl:px-5">
              <Search className="size-4 shrink-0 text-black 2xl:size-[22px]" strokeWidth={1.5} aria-hidden="true" />
              <span className="min-w-0 flex-1 text-left text-[10px] text-black xl:text-[14px] 2xl:text-[14px]">
                Search Products
              </span>
            </span>
          </button>

          {/* Mobile Search Icon Button */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className={`${iconButtonClassName} flex sm:hidden w-12`}
            aria-label="Search products"
          >
            <Search className="size-5" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            className={`${iconButtonClassName} hidden w-[85px] sm:grid 2xl:w-[100px]`}
            aria-label="Account"
          >
            <UserRound className="size-5 2xl:size-6" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className={`${iconButtonClassName} hidden w-[85px] md:grid 2xl:w-[100px]`}
            aria-label="Wishlist"
          >
            <Heart className="size-5 2xl:size-6" strokeWidth={1.5} />
          </button>
          <div className="flex h-full w-[74px] shrink-0 items-center justify-center border-l-0 xl:border-l xl:border-border lg:w-[112px] 2xl:w-[155px]">
            <button
              type="button"
              className="flex h-9 items-center gap-2 rounded-full bg-primary px-3 text-[12px] font-semibold text-primary-contrast transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:h-11 lg:text-[14px] 2xl:h-[52px] 2xl:gap-3 2xl:px-6 2xl:text-[16px] cursor-pointer"
              aria-label="Cart with 0 items"
            >
              <span className="text-[16px]">Cart</span>
              <span className="grid size-5 place-items-center rounded-full bg-white text-[10px] font-bold text-primary lg:size-6 lg:text-[12px]">
                0
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnnouncementBar />

      {/* Backdrop dimmed layer when menu is open */}
      {isMenuOpen ? (
        <div
          className="fixed inset-0 top-[95px] z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      {/* Mobile Navigation Drawer Overlay with Smooth Slide/Fade Animation */}
      <div
        className={`absolute top-full inset-x-0 z-50 grid transition-[grid-template-rows,opacity] duration-300 ease-in-out lg:hidden ${
          isMenuOpen
            ? "grid-rows-[1fr] opacity-100 border-b border-border shadow-2xl bg-white"
            : "grid-rows-[0fr] opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-5 space-y-4 bg-white">
            {/* Mobile Search Bar Trigger */}
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="flex h-10 w-full items-center gap-2.5 rounded-full border border-black px-4 transition-colors text-left cursor-pointer"
            >
              <Search size={16} className="text-black shrink-0" strokeWidth={1.5} />
              <span className="text-[13px] text-black">Search Products...</span>
            </button>

            {/* Mobile Navigation Links */}
            <nav aria-label="Mobile navigation">
              <ul className="space-y-1">
                {PRIMARY_NAVIGATION.map(({ badge, href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="flex items-center justify-between rounded-lg px-3.5 py-3 text-[15px] font-medium text-foreground transition-colors hover:bg-surface-muted active:bg-surface-muted"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{label}</span>
                      {badge ? (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                          {badge}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Quick Action Links for Mobile */}
            <div className="pt-3 border-t border-border flex items-center justify-around">
              <Link
                href="/account"
                className="flex items-center gap-2 text-xs font-semibold py-2 px-4 rounded-full text-foreground hover:bg-surface-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserRound size={18} strokeWidth={1.5} />
                <span>Account</span>
              </Link>
              <Link
                href="/wishlist"
                className="flex items-center gap-2 text-xs font-semibold py-2 px-4 rounded-full text-foreground hover:bg-surface-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart size={18} strokeWidth={1.5} />
                <span>Wishlist</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Global Interactive Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
