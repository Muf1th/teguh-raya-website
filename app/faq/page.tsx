import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBand from "@/components/CtaBand";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about booking, pricing, vehicle makes, timeframes and fleet services at Teguh Raya Workshop in Tutong, Brunei.",
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Straight answers to common questions"
        lead="If your question isn't here, WhatsApp us — a real person from the workshop replies."
      />
      <section className="section">
        <div className="wrap max-w-3xl">
          <Reveal>
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </section>
      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
