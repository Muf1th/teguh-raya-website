import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import BlueprintHero from "@/components/BlueprintHero";
import RepairExperience from "@/components/scenes";
import SectionHeading from "@/components/SectionHeading";
import SmartImage from "@/components/SmartImage";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import CtaBand from "@/components/CtaBand";
import { services } from "@/lib/services";
import { testimonials } from "@/lib/content";
import { site, waLink } from "@/lib/site";

const featuredServices = services.filter((s) =>
  [
    "full-vehicle-service",
    "engine-repair",
    "brake-service",
    "suspension-and-steering",
    "transmission-gearbox-repair",
    "fleet-maintenance",
  ].includes(s.slug)
);

const fleetPoints = [
  "Priority booking — your vehicles jump the queue",
  "One consolidated invoice every month",
  "Dedicated contact who knows your fleet",
  "Per-vehicle service records for audits and resale",
];

export default function HomePage() {
  return (
    <>
      {/* 1 — HERO */}
      <BlueprintHero />

      {/* 2 — SERVICING & REPAIR */}
      <section className="section">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="What we do"
              title="Servicing and repair, front to back"
              lead="Sixteen core services covering scheduled maintenance, engine and drivetrain, chassis and brakes — for private owners and company fleets."
            />
            <Reveal delay={0.1}>
              <Link href="/services" className="btn-ghost">
                All services <ArrowRight size={16} aria-hidden />
              </Link>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — EXPERIENCE */}
      <section className="section blueprint-grid border-y border-steel">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Watch, don't guess"
              title="Experience the repair"
              lead="Press play. This is what actually happens during an engine oil service — and every major repair is explained the same way, step by step."
            />
            <Reveal delay={0.1}>
              <Link href="/experience" className="btn-ghost">
                All 6 experiences <ArrowRight size={16} aria-hidden />
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="mt-14">
            <RepairExperience sceneKey="oil" />
          </Reveal>
        </div>
      </section>

      {/* 4 — CORPORATE FLEET (elevated) */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="card relative overflow-hidden">
              <div aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-accent" />
              <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:gap-14">
                <div>
                  <p className="eyebrow">For businesses</p>
                  <h2 className="h-display mt-4 text-3xl sm:text-4xl">
                    Keep your fleet earning,
                    <br className="hidden sm:block" /> not waiting
                  </h2>
                  <p className="mt-5 leading-relaxed text-fog">
                    Every day a company vehicle sits broken, it costs money while earning
                    nothing. Our fleet programmes replace breakdown chaos with planned
                    maintenance — three tiers, sized for fleets from two vehicles upward.
                  </p>
                  <ul className="mt-7 space-y-3">
                    {fleetPoints.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-sm text-fog">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15">
                          <Check size={12} className="text-accent" aria-hidden />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <Link href="/fleet" className="btn-primary">
                      Fleet packages <ArrowRight size={16} aria-hidden />
                    </Link>
                    <a
                      href={waLink("Hello Teguh Raya Workshop, I'm interested in fleet maintenance for my company's vehicles.")}
                      target="_blank" rel="noopener noreferrer" className="btn-ghost"
                    >
                      Talk to us about your fleet
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-steel">
                    <SmartImage src="/images/workshop/fleet.jpg" alt="Company fleet vehicles at Teguh Raya Workshop" sizes="(max-width: 1024px) 100vw, 45vw" />
                  </div>
                  <div className="absolute -bottom-4 left-6 rounded-xl border border-steel bg-ink px-4 py-3 shadow-lg shadow-black/40">
                    <p className="mono-label text-accent">Fleet clients</p>
                    <p className="mt-1 font-display text-sm font-bold">Priority slots, every week</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5 — GALLERY PREVIEW */}
      <section className="section border-t border-steel bg-charcoal/40">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Real work, our photos"
              title="From our workshop floor"
              lead="No stock photography anywhere on this site — every image is our own workshop, our own tools, our customers' vehicles."
            />
            <Reveal delay={0.1}>
              <Link href="/gallery" className="btn-ghost">
                Full gallery <ArrowRight size={16} aria-hidden />
              </Link>
            </Reveal>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[1, 2, 3, 4].map((n, i) => (
              <Reveal key={n} delay={i * 0.05}>
                <div className={`relative overflow-hidden rounded-xl border border-steel ${i % 2 ? "aspect-square" : "aspect-[3/4]"}`}>
                  <SmartImage src={`/images/gallery/preview-${n}.jpg`} alt={`Workshop photo ${n}`} sizes="(max-width: 640px) 50vw, 25vw" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — TESTIMONIALS */}
      <section className="section">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Customer words" title="What drivers in Brunei say" />
            <Reveal delay={0.1}>
              <Link href="/testimonials" className="btn-ghost">
                All reviews <ArrowRight size={16} aria-hidden />
              </Link>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <Reveal key={t.name} delay={i * 0.05}>
                <TestimonialCard t={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — MAP */}
      <section className="section border-t border-steel bg-charcoal/40">
        <div className="wrap">
          <SectionHeading
            eyebrow="Find us"
            title="Kampung Serambangun, Tutong"
            lead="Easy to reach from anywhere in Tutong District, and worth the drive from Bandar. Message us on WhatsApp for a live location pin."
          />
          <Reveal delay={0.1} className="mt-12">
            <div className="overflow-hidden rounded-2xl border border-steel">
              <iframe
                src={site.mapEmbed}
                title="Map showing the location of Teguh Raya Workshop in Tutong, Brunei"
                className="h-80 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8 — FINAL CTA */}
      <CtaBand />
    </>
  );
}
