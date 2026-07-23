"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { MEGA_MENU_DATA } from "../data/mega-menu-data";
import { MegaMenuCategoryKey } from "../types/mega-menu-types";

interface MobileMegaMenuAccordionProps {
  categoryKey: MegaMenuCategoryKey;
  label: string;
  badge?: string;
  onItemClick: () => void;
}

export function MobileMegaMenuAccordion({
  categoryKey,
  label,
  badge,
  onItemClick,
}: MobileMegaMenuAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const content = MEGA_MENU_DATA[categoryKey] || MEGA_MENU_DATA.shop;

  return (
    <li className="border-b border-border/50 last:border-none">
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between px-3.5 py-3 text-left text-[15px] font-medium text-foreground transition-colors hover:bg-surface-muted active:bg-surface-muted"
        aria-expanded={isExpanded}
      >
        <span className="flex items-center gap-2">
          <span>{label}</span>
          {badge ? (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase text-primary">
              {badge}
            </span>
          ) : null}
        </span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 text-muted ${isExpanded ? "rotate-180 text-primary" : ""
            }`}
        />
      </button>

      {/* Collapsible Accordion Content */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isExpanded
            ? "grid-rows-[1fr] opacity-100 pb-4"
            : "grid-rows-[0fr] opacity-0 pointer-events-none"
          }`}
      >
        <div className="overflow-hidden px-4 space-y-4 pt-1">
          {/* Columns */}
          <div className="space-y-4">
            {content.columns.map((column) => (
              <div key={column.title} className="space-y-2">
                <p className="text-[10px] font-bold tracking-widest text-muted uppercase">
                  {column.title}
                </p>
                <div className="flex flex-wrap gap-2">
                  {column.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={onItemClick}
                      className="inline-block rounded-md bg-surface-muted px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-primary hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Featured Models Scroll Row */}
          <div>
            <p className="text-[10px] font-bold tracking-widest text-muted uppercase mb-2">
              Featured Items
            </p>
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hidden">
              {content.featuredItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onItemClick}
                  className="flex flex-col items-center shrink-0 w-20 p-2 rounded-lg border border-border bg-white transition-all hover:border-primary"
                >
                  <div className="relative size-12 flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={40}
                      className="object-contain max-h-full"
                    />
                  </div>
                  <span className="mt-1 text-[11px] font-medium text-foreground text-center truncate w-full">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Shop All Button */}
          <div className="pt-2">
            <Link
              href={content.shopAllHref}
              onClick={onItemClick}
              className="flex w-full items-center justify-center rounded-full bg-black py-3.5 text-xs font-semibold !text-white hover:!text-white focus:!text-white transition-colors hover:bg-neutral-800"
            >
              <span className="!text-white font-semibold">Shop All {label}</span>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
