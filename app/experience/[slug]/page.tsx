import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import RepairExperience from "@/components/scenes";
import CtaBand from "@/components/CtaBand";
import { experiences } from "@/lib/experiences";
import { waLink } from "@/lib/site";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const exp = experiences.find((e) => e.slug === params.slug);
  if (!exp) return {};
  return {
    title: `${exp.name} — Watch the Repair`,
    description: `${exp.tagline} Interactive animated explanation from Teguh Raya Workshop, Tutong.`,
  };
}

export default function ExperienceDetailPage({ params }: Props) {
  const idx = experiences.findIndex((e) => e.slug === params.slug);
  if (idx === -1) notFound();
  const exp = experiences[idx];
  const next = experiences[(idx + 1) % experiences.length];

  return (
    <>
      <section className="blueprint-grid border-b border-steel pb-14 pt-32 sm:pt-40">
        <div className="wrap">
          <Reveal>
            <Link href="/experience" className="inline-flex items-center gap-1.5 text-sm text-fog hover:text-paper">
              <ArrowLeft size={15} aria-hidden /> All repair experiences
            </Link>
            <p className="eyebrow mt-8">Scene {String(idx + 1).padStart(2, "0")} · Interactive</p>
            <h1 className="h-display mt-4 max-w-3xl text-4xl sm:text-5xl">{exp.name}</h1>
            <p className="mt-4 max-w-2xl leading-relaxed text-fog">{exp.tagline}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <RepairExperience sceneKey={exp.sceneKey} />
            <p className="mt-3 text-xs text-fog">
              Tip: drag the timeline to scrub through the repair at your own pace.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4">
              {[
                ["The problem", exp.problem],
                ["Why it happens", exp.causes],
              ].map(([title, body]) => (
                <div key={title} className="card p-6">
                  <h2 className="mono-label text-accent">{title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{body}</p>
                </div>
              ))}
              <div className="card p-6">
                <h2 className="mono-label text-accent">Symptoms you'd notice</h2>
                <ul className="mt-3 space-y-2 text-sm text-fog">
                  {exp.symptoms.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />{s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card p-6">
                <h2 className="mono-label text-accent">What we replace</h2>
                <ul className="mt-3 space-y-2 text-sm text-fog">
                  {exp.parts.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />{p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card relative overflow-hidden p-6">
                <div aria-hidden className="absolute inset-y-0 left-0 w-1 bg-accent" />
                <h2 className="mono-label text-accent">After the repair</h2>
                <p className="mt-3 text-sm leading-relaxed text-paper">{exp.outcome}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={waLink(`Hello Teguh Raya Workshop, I watched the ${exp.name} experience on your website and would like to book this service.`)}
                    target="_blank" rel="noopener noreferrer" className="btn-primary !min-h-10 !px-5 !py-2 !text-xs"
                  >
                    Book this repair
                  </a>
                  <Link href={`/services#${exp.serviceSlug}`} className="btn-ghost !min-h-10 !px-5 !py-2 !text-xs">
                    Service details
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="wrap mt-10">
          <Link href={`/experience/${next.slug}`} className="group inline-flex items-center gap-2 text-sm font-semibold text-fog hover:text-paper">
            Next experience: {next.name}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
