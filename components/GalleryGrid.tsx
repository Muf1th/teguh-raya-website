"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import SmartImage from "./SmartImage";

export type GalleryItem = { src: string; alt: string };

/**
 * Responsive masonry-style grid with a keyboard-accessible lightbox.
 * Images lazy-load automatically via next/image.
 */
export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((cur) => (cur === null ? cur : (cur + dir + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  return (
    <>
      <div className="columns-2 gap-3 sm:columns-3 [&>button]:mb-3">
        {items.map((item, i) => (
          <button
            key={item.src}
            onClick={() => setActive(i)}
            className={`group relative block w-full overflow-hidden rounded-xl border border-steel ${
              i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
            }`}
            aria-label={`Open image: ${item.alt}`}
          >
            <SmartImage
              src={item.src}
              alt={item.alt}
              sizes="(max-width: 640px) 50vw, 33vw"
              className="transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4"
          onClick={close}
        >
          <div
            className="relative aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <SmartImage src={items[active].src} alt={items[active].alt} sizes="100vw" />
          </div>
          <button
            onClick={close}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-steel bg-charcoal"
          >
            <X size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-steel bg-charcoal"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-steel bg-charcoal"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </>
  );
}
