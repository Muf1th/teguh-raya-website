import { site } from "./site";

export type VehicleWithCustomer = {
  id: string;
  make: string;
  model: string;
  year: string | null;
  plate: string;
  current_mileage: number | null;
  service_interval_km: number;
  service_interval_months: number;
  last_service_date: string | null; // YYYY-MM-DD
  last_service_mileage: number | null;
  notes: string | null;
  customers: { id: string; name: string; phone: string } | null;
};

export type ReminderStatus = "overdue" | "due-soon" | "ok" | "no-history";

function addMonths(dateStr: string, months: number): Date {
  const d = new Date(dateStr + "T00:00:00");
  d.setMonth(d.getMonth() + months);
  return d;
}

export function nextServiceDate(v: VehicleWithCustomer): Date | null {
  if (!v.last_service_date) return null;
  return addMonths(v.last_service_date, v.service_interval_months);
}

export function nextServiceMileage(v: VehicleWithCustomer): number | null {
  if (v.last_service_mileage == null) return null;
  return v.last_service_mileage + v.service_interval_km;
}

export function reminderStatus(v: VehicleWithCustomer): ReminderStatus {
  const next = nextServiceDate(v);
  const nextKm = nextServiceMileage(v);
  if (!next && nextKm == null) return "no-history";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dateOverdue = next ? next <= today : false;
  const kmOverdue =
    nextKm != null && v.current_mileage != null && v.current_mileage >= nextKm;
  if (dateOverdue || kmOverdue) return "overdue";

  const soonMs = 30 * 24 * 60 * 60 * 1000; // 30 days
  const dateSoon = next ? next.getTime() - today.getTime() <= soonMs : false;
  const kmSoon =
    nextKm != null && v.current_mileage != null && nextKm - v.current_mileage <= 500;
  if (dateSoon || kmSoon) return "due-soon";

  return "ok";
}

export function formatDate(d: Date | null): string {
  if (!d) return "—";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/** Keeps digits only, so "+673 712 3456" becomes "6737123456" for wa.me links. */
export function cleanPhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

/** The reminder message, built from Mufith's template. */
export function reminderMessage(v: VehicleWithCustomer): string {
  const name = v.customers?.name ?? "customer";
  const nextKm = nextServiceMileage(v);
  const next = nextServiceDate(v);
  const vehicle = `${v.make} ${v.model}${v.year ? ` (${v.year})` : ""}, plate ${v.plate}`;

  const when =
    nextKm != null && next
      ? `at ${nextKm.toLocaleString()} km (around ${formatDate(next)})`
      : nextKm != null
      ? `at ${nextKm.toLocaleString()} km`
      : `around ${formatDate(next)}`;

  return [
    `Dear ${name}, this is Mufith from Teguh Raya Workshop.`,
    ``,
    `A friendly reminder that your vehicle ${vehicle} is scheduled for its periodic maintenance service ${when}.`,
    ``,
    `To make a booking, simply reply to this message, call/WhatsApp us at ${site.phoneDisplay}, or book online at ${site.url}/booking.`,
    ``,
    `Thank you, and drive safe!`,
  ].join("\n");
}

/** wa.me link to the CUSTOMER's number with the reminder pre-filled. */
export function reminderWaLink(v: VehicleWithCustomer): string {
  const phone = cleanPhone(v.customers?.phone ?? "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(reminderMessage(v))}`;
}
