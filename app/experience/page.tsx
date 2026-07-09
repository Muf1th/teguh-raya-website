import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { experiences } from "@/lib/experiences";

export const metadata: Metadata = {
  title: "Experience the Repair — Interactive Animations",
  description:
    "See exactly what happens inside your car during each repair. Interactive animated engineering scenes from Teguh Raya Workshop: oil service, brakes, suspension, clutch, timing belt and more.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience the repair"
        title="See inside your car before we touch it"
        lead="Most workshops tell you a name and a price. We show you the actual repair — interactive engineering animations of what's worn, what we replace, and why your car feels different afterwards. Press play on any repair."
      />
      <section className="section blueprint-grid">
        <div className="wrap grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((e, i) => (
            <Reveal key={e.slug} delay={(i % 3) * 0.05}>
              <Link
                href={`/experience/${e.slug}`}
                className="card group flex h-full flex-col p-7 transition-colors hover:border-accent/70"
              >
                <span className="mono-label text-accent">Scene {String(i + 1).padStart(2, "0")}</span>
                <h2 className="h-display mt-3 text-xl">{e.name}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-fog">{e.tagline}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent transition-transform group-hover:scale-110">
                    <Play size={14} aria-hidden />
                  </span>
                  Watch the repair
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand
        title="Seen enough to trust us with yours?"
        lead="Every repair you just watched is explained the same way in person — worn part in hand, before any work begins."
      />
    </>
  );
}
