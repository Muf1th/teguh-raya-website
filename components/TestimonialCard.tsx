import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/content";

export default function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="card flex h-full flex-col p-6 sm:p-7">
      <Quote size={20} className="text-accent" aria-hidden />
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-paper">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 border-t border-steel pt-4">
        <p className="font-display text-sm font-bold">{t.name}</p>
        <p className="mt-0.5 text-xs uppercase tracking-wider text-fog">
          {t.vehicle} · {t.service}
        </p>
      </figcaption>
    </figure>
  );
}
