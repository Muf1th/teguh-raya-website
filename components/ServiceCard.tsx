import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/services";

/**
 * Styled like a workshop job card: reference code, category stamp,
 * then the work described plainly.
 */
export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="card group flex flex-col p-6 transition-colors duration-200 hover:border-accent/60"
    >
      <div className="flex items-center justify-between font-display text-[11px] font-bold uppercase tracking-[0.18em]">
        <span className="text-accent">{service.code}</span>
        <span className="text-fog">{service.category}</span>
      </div>
      <h3 className="h-display mt-4 text-lg">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-fog">{service.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-paper">
        Details & booking
        <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}
