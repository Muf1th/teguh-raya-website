import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import GalleryGrid from "@/components/GalleryGrid";
import BeforeAfter from "@/components/BeforeAfter";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Gallery — Real Work From Our Workshop",
  description:
    "Photos from the Teguh Raya Workshop floor in Tutong, Brunei: repairs in progress, before-and-after results, our team and our customers' vehicles. No stock photos.",
};

// Drop your photos into /public/images/gallery/ with these filenames,
// or edit this list to match your own filenames.
const galleryItems = [
  { src: "/images/gallery/work-1.jpg", alt: "Engine repair in progress" },
  { src: "/images/gallery/work-2.jpg", alt: "Brake disc and pad replacement" },
  { src: "/images/gallery/work-3.jpg", alt: "Suspension component replacement" },
  { src: "/images/gallery/work-4.jpg", alt: "Gearbox removed for clutch replacement" },
  { src: "/images/gallery/work-5.jpg", alt: "Timing belt replacement" },
  { src: "/images/gallery/work-6.jpg", alt: "Vehicle on the ramp for inspection" },
  { src: "/images/workshop/floor-1.jpg", alt: "The workshop floor at Teguh Raya" },
  { src: "/images/workshop/floor-2.jpg", alt: "Tools and equipment area" },
  { src: "/images/staff/team-1.jpg", alt: "Teguh Raya technician at work" },
  { src: "/images/customers/handover-1.jpg", alt: "Vehicle handover to a customer" },
  { src: "/images/gallery/work-7.jpg", alt: "Cooling system pressure test" },
  { src: "/images/gallery/work-8.jpg", alt: "Completed engine bay after service" },
];

const comparisons = [
  { before: "/images/before-after/engine-1-before.jpg", after: "/images/before-after/engine-1-after.jpg", alt: "Engine bay clean and rebuild" },
  { before: "/images/before-after/brakes-1-before.jpg", after: "/images/before-after/brakes-1-after.jpg", alt: "Worn brakes replaced" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Our work, photographed honestly"
        lead="Everything here was shot in our own workshop in Kampung Serambangun. No stock photos, no borrowed images — if it's on this page, we did it."
      />

      <section className="section">
        <div className="wrap">
          <Reveal>
            <GalleryGrid items={galleryItems} />
          </Reveal>
        </div>
      </section>

      <section className="section border-t border-steel bg-charcoal/40">
        <div className="wrap">
          <SectionHeading
            eyebrow="Before & after"
            title="Drag the slider, judge for yourself"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {comparisons.map((c, i) => (
              <Reveal key={c.alt} delay={i * 0.08}>
                <BeforeAfter {...c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Want your car in this gallery?"
        lead="Send us a photo of the problem on WhatsApp — we'll tell you honestly what it needs."
      />
    </>
  );
}
