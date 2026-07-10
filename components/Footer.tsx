import Link from "next/link";
import { Instagram, MapPin, Phone } from "lucide-react";
import { site, waLink, defaultWaMessage } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-steel bg-charcoal">
      <div className="wrap grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex flex-col leading-none">
            <span className="font-brand text-xl font-bold uppercase tracking-wide">
              Teguh <span className="text-accent">Raya</span>
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-fog">
              Workshop
            </span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-fog">
            Professional car servicing and repair in Tutong, Brunei. Honest work,
            clear prices, done right the first time.
          </p>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-fog transition-colors hover:text-paper"
          >
            <Instagram size={16} /> {site.instagramHandle}
          </a>
        </div>

        <nav aria-label="Footer pages">
          <p className="font-display text-sm font-bold uppercase tracking-widest text-fog">Pages</p>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["/services", "Services"],
              ["/fleet", "Corporate Fleet"],
              ["/gallery", "Gallery"],
              ["/testimonials", "Testimonials"],
              ["/faq", "FAQ"],
              ["/blog", "Blog"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-fog transition-colors hover:text-paper">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-widest text-fog">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-fog">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
              <span>
                {site.address.line}
                <br />
                {site.address.district}, {site.address.country}
              </span>
            </li>
            <li>
              <a href={`tel:+${site.phoneRaw}`} className="flex items-center gap-2 transition-colors hover:text-paper">
                <Phone size={16} className="text-accent" /> {site.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-widest text-fog">Opening hours</p>
          <ul className="mt-4 space-y-2 text-sm text-fog">
            {site.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span>{h.days}</span>
                <span className="text-paper">{h.time}</span>
              </li>
            ))}
          </ul>
          <a href={waLink(defaultWaMessage)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full">
            WhatsApp Us
          </a>
        </div>
      </div>

      <div className="border-t border-steel">
        <div className="wrap flex flex-col items-center justify-between gap-3 py-6 text-xs text-fog sm:flex-row">
          <p>© {year} {site.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="transition-colors hover:text-paper">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-paper">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
