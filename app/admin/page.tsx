import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { requireAdmin } from "@/lib/admin";
import { getSupabase } from "@/lib/supabase";
import {
  formatDate,
  nextServiceDate,
  nextServiceMileage,
  reminderStatus,
  reminderWaLink,
  type VehicleWithCustomer,
} from "@/lib/reminders";

export const dynamic = "force-dynamic";

const statusStyles: Record<string, string> = {
  overdue: "bg-accent text-paper",
  "due-soon": "border border-accent text-accent",
  ok: "border border-steel text-fog",
  "no-history": "border border-steel text-fog",
};
const statusLabels: Record<string, string> = {
  overdue: "Overdue",
  "due-soon": "Due soon",
  ok: "OK",
  "no-history": "No history yet",
};

export default async function AdminDashboard() {
  requireAdmin();
  const db = getSupabase();
  const { data, error } = await db
    .from("vehicles")
    .select("*, customers(id, name, phone)")
    .order("last_service_date", { ascending: true, nullsFirst: true });

  if (error) {
    return (
      <p className="text-sm text-accent">
        Database error: {error.message}. Check the Supabase environment variables in Vercel.
      </p>
    );
  }

  const vehicles = (data ?? []) as unknown as VehicleWithCustomer[];
  const overdue = vehicles.filter((v) => reminderStatus(v) === "overdue");
  const dueSoon = vehicles.filter((v) => reminderStatus(v) === "due-soon");
  const rest = vehicles.filter((v) => !["overdue", "due-soon"].includes(reminderStatus(v)));

  const Section = ({ title, list }: { title: string; list: VehicleWithCustomer[] }) => (
    <section className="mt-8">
      <h2 className="eyebrow !text-fog">{title} · {list.length}</h2>
      {list.length === 0 ? (
        <p className="mt-3 text-sm text-fog">Nothing here — all good.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {list.map((v) => {
            const status = reminderStatus(v);
            return (
              <div key={v.id} className="card flex flex-wrap items-center justify-between gap-4 p-5">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display font-bold">
                      {v.customers?.name ?? "Unknown customer"}
                    </p>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusStyles[status]}`}>
                      {statusLabels[status]}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-fog">
                    {v.make} {v.model} · {v.plate}
                    {v.customers?.phone ? ` · ${v.customers.phone}` : ""}
                  </p>
                  <p className="mt-1 text-xs text-fog">
                    Next service: {formatDate(nextServiceDate(v))}
                    {nextServiceMileage(v) != null ? ` / ${nextServiceMileage(v)!.toLocaleString()} km` : ""}
                    {v.current_mileage != null ? ` · Current: ${v.current_mileage.toLocaleString()} km` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  {v.customers?.phone && status !== "no-history" && (
                    <a href={reminderWaLink(v)} target="_blank" rel="noopener noreferrer" className="btn-primary !min-h-10 !px-4 !py-2 !text-xs">
                      <MessageCircle size={14} aria-hidden /> Send reminder
                    </a>
                  )}
                  <Link href={`/admin/vehicles/${v.id}`} className="btn-ghost !min-h-10 !px-4 !py-2 !text-xs">
                    Open
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="h-display text-2xl">Service reminders</h1>
          <p className="mt-1 text-sm text-fog">
            {vehicles.length} vehicle{vehicles.length === 1 ? "" : "s"} on record.
            &ldquo;Send reminder&rdquo; opens WhatsApp with the message written — you just press send.
          </p>
        </div>
        <Link href="/admin/customers" className="btn-primary">+ Add customer</Link>
      </div>
      <Section title="Overdue — send today" list={overdue} />
      <Section title="Due within 30 days" list={dueSoon} />
      <Section title="Everything else" list={rest} />
    </>
  );
}
