import Link from "next/link";
import { Phone } from "lucide-react";
import Reveal from "./Reveal";
import { site, waLink } from "@/lib/site";

type Props = {
  title?: string;
  lead?: string;
  waMessage?: string;
};

export default function CtaBand({
  title = "Ready to book your service?",
  lead = "Message us on WhatsApp with your vehicle and the problem — we reply during working hours with a slot and an honest estimate.",
  waMessage = "Hello Teguh Raya Workshop, I would like to book a service.",
}: Props) {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal>
          <div className="card relative overflow-hidden p-8 sm:p-14">
            {/* signature service stripe */}
            <div aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-accent" />
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <h2 className="h-display text-2xl sm:text-3xl">{title}</h2>
                <p className="mt-3 text-fog">{lead}</p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <a href={waLink(waMessage)} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Book via WhatsApp
                </a>
                <a href={`tel:+${site.phoneRaw}`} className="btn-ghost">
                  <Phone size={16} aria-hidden /> {site.phoneDisplay}
                </a>
                <Link href="/booking" className="btn-ghost">
                  Booking form
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
