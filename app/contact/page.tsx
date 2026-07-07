import type { Metadata } from "next";
import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { site, waLink, defaultWaMessage } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Directions",
  description:
    "Contact Teguh Raya Workshop in Kampung Serambangun, Tutong, Brunei. WhatsApp +673 869 4620, Instagram @teguhraya.bn. Map, directions and opening hours.",
};

const channels = [
  {
    icon: MessageCircle,
    title: "WhatsApp (fastest)",
    body: "Message us your vehicle and the problem — photos help. We reply during working hours.",
    action: { label: site.phoneDisplay, href: waLink(defaultWaMessage) },
  },
  {
    icon: Phone,
    title: "Call us",
    body: "For urgent matters during opening hours, a call gets you straight through.",
    action: { label: site.phoneDisplay, href: `tel:+${site.phoneRaw}` },
  },
  {
    icon: Instagram,
    title: "Instagram",
    body: "Recent work, updates and announcements from the workshop floor.",
    action: { label: site.instagramHandle, href: site.instagram },
  },
  {
    icon: MapPin,
    title: "Visit us",
    body: `${site.address.line}, ${site.address.district}, ${site.address.country}. Walk-ins welcome for quick jobs.`,
    action: { label: "Open in Google Maps", href: "https://maps.google.com/?q=Kampung+Serambangun+Tutong+Brunei" },
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to a mechanic, not a machine"
        lead="Whichever channel you choose, a real person from the workshop answers — usually the person who'll work on your car."
      />

      <section className="section">
        <div className="wrap grid gap-4 sm:grid-cols-2">
          {channels.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div className="card h-full p-7">
                <c.icon size={22} className="text-accent" aria-hidden />
                <h2 className="h-display mt-4 text-lg">{c.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-fog">{c.body}</p>
                <a
                  href={c.action.href}
                  target={c.action.href.startsWith("tel:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="mt-4 inline-block font-display text-sm font-bold text-paper underline decoration-accent decoration-2 underline-offset-4"
                >
                  {c.action.label}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section border-t border-steel bg-charcoal/40">
        <div className="wrap">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-steel">
              <iframe
                src={site.mapEmbed}
                title="Map showing the location of Teguh Raya Workshop in Tutong, Brunei"
                className="h-96 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
