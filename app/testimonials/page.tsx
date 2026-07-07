import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import TestimonialCard from "@/components/TestimonialCard";
import CtaBand from "@/components/CtaBand";
import { testimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Customer Testimonials",
  description:
    "What drivers and fleet managers in Brunei say about Teguh Raya Workshop — honest diagnosis, clear pricing and repairs that last.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="Word of mouth, in writing"
        lead="Most of our work comes from recommendations. Here's what customers tell us — and tell their friends."
      />
      <section className="section">
        <div className="wrap grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.05}>
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand
        title="Experience it yourself"
        lead="One honest service is all it takes to see the difference. Book your first visit on WhatsApp."
      />
    </>
  );
}
