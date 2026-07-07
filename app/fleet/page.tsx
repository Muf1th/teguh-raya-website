import type { Metadata } from "next";
import { Check } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Corporate Fleet Solutions",
  description:
    "Fleet maintenance packages for businesses in Brunei — priority booking, consolidated invoicing, per-vehicle service records and a dedicated contact. Basic, Standard and Premium tiers.",
};

const tiers = [
  {
    name: "Basic Fleet",
    tagline: "For small fleets that want scheduled care",
    size: "2 – 4 vehicles",
    highlight: false,
    features: [
      "Scheduled preventive servicing per vehicle",
      "Per-vehicle service history records",
      "Consolidated monthly invoice",
      "WhatsApp booking channel",
      "Corporate rate on parts and labour",
    ],
  },
  {
    name: "Standard Fleet",
    tagline: "The package most local businesses choose",
    size: "5 – 9 vehicles",
    highlight: true,
    features: [
      "Everything in Basic Fleet",
      "Priority booking slots",
      "Dedicated service contact",
      "Monthly fleet condition report",
      "Maintenance scheduling planned around your operations",
      "Pre-inspection reminders before vehicle road tax renewals",
    ],
  },
  {
    name: "Premium Fleet",
    tagline: "Maximum uptime for operations that can't stop",
    size: "10+ vehicles",
    highlight: false,
    features: [
      "Everything in Standard Fleet",
      "Same-week repair priority",
      "Quarterly fleet review meeting",
      "Annual service contract with locked-in rates",
      "Staggered servicing so your fleet never stops at once",
      "Direct line to the workshop manager",
    ],
  },
];

const pillars = [
  {
    title: "Preventive maintenance",
    body: "Scheduled servicing catches wear items before they fail on the road. A belt replaced on time costs a fraction of the engine it saves.",
  },
  {
    title: "Priority booking",
    body: "Fleet vehicles jump the queue. Planned services happen on your schedule — staggered so your operation keeps running.",
  },
  {
    title: "Consolidated invoicing",
    body: "One clear invoice per month instead of scattered receipts. Your accounts team will thank you.",
  },
  {
    title: "Monthly reports",
    body: "A plain-language summary of work done, costs per vehicle and what's coming due — the paper trail audits and resale value depend on.",
  },
  {
    title: "Dedicated service advisor",
    body: "One person who knows your vehicles, your history and your schedule. No re-explaining, no starting from zero.",
  },
  {
    title: "Vehicle history",
    body: "Every job recorded per vehicle from day one. When you sell or rotate a vehicle, its full documented history goes with it.",
  },
];

export default function FleetPage() {
  return (
    <>
      <PageHeader
        eyebrow="Corporate fleet solutions"
        title="Your vehicles should be earning, not waiting"
        lead="Ad-hoc repairs are the most expensive way to run a fleet: unplanned downtime, scattered receipts, no history. Our fleet programmes replace that with planned maintenance, priority slots and one monthly invoice."
      />

      <section className="section">
        <div className="wrap">
          <SectionHeading
            eyebrow="What's included"
            title="Six things every fleet client gets"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.04}>
                <div className="card h-full p-7">
                  <h3 className="h-display text-lg">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fog">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-y border-steel bg-charcoal/40">
        <div className="wrap">
          <SectionHeading
            eyebrow="Packages"
            title="Three tiers, sized to your fleet"
            lead="Pricing is quoted per fleet after a short assessment — vehicle count, age, mileage and usage all matter. Message us and we'll prepare a proposal within days."
          />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <div className={`card relative flex h-full flex-col p-7 sm:p-8 ${t.highlight ? "border-accent" : ""}`}>
                  {t.highlight && (
                    <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                      Most chosen
                    </span>
                  )}
                  <h3 className="h-display text-xl">{t.name}</h3>
                  <p className="mt-1 text-sm text-fog">{t.tagline}</p>
                  <p className="mt-4 font-display text-sm font-bold uppercase tracking-wider text-accent">{t.size}</p>
                  <ul className="mt-6 flex-1 space-y-3 text-sm text-fog">
                    {t.features.map((f) => (
                      <li key={f} className="flex gap-2.5">
                        <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={waLink(`Hello Teguh Raya Workshop, I would like to discuss the ${t.name} package for my company's vehicles.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${t.highlight ? "btn-primary" : "btn-ghost"} mt-8 w-full`}
                  >
                    Request a proposal
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeading
            eyebrow="How it starts"
            title="From first message to first service"
          />
          <Reveal delay={0.05} className="mt-10">
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Fleet assessment", "We review your vehicles — count, age, mileage, usage — and how your operation runs."],
                ["Tailored proposal", "You receive a written proposal with the right tier, schedule and corporate rates."],
                ["Maintenance calendar", "We build a staggered servicing calendar around your busiest days, not ours."],
                ["Ongoing programme", "Priority servicing begins, with monthly reports and one consolidated invoice."],
              ].map(([title, body], i) => (
                <li key={title} className="card p-6">
                  <span className="font-display text-xs font-bold uppercase tracking-widest text-accent">
                    Step {i + 1}
                  </span>
                  <h3 className="h-display mt-3 text-base">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fog">{body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Let's talk about your fleet"
        lead="Tell us how many vehicles you run and what they do — we'll come back with a proposal, not a sales pitch."
        waMessage="Hello Teguh Raya Workshop, I'm interested in fleet maintenance for my company. We run [number] vehicles."
      />
    </>
  );
}
