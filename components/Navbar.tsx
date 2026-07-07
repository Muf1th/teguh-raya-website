"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/fleet", label: "Corporate Fleet" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-steel/70 bg-ink/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="flex items-baseline gap-2" aria-label="Teguh Raya Workshop home">
          <span className="font-display text-lg font-extrabold tracking-tight">
            TEGUH<span className="text-accent">RAYA</span>
          </span>
          <span className="hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-fog sm:block">
            Workshop
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-paper ${
                pathname === l.href ? "text-paper" : "text-fog"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/booking" className="btn-primary !min-h-10 !px-5 !py-2">
            Book a Service
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`tel:+${site.phoneRaw}`}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-steel"
            aria-label={`Call ${site.name}`}
          >
            <Phone size={18} />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-steel"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-steel/70 bg-ink lg:hidden">
          <div className="wrap flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3 py-3 text-base font-medium ${
                  pathname === l.href ? "bg-charcoal text-paper" : "text-fog"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/booking" className="btn-primary mt-3">
              Book a Service
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
