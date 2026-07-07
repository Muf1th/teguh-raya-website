import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Teguh Raya Workshop handles the personal information you share with us.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" lead="Last updated: July 2026" />
      <section className="section">
        <div className="wrap max-w-3xl">
          <Reveal>
            <div className="space-y-8 leading-relaxed text-fog [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-paper">
              <div>
                <h2>What we collect</h2>
                <p className="mt-2">
                  When you book a service, we collect the details you provide: your name,
                  phone number, email address if given, vehicle details and a description of
                  the problem. This website itself does not store your booking — it opens
                  WhatsApp with your message, and the information is sent only when you
                  press send in WhatsApp.
                </p>
              </div>
              <div>
                <h2>How we use it</h2>
                <p className="mt-2">
                  Your details are used to confirm bookings, carry out and record the work on
                  your vehicle, contact you about your vehicle, and maintain service history
                  records. We do not sell or share your information with third parties for
                  marketing.
                </p>
              </div>
              <div>
                <h2>Service records</h2>
                <p className="mt-2">
                  We keep records of work performed on your vehicle. These records benefit
                  you — they document your service history and support resale value. You may
                  request a copy of your vehicle&rsquo;s records at any time.
                </p>
              </div>
              <div>
                <h2>Third-party services</h2>
                <p className="mt-2">
                  This site embeds Google Maps for directions and links to WhatsApp and
                  Instagram. Those services operate under their own privacy policies.
                </p>
              </div>
              <div>
                <h2>Contact</h2>
                <p className="mt-2">
                  Questions about your data? Contact us at {site.phoneDisplay} or visit us at{" "}
                  {site.address.line}, {site.address.district}, {site.address.country}.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
