"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/content";

export default function FaqAccordion({ items }: { items: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-steel rounded-2xl border border-steel bg-charcoal">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.q}>
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              aria-controls={`faq-panel-${i}`}
              id={`faq-button-${i}`}
            >
              <span className="font-display text-base font-bold">{item.q}</span>
              <ChevronDown
                size={18}
                aria-hidden
                className={`shrink-0 text-fog transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
            </button>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              hidden={!open}
              className="px-5 pb-6 text-sm leading-relaxed text-fog sm:px-7"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
