import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock, HandCoins, Phone, Wrench } from "lucide-react";
import Reveal from "@/components/Reveal";
import BlueprintHero from "@/components/BlueprintHero";
import RepairExperience from "@/components/scenes";
import SectionHeading from "@/components/SectionHeading";
import SmartImage from "@/components/SmartImage";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import CtaBand from "@/components/CtaBand";
import { services } from "@/lib/services";
import { posts, testimonials } from "@/lib/content";
import { site, waLink } from "@/lib/site";

const featuredServices = services.filter((s) =>
  ["full-vehicle-service", "engine-repair", "brake-service", "suspension-and-steering", "transmission-gearbox-repair", "fleet-maintenance"].includes(s.slug)
);

const whyUs = [
  {
    icon: BadgeCheck,
    title: "Diagnosed before quoted",
    body: "We find the actual fault first, then give you a written estimate. No work starts without your approval, and nothing extra is touched without a call.",
  },
  {
    icon: HandCoins,
    title: "Honest recommendations",
    body: "If a part still has life in it, we tell you. Our customers come back for years because we never sell work a car doesn't need.",
  },
  {
    icon: Wrench,
    title: "Done right the first time",
    body: "Correct parts, correct torque, correct fluids — and a road test before every handover. Repeat visits for the same fault are failures, and we treat them that way.",
  },
  {
    icon: Clock,
    title: "Your time respected",
    body: "Realistic timeframes when we quote, updates if anything changes, and priority scheduling for fleet clients who can't afford downtime.",
  },
];

export default function HomePage() {
  return (
    <>
      <BlueprintHero />

      {/* FEATURED REPAIR EXPERIENCE */}
      <section className="section">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Watch, don't guess"
              title="Experience the repair"
              lead="Press play. This is what actually happens during an engine oil service — and every major repair on our Experience page is explained the same way."
            />
            <Reveal delay={0.1}>
              <Link href="/experience" className="btn-ghost">
                All 6 experiences <ArrowRight size={16} aria-hidden />
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="mt-12">
            <RepairExperience sceneKey="oil" />
          </Reveal>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
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
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section border-y border-steel bg-charcoal/40">
        <div className="wrap">
          <SectionHeading
            eyebrow="Why Teguh Raya"
            title="The workshop your friends recommend"
            lead="Most of our customers arrive through word of mouth. That only happens when a workshop earns trust job after job — here is how we earn it."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.05}>
                <div className="card h-full p-7">
                  <w.icon size={22} className="text-accent" aria-hidden />
                  <h3 className="h-display mt-4 text-lg">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fog">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="section">
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
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
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

      {/* FLEET */}
      <section className="section border-y border-steel bg-charcoal/40">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">For businesses</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl">
              Keep your fleet earning, not waiting
            </h2>
            <p className="mt-4 leading-relaxed text-fog">
              Priority booking, consolidated monthly invoicing, per-vehicle service
              records and a dedicated contact who knows your vehicles. Three packages —
              Basic, Standard and Premium — sized for fleets from two vehicles upward.
            </p>
            <Link href="/fleet" className="btn-primary mt-8">
              Corporate Fleet Solutions <ArrowRight size={16} aria-hidden />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-steel">
              <SmartImage src="/images/workshop/fleet.jpg" alt="Company fleet vehicles at the workshop" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Customer words"
              title="What drivers in Brunei say"
            />
            <Reveal delay={0.1}>
              <Link href="/testimonials" className="btn-ghost">
                All reviews <ArrowRight size={16} aria-hidden />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <Reveal key={t.name} delay={i * 0.05}>
                <TestimonialCard t={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="section border-t border-steel">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="From the workshop"
              title="Advice that saves you money"
            />
            <Reveal delay={0.1}>
              <Link href="/blog" className="btn-ghost">
                All articles <ArrowRight size={16} aria-hidden />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Link href={`/blog/${p.slug}`} className="card group block h-full p-7 transition-colors hover:border-accent/60">
                  <p className="text-xs uppercase tracking-wider text-fog">
                    {new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {p.readMinutes} min read
                  </p>
                  <h3 className="h-display mt-3 text-lg leading-snug">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{p.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                    Read article <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="section border-t border-steel bg-charcoal/40">
        <div className="wrap">
          <SectionHeading
            eyebrow="Find us"
            title="Kampung Serambangun, Tutong"
            lead="Easy to reach from anywhere in Tutong District, and worth the drive from Bandar. Message us on WhatsApp for a live location pin."
          />
          <Reveal delay={0.1} className="mt-10">
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

      <CtaBand />
    </>
  );
}
