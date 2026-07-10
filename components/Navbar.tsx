"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { site } from "@/lib/site";

// Minimal navigation: only what moves a customer toward booking.
const links = [
  { href: "/services", label: "Services" },
  { href: "/fleet", label: "Corporate Fleet" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasLogo, setHasLogo] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-steel/70 bg-ink/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-8 sm:h-[5.25rem]">
        {/* Brand — full name on every screen size */}
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Teguh Raya Workshop home">
          {hasLogo && (
            <Image
              src="/images/logo.png"
              alt=""
              width={44}
              height={44}
              priority
              className="h-9 w-9 shrink-0 object-contain sm:h-11 sm:w-11"
              onError={() => setHasLogo(false)}
            />
          )}
          <span className="flex min-w-0 flex-col leading-none">
            <span className="font-brand text-base font-bold uppercase tracking-wide sm:text-xl">
              Teguh <span className="text-accent">Raya</span>
            </span>
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.32em] text-fog sm:text-[10px]">
              Workshop
            </span>
          </span>
        </Link>

        {/* Desktop nav — generous breathing room from the brand */}
        <nav className="hidden items-center gap-9 lg:flex xl:gap-11" aria-label="Main">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative py-1 text-sm font-medium transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-accent after:transition-all after:duration-300 hover:text-paper ${
                  active ? "text-paper after:w-full" : "text-fog after:w-0 hover:after:w-full"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link href="/booking" className="btn-primary !min-h-11 !px-6 !py-2.5 ml-2">
            Book a Service
          </Link>
        </nav>

        {/* Mobile controls */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <a
            href={`tel:+${site.phoneRaw}`}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-steel transition-colors hover:border-fog"
            aria-label={`Call ${site.name}`}
          >
            <Phone size={18} />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-steel transition-colors hover:border-fog"
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
          <div className="wrap flex flex-col gap-1 py-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
                  pathname === l.href ? "bg-charcoal text-paper" : "text-fog hover:text-paper"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/booking" className="btn-primary mt-4">
              Book a Service
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
