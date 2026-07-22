"use client";

import Link from "next/link";
import Image from "next/image";
import { MEGA_MENU_DATA } from "../data/mega-menu-data";
import { MegaMenuCategoryKey } from "../types/mega-menu-types";

interface MegaMenuDropdownProps {
  categoryKey: MegaMenuCategoryKey;
  isOpen: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClose?: () => void;
}

export function MegaMenuDropdown({
  categoryKey,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: MegaMenuDropdownProps) {
  if (!isOpen) return null;

  const content = MEGA_MENU_DATA[categoryKey] || MEGA_MENU_DATA.shop;

  return (
    <div
      className="absolute top-full left-0 right-0 z-50 w-full bg-white border-y border-border shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="region"
      aria-label={`${categoryKey} Navigation Menu`}
    >
      <div className="mx-auto grid w-full max-w-[1585px] grid-cols-1 lg:grid-cols-[42%_58%] xl:grid-cols-[40%_60%] min-h-[460px]">
        {/* Left Side: Category / Material / Color Navigation */}
        <div className="flex flex-col justify-between p-8 xl:p-12 2xl:p-14">
          <div className="grid grid-cols-3 gap-6 xl:gap-10">
            {content.columns.map((column) => (
              <div key={column.title} className="flex flex-col">
                <h3 className="text-[11px] font-semibold tracking-[0.12em] text-[#71717a] uppercase mb-5">
                  {column.title}
                </h3>
                <ul className="flex flex-col space-y-3.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="inline-block text-[15px] xl:text-[16px] 2xl:text-[18px] font-semibold text-[#18181b] transition-colors hover:text-primary hover:translate-x-0.5 transform duration-150"
                        onClick={onClose}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center w-full">
            <Link
              href={content.shopAllHref}
              className="inline-flex h-12 items-center justify-center rounded-full bg-black px-20 xl:px-24 2xl:px-28 text-[14px] xl:text-[15px] font-semibold !text-white hover:!text-white focus:!text-white transition-all hover:bg-neutral-800 active:scale-95 shadow-sm"
              onClick={onClose}
            >
              <span className="!text-white font-semibold">Shop All</span>
            </Link>
          </div>
        </div>

        {/* Right Side: Featured Footwear Product Grid */}
        <div className="flex items-center justify-center border-l border-border bg-white p-8 xl:p-12 2xl:p-14">
          <div className="grid w-full grid-cols-4 gap-x-5 gap-y-8 items-end">
            {content.featuredItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group flex flex-col items-center text-center transition-transform duration-200"
                onClick={onClose}
              >
                <div className="relative flex h-[110px] xl:h-[130px] w-full items-center justify-center p-2 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={220}
                    height={140}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-108 group-hover:-translate-y-1"
                    priority
                  />
                </div>
                <span className="mt-3 text-[13px] xl:text-[14px] font-semibold text-[#18181b] group-hover:text-primary transition-colors">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
