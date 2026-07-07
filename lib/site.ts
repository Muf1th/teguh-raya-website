/**
 * Single source of truth for business details.
 * Change a value here and it updates across the entire site.
 */
export const site = {
  name: "Teguh Raya Workshop",
  shortName: "Teguh Raya",
  tagline: "Honest car servicing and repair in Tutong, Brunei",
  description:
    "Teguh Raya Workshop is a professional automotive servicing and repair workshop in Kampung Serambangun, Tutong, Brunei. Engine repair, transmission, brakes, suspension and full vehicle servicing for private owners and corporate fleets.",
  url: "https://www.teguhraya.com", // update after connecting your domain
  phoneDisplay: "+673 869 4620",
  phoneRaw: "6738694620", // digits only, used for tel: and wa.me links
  whatsapp: "https://wa.me/6738694620",
  instagram: "https://www.instagram.com/teguhraya.bn",
  instagramHandle: "@teguhraya.bn",
  address: {
    line: "Kampung Serambangun, Tutong",
    district: "Tutong District",
    country: "Brunei Darussalam",
  },
  // Replace with your exact Google Maps embed link (Share > Embed a map)
  mapEmbed:
    "https://www.google.com/maps?q=Kampung+Serambangun,+Tutong,+Brunei&output=embed",
  hours: [
    { days: "Monday – Saturday", time: "8:00 AM – 5:30 PM" },
    { days: "Friday", time: "8:00 – 11:30 AM, 2:30 – 5:30 PM" },
    { days: "Sunday & Public Holidays", time: "Closed" },
  ],
  stats: [
    { value: 10, suffix: "+", label: "Years of hands-on experience" },
    { value: 4500, suffix: "+", label: "Vehicles serviced and repaired" },
    { value: 1800, suffix: "+", label: "Returning customers" },
    { value: 15, suffix: "+", label: "Fleet vehicles under care" },
  ],
};

/** Builds a wa.me link with a pre-filled message. */
export function waLink(message: string): string {
  return `https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(message)}`;
}

export const defaultWaMessage =
  "Hello Teguh Raya Workshop, I would like to enquire about a service for my vehicle.";
