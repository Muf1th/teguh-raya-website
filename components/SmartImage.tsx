"use client";

import Image from "next/image";
import { useState } from "react";
import { Wrench } from "lucide-react";

type Props = {
  src: string; // e.g. "/images/hero/hero-1.jpg" — drop your photos into /public/images/
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Renders your own photos from /public/images/.
 * If a photo has not been added yet, a clean branded placeholder
 * appears instead of a broken image — so the site always looks finished.
 */
export default function SmartImage({ src, alt, className = "", sizes, priority }: Props) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-charcoal ${className}`}
      >
        <div className="flex flex-col items-center gap-2 p-6 text-center">
          <Wrench className="text-steel" size={28} aria-hidden />
          <p className="text-[11px] font-semibold uppercase tracking-widest text-steel">
            Add photo: {src.replace("/images/", "")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
      priority={priority}
      className={`object-cover ${className}`}
      onError={() => setMissing(true)}
    />
  );
}
