import { site } from "@/lib/site";

/** LocalBusiness structured data for Google local search. */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: `+${site.phoneRaw}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tutong",
      addressRegion: "Tutong District",
      addressCountry: "BN",
      streetAddress: site.address.line,
    },
    sameAs: [site.instagram],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"],
        opens: "08:00",
        closes: "17:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "08:00",
        closes: "11:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "14:30",
        closes: "17:30",
      },
    ],
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
