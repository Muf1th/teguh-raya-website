import type { Metadata } from "next";
import { Clock } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Link from "next/link";
import { Play } from "lucide-react";
import { serviceCategories, services } from "@/lib/services";
import { experienceForService } from "@/lib/experiences";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Car Servicing & Repair Services in Tutong",
  description:
    "Full service list at Teguh Raya Workshop: oil service, engine repair and overhaul, transmission, brakes, suspension, inspections and fleet maintenance in Tutong, Brunei.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything we do, explained plainly"
        lead="Each service below tells you what it covers, why it matters, how we do it and how long it takes. We focus on servicing and mechanical repair — for welding, wiring or air-con work we'll happily point you to specialists we trust."
      />

      {serviceCategories.map((cat) => (
        <section key={cat} className="section border-b border-steel/60">
          <div className="wrap">
            <Reveal>
              <h2 className="eyebrow !text-fog">{cat}</h2>
            </Reveal>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {services
                .filter((s) => s.category === cat)
                .map((s, i) => (
                  <Reveal key={s.slug} delay={i * 0.04}>
                    <article id={s.slug} className="card h-full scroll-mt-28 p-7 sm:p-8">
                      <div className="flex items-center justify-between font-display text-[11px] font-bold uppercase tracking-[0.18em]">
                        <span className="text-accent">{s.code}</span>
                        <span className="inline-flex items-center gap-1.5 text-fog">
                          <Clock size={13} aria-hidden /> {s.duration}
                        </span>
                      </div>
                      <h3 className="h-display mt-4 text-xl">{s.name}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-fog">{s.summary}</p>

                      <div className="mt-6 grid gap-6 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-paper">Why it matters</p>
                          <ul className="mt-3 space-y-2 text-sm text-fog">
                            {s.benefits.map((b) => (
                              <li key={b} className="flex gap-2">
                                <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-paper">How we do it</p>
                          <ol className="mt-3 space-y-2 text-sm text-fog">
                            {s.process.map((p, n) => (
                              <li key={p} className="flex gap-2">
                                <span className="font-display text-xs font-bold text-accent">{n + 1}.</span>
                                {p}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>

                      <div className="mt-7 flex flex-wrap gap-3">
                        <a
                          href={waLink(`Hello Teguh Raya Workshop, I would like to book: ${s.name}.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary"
                        >
                          Book {s.name}
                        </a>
                        {experienceForService[s.slug] && (
                          <Link href={`/experience/${experienceForService[s.slug]}`} className="btn-ghost">
                            <Play size={15} aria-hidden /> Watch this repair
                          </Link>
                        )}
                      </div>
                    </article>
                  </Reveal>
                ))}
            </div>
          </div>
        </section>
      ))}

      <CtaBand
        title="Not sure which service you need?"
        lead="Describe the symptom on WhatsApp — a noise, a warning light, a feeling in the pedal — and we'll tell you what to book."
        waMessage="Hello Teguh Raya Workshop, my car has a problem and I'm not sure which service I need. Can you advise?"
      />
    </>
  );
}
