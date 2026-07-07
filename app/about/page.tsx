import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Teguh Raya Workshop is a family-run car servicing and repair workshop in Kampung Serambangun, Tutong, Brunei — built on honest diagnosis and workmanship that lasts.",
};

const values = [
  {
    title: "Teguh — steadfast",
    body: "Our name is our standard. A repair from this workshop should hold — through the wet season, up the coast road, year after year. We stand behind our work, and when something isn't right, we make it right.",
  },
  {
    title: "Transparency before torque",
    body: "You see the worn part before we replace it. You get the estimate before we start. You get a call before anything unplanned is touched. That's not a marketing line — it's how every job card in this workshop runs.",
  },
  {
    title: "Tutong first",
    body: "We're from here and we work here. Our customers are neighbours, their businesses are local businesses, and our reputation lives in this district. That keeps our standards honest better than any slogan could.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A workshop built on being recommendable"
        lead="Teguh Raya Workshop is a servicing and repair workshop in Kampung Serambangun, Tutong. Our growth has come almost entirely from one source: customers telling other people about us."
      />

      <section className="section">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-steel">
              <SmartImage src="/images/workshop/exterior.jpg" alt="Teguh Raya Workshop in Kampung Serambangun, Tutong" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="h-display text-3xl">How we work</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-fog">
              <p>
                Every vehicle that comes through our gate gets the same treatment: a proper
                diagnosis before a quote, a clear explanation in plain language, and repair
                work done to specification — correct parts, correct torque, correct fluids,
                road-tested before handover.
              </p>
              <p>
                We deliberately focus on what we do best: car servicing and mechanical
                repair. We don't take on welding, wiring or air-conditioning work, because a
                workshop that claims to do everything usually does nothing exceptionally.
                For those jobs, we'll point you to specialists we trust.
              </p>
              <p>
                Alongside private customers, we run maintenance programmes for company
                fleets across Tutong and Bandar Seri Begawan — scheduled servicing,
                priority slots and consolidated invoicing that keeps business vehicles
                on the road and paperwork off your desk.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section border-y border-steel bg-charcoal/40">
        <div className="wrap">
          <Reveal>
            <h2 className="h-display text-3xl">What we stand for</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <div className="card relative h-full overflow-hidden p-7">
                  <div aria-hidden className="absolute inset-y-0 left-0 w-1 bg-accent" />
                  <h3 className="h-display text-lg">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
