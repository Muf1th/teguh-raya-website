import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for bookings and repair work at Teguh Raya Workshop.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" lead="Last updated: July 2026" />
      <section className="section">
        <div className="wrap max-w-3xl">
          <Reveal>
            <div className="space-y-8 leading-relaxed text-fog [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-paper">
              <div>
                <h2>Bookings</h2>
                <p className="mt-2">
                  Bookings made through this website are requests until confirmed by us over
                  WhatsApp or phone. Estimated durations are given in good faith and may
                  change once the vehicle is inspected — we will always inform you.
                </p>
              </div>
              <div>
                <h2>Estimates and approval</h2>
                <p className="mt-2">
                  Repair work begins only after you approve a written or messaged estimate.
                  If additional faults are discovered during the work, we contact you for
                  approval before proceeding. Final costs may vary from estimates where
                  parts pricing or hidden damage differs from initial inspection — again,
                  always with your approval first.
                </p>
              </div>
              <div>
                <h2>Parts and workmanship</h2>
                <p className="mt-2">
                  Parts supplied by us carry the supplier&rsquo;s warranty where applicable.
                  Customer-supplied parts are fitted at the customer&rsquo;s risk and are not
                  covered by our workmanship guarantee. If a repair we performed fails due to
                  our workmanship, return the vehicle and we will make it right.
                </p>
              </div>
              <div>
                <h2>Vehicle collection</h2>
                <p className="mt-2">
                  Please collect vehicles promptly once notified that work is complete.
                  Payment is due on collection unless a fleet or corporate account with
                  agreed terms is in place.
                </p>
              </div>
              <div>
                <h2>Scope of services</h2>
                <p className="mt-2">
                  {site.name} provides car servicing and mechanical repair. We do not
                  undertake welding, wiring or air-conditioning work.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
