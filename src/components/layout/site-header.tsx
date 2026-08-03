"use client";

import Link from "next/link";
import {
  Menu,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";
import { HeartIcon } from "@/components/common/HeartIcon";
import { LiaSearchSolid } from "react-icons/lia";
import { useState, useRef } from "react";

import { AnnouncementBar } from "@/components/common/announcement-bar";
import { PRIMARY_NAVIGATION } from "@/constants/navigation";
import { SearchOverlay } from "@/features/search";
import {
  MegaMenuDropdown,
  MobileMegaMenuAccordion,
  MegaMenuCategoryKey,
} from "@/features/mega-menu";
import { CartDrawer, useCart } from "@/features/cart";

const iconButtonClassName =
  "h-full shrink-0 place-items-center border-r-0 xl:border-r xl:border-border transition-colors duration-300 ease-in-out hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary cursor-pointer";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<MegaMenuCategoryKey | null>(null);

  const { openCart, totalCount } = useCart();

  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNavMouseEnter = (categoryKey?: MegaMenuCategoryKey) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (categoryKey) {
      setActiveMegaMenu(categoryKey);
    } else {
      setActiveMegaMenu(null);
    }
  };

  const handleNavMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 150);
  };

  const getCategoryKey = (label: string): MegaMenuCategoryKey | undefined => {
    const normalized = label.toLowerCase().trim();
    if (normalized === "shop") return "shop";
    if (normalized === "men") return "men";
    if (normalized === "women") return "women";
    return undefined;
  };

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white"
      onMouseLeave={handleNavMouseLeave}
    >
      <div className="relative w-full border-b border-border bg-white">
        <div className="mx-auto flex h-[70px] 3xl:h-[82px] w-full max-w-[1750px] min-w-0 items-center ps-3 sm:ps-4 md:ps-5 xl:ps-13 3xl:ps-14.5 pe-4.5 xl:grid site-header-grid">
          <div className="flex h-full min-w-0 items-center gap-1.5 sm:gap-2 border-r-0 xl:border-r xl:border-border">
            <button
              type="button"
              className="grid size-10 place-items-center transition-colors hover:bg-surface-muted xl:hidden cursor-pointer shrink-0"
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Responsive Mobile Logo right next to toggle */}
            <Link
              href="/"
              className="flex h-full items-center xl:hidden"
              style={{ fontFamily: "var(--font-monument)" }}
              aria-label="Pairborn home"
            >
              <span className="truncate text-[15px] min-[375px]:text-[17px] min-[420px]:text-[19px] sm:text-[22px] font-bold tracking-tight">
                PAIRBORN
              </span>
            </Link>

            <nav
              className="hidden h-full w-full min-w-0 items-center xl:flex"
              aria-label="Main navigation"
            >
              <ul className="flex h-full items-center gap-[34px] 3xl:gap-[38px]">
                {PRIMARY_NAVIGATION.map(({ badge, href, label }) => {
                  const categoryKey = getCategoryKey(label);
                  const isActive = activeMegaMenu === categoryKey && categoryKey !== undefined;

                  return (
                    <li
                      key={href}
                      className="flex h-full items-center"
                      onMouseEnter={() => handleNavMouseEnter(categoryKey)}
                    >
                      <Link
                        href={href}
                        className={`relative pb-1 inline-flex items-start whitespace-nowrap text-[12px] lg:text-[13px] xl:text-[14.5px] 2xl:text-[16px] 3xl:text-[18px] font-medium transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-primary after:transition-transform after:duration-300 after:origin-left ${
                          isActive
                            ? "text-primary font-semibold after:scale-x-100"
                            : "hover:text-primary after:scale-x-0 hover:after:scale-x-100"
                        }`}
                      >
                        <span>{label}</span>
                        {badge ? (
                          <span className="ml-0.5 -mt-1 text-[7.5px] font-bold text-primary uppercase xl:text-[9px] 2xl:text-[10px]">
                            {badge}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Desktop Logo in Center */}
          <Link
            href="/"
            className="hidden h-full min-w-0 items-center justify-center border-r-0 xl:border-r xl:border-border px-2 lg:px-4 xl:px-10 2xl:px-14 text-center text-[20px] lg:text-[21px] xl:text-[28px] 2xl:text-[32px] font-bold tracking-tight shrink-0 xl:flex"
            style={{ fontFamily: "var(--font-monument)" }}
            aria-label="Pairborn home"
          >
            <span className="truncate">PAIRBORN</span>
          </Link>

          <div className="flex h-full w-full min-w-0 items-center justify-end">
            {/* Desktop Search Button Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className="hidden h-full min-w-0 w-full max-w-[240px] 3xl:max-w-[320px] items-center justify-center border-r border-border px-[21px] xl:flex cursor-pointer"
              aria-label="Open/Close product search"
            >
              <span className="flex h-[38px] 3xl:h-[44px] w-full min-w-0 items-center gap-1.5 rounded-full border border-black px-3.5 transition-colors 3xl:px-5">
                <LiaSearchSolid className="size-[18px] 3xl:size-[20px] shrink-0 text-black" aria-hidden="true" />
                <span className="min-w-0 flex-1 text-left text-[12px] text-black xl:text-[13.5px] 2xl:text-[14px] 3xl:text-[16px]">
                  Search Products
                </span>
              </span>
            </button>

            {/* Desktop Account Button */}
            <Link
              href="/account"
              className={`${iconButtonClassName} hidden xl:grid w-[80px] 3xl:w-[92px]`}
              aria-label="Account"
            >
              <UserRound className="size-4 2xl:size-5" strokeWidth={1.5} />
            </Link>

            {/* Desktop Wishlist Button */}
            <Link
              href="/account?tab=wishlist"
              className={`${iconButtonClassName} hidden xl:grid w-[80px] 3xl:w-[92px]`}
              aria-label="Wishlist"
            >
              <HeartIcon className="size-4 2xl:size-5" />
            </Link>

            {/* Responsive Action Icons (< lg) */}
            <div className="flex items-center gap-1 sm:gap-1.5 xl:hidden">
              {/* Search Icon Trigger */}
              <button
                type="button"
                onClick={() => setIsSearchOpen((prev) => !prev)}
                className="grid size-9 place-items-center rounded-full hover:bg-surface-muted transition-colors cursor-pointer"
                aria-label="Search products"
              >
                <LiaSearchSolid className="size-5 text-black" />
              </button>

              {/* Account Icon (Visible on 768px+ / md screens) */}
              <Link
                href="/account"
                className="hidden md:grid size-9 place-items-center rounded-full hover:bg-surface-muted transition-colors cursor-pointer"
                aria-label="Account"
              >
                <UserRound className="size-5 text-black" strokeWidth={1.5} />
              </Link>

              {/* Wishlist Icon (Visible on 768px+ / md screens) */}
              <Link
                href="/account?tab=wishlist"
                className="hidden md:grid size-9 place-items-center rounded-full hover:bg-surface-muted transition-colors cursor-pointer"
                aria-label="Wishlist"
              >
                <HeartIcon className="size-5 text-black" />
              </Link>

              {/* Cart Icon (Visible on all responsive screens) */}
              <button
                type="button"
                onClick={openCart}
                className="relative grid size-9 place-items-center rounded-full hover:bg-surface-muted transition-colors cursor-pointer"
                aria-label={`Cart with ${totalCount} items`}
              >
                <ShoppingCart className="size-5 text-black" strokeWidth={1.5} />
                <span className="absolute -top-0.5 -right-0.5 grid size-4.5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-contrast shadow-xs">
                  {totalCount}
                </span>
              </button>
            </div>

            {/* Desktop Cart Button */}
            <div className="hidden h-full shrink-0 items-center justify-end xl:flex pl-[18px]">
              <button
                type="button"
                onClick={openCart}
                className="flex h-8.5 shrink-0 items-center justify-center gap-1.5 rounded-full bg-primary text-[11.5px] font-medium text-primary-contrast transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:h-[42px] lg:w-[90px] 3xl:h-[48px] 3xl:w-[110px] cursor-pointer"
                aria-label={`Cart with ${totalCount} items`}
              >
                <span className="text-[12px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px] 3xl:text-[16px] font-medium">Cart</span>
                <span className="grid size-4.5 place-items-center rounded-full bg-white text-[9.5px] font-bold text-primary lg:size-4.5 lg:text-[9.5px] xl:size-5 xl:text-[11px] 3xl:size-6 3xl:text-[12px]">
                  {totalCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Mega Menu Dropdown */}
        {activeMegaMenu ? (
          <MegaMenuDropdown
            categoryKey={activeMegaMenu}
            isOpen={!!activeMegaMenu}
            onMouseEnter={() => handleNavMouseEnter(activeMegaMenu)}
            onMouseLeave={handleNavMouseLeave}
            onClose={() => setActiveMegaMenu(null)}
          />
        ) : null}


        {/* Mobile Navigation Drawer Overlay with Smooth Slide/Fade Animation */}
        <div
          className={`absolute top-full inset-x-0 z-50 grid transition-[grid-template-rows,opacity] duration-300 ease-in-out xl:hidden ${
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
                <LiaSearchSolid size={18} className="text-black shrink-0" />
                <span className="text-[13px] text-black">Search Products...</span>
              </button>

              {/* Mobile Navigation Links with Accordion for Mega Menu items */}
              <nav aria-label="Mobile navigation">
                <ul className="space-y-1">
                  {PRIMARY_NAVIGATION.map(({ badge, href, label }) => {
                    const catKey = getCategoryKey(label);
                    if (catKey) {
                      return (
                        <MobileMegaMenuAccordion
                          key={href}
                          categoryKey={catKey}
                          label={label}
                          badge={badge}
                          onItemClick={() => setIsMenuOpen(false)}
                        />
                      );
                    }
                    return (
                      <li key={href} className="border-b border-border/50 last:border-none">
                        <Link
                          href={href}
                          className="flex items-center justify-between rounded-lg px-3.5 py-3 text-[15px] font-medium text-foreground transition-colors hover:bg-surface-muted active:bg-surface-muted"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span>{label}</span>
                          {badge ? (
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase text-primary">
                              {badge}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
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
                  href="/account?tab=wishlist"
                  className="flex items-center gap-2 text-xs font-semibold py-2 px-4 rounded-full text-foreground hover:bg-surface-muted transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <HeartIcon className="size-4.5" />
                  <span>Wishlist</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnnouncementBar />

      {/* Backdrop dimmed layer when menu is open */}
      {isMenuOpen ? (
        <div
          className="fixed inset-0 top-[70px] z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300 xl:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      {/* Global Interactive Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Global Interactive Cart Drawer */}
      <CartDrawer />
    </header>
  );
}

