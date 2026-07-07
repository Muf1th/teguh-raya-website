import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { posts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog — Car Care Advice From the Workshop",
  description:
    "Practical car maintenance advice from Teguh Raya Workshop in Tutong, Brunei — brakes, engines, fleet maintenance and how to avoid expensive repairs.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Advice from the workshop floor"
        lead="Short, practical articles written to save you money — not to sell you work."
      />
      <section className="section">
        <div className="wrap grid gap-4 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <Link href={`/blog/${p.slug}`} className="card group block h-full p-7 transition-colors hover:border-accent/60">
                <p className="text-xs uppercase tracking-wider text-fog">
                  {new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {p.readMinutes} min read
                </p>
                <h2 className="h-display mt-3 text-lg leading-snug">{p.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-fog">{p.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Read article <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
