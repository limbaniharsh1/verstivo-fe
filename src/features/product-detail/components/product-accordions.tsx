"use client";

import { Plus, Minus } from "lucide-react";
import { useState } from "react";

type AccordionItem = {
  id: string;
  title: string;
  content: string;
};

type ProductAccordionsProps = {
  items: AccordionItem[];
};

export function ProductAccordions({ items }: ProductAccordionsProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full border-t border-border mt-6 pt-2 divide-y divide-border">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div key={item.id} className="py-3.5">
            <button
              type="button"
              onClick={() => toggleAccordion(item.id)}
              className="flex w-full items-center justify-between text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-primary py-1"
              aria-expanded={isOpen}
            >
              <span className="text-[13.5px] sm:text-[16px] font-semibold text-foreground transition-colors group-hover:text-black">
                {item.title}
              </span>
              <span className="grid size-6 place-items-center text-foreground transition-transform duration-200">
                {isOpen ? (
                  <Minus className="size-4 text-black" strokeWidth={1.8} />
                ) : (
                  <Plus className="size-4 text-black" strokeWidth={1.8} />
                )}
              </span>
            </button>

            {isOpen ? (
              <div className="pt-2 pb-1 text-[13px] sm:text-[13.5px] leading-relaxed text-muted-foreground animate-in fade-in-50 duration-200">
                {item.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
