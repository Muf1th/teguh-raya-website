import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import BookingForm from "@/components/BookingForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Service",
  description:
    "Book car servicing or repair at Teguh Raya Workshop in Tutong, Brunei. Fill in your vehicle details and confirm your booking instantly over WhatsApp.",
};

export default function BookingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Booking"
        title="Book in under a minute"
        lead="Fill in your details, press the button, and WhatsApp opens with your booking message ready to send. We confirm your slot during working hours — usually within the hour."
      />
      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_320px]">
          <Reveal>
            <BookingForm />
          </Reveal>
          <Reveal delay={0.1}>
            <aside className="card h-fit p-7">
              <h2 className="h-display text-lg">Prefer to talk?</h2>
              <p className="mt-2 text-sm leading-relaxed text-fog">
                Call or WhatsApp us directly — describe the symptom and we&rsquo;ll tell
                you what to book.
              </p>
              <p className="mt-4 font-display text-lg font-bold">{site.phoneDisplay}</p>
              <div className="mt-6 border-t border-steel pt-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-fog">Opening hours</h3>
                <ul className="mt-3 space-y-2 text-sm text-fog">
                  {site.hours.map((h) => (
                    <li key={h.days} className="flex justify-between gap-4">
                      <span>{h.days}</span>
                      <span className="text-paper">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
