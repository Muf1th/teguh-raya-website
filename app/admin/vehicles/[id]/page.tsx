import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { requireAdmin } from "@/lib/admin";
import { getSupabase } from "@/lib/supabase";
import {
  formatDate,
  nextServiceDate,
  nextServiceMileage,
  reminderMessage,
  reminderWaLink,
  type VehicleWithCustomer,
} from "@/lib/reminders";
import { recordService, updateVehicle } from "../../actions";

export const dynamic = "force-dynamic";

const input =
  "w-full rounded-xl border border-steel bg-ink px-4 py-3 text-sm focus:border-accent focus:outline-none";
const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-fog";

type ServiceRow = {
  id: string;
  service_date: string;
  mileage: number | null;
  work_done: string;
  cost: number | null;
};

export default async function VehiclePage({ params }: { params: { id: string } }) {
  requireAdmin();
  const db = getSupabase();

  const { data: vehicle } = await db
    .from("vehicles")
    .select("*, customers(id, name, phone)")
    .eq("id", params.id)
    .single();
  if (!vehicle) notFound();
  const v = vehicle as unknown as VehicleWithCustomer;

  const { data: services } = await db
    .from("services")
    .select("id, service_date, mileage, work_done, cost")
    .eq("vehicle_id", params.id)
    .order("service_date", { ascending: false });
  const history = (services ?? []) as ServiceRow[];

  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-fog hover:text-paper">
        <ArrowLeft size={15} aria-hidden /> Back to reminders
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="h-display text-2xl">
            {v.make} {v.model} · {v.plate}
          </h1>
          <p className="mt-1 text-sm text-fog">
            {v.customers?.name} · {v.customers?.phone}
          </p>
          <p className="mt-2 text-sm text-fog">
            Next service: <span className="text-paper">{formatDate(nextServiceDate(v))}</span>
            {nextServiceMileage(v) != null && (
              <> / <span className="text-paper">{nextServiceMileage(v)!.toLocaleString()} km</span></>
            )}
          </p>
        </div>
        {v.customers?.phone && (
          <a href={reminderWaLink(v)} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <MessageCircle size={16} aria-hidden /> Send reminder
          </a>
        )}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Record a service */}
        <section className="card p-6">
          <h2 className="h-display text-lg">Record a completed service</h2>
          <p className="mt-1 text-xs text-fog">
            Saving this automatically resets the reminder clock.
          </p>
          <form action={recordService} className="mt-4 space-y-4">
            <input type="hidden" name="vehicle_id" value={v.id} />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="s-date" className={label}>Service date *</label>
                <input id="s-date" name="service_date" type="date" required defaultValue={today} className={input} />
              </div>
              <div>
                <label htmlFor="s-km" className={label}>Mileage (km)</label>
                <input id="s-km" name="mileage" inputMode="numeric" className={input} />
              </div>
            </div>
            <div>
              <label htmlFor="s-work" className={label}>Work done *</label>
              <textarea id="s-work" name="work_done" required rows={3} className={input}
                placeholder="e.g. Oil & filter change, brake pads front" />
            </div>
            <div>
              <label htmlFor="s-cost" className={label}>Cost (BND)</label>
              <input id="s-cost" name="cost" inputMode="decimal" className={input} />
            </div>
            <button className="btn-primary w-full">Save service</button>
          </form>
        </section>

        {/* Vehicle settings */}
        <section className="card p-6">
          <h2 className="h-display text-lg">Vehicle settings</h2>
          <form action={updateVehicle} className="mt-4 space-y-4">
            <input type="hidden" name="vehicle_id" value={v.id} />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="v-cm" className={label}>Current mileage (km)</label>
                <input id="v-cm" name="current_mileage" inputMode="numeric"
                  defaultValue={v.current_mileage ?? ""} className={input} />
              </div>
              <div>
                <label htmlFor="v-ikm" className={label}>Service every (km)</label>
                <input id="v-ikm" name="service_interval_km" inputMode="numeric"
                  defaultValue={v.service_interval_km} className={input} />
              </div>
              <div>
                <label htmlFor="v-imo" className={label}>Or every (months)</label>
                <input id="v-imo" name="service_interval_months" inputMode="numeric"
                  defaultValue={v.service_interval_months} className={input} />
              </div>
            </div>
            <div>
              <label htmlFor="v-notes" className={label}>Notes</label>
              <textarea id="v-notes" name="notes" rows={2} defaultValue={v.notes ?? ""} className={input} />
            </div>
            <button className="btn-ghost w-full">Update settings</button>
          </form>
        </section>
      </div>

      {/* Message preview */}
      <section className="card mt-8 p-6">
        <h2 className="h-display text-lg">Reminder message preview</h2>
        <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-steel bg-ink p-4 text-sm leading-relaxed text-fog">
{reminderMessage(v)}
        </pre>
      </section>

      {/* History */}
      <section className="mt-8">
        <h2 className="h-display text-lg">Service history</h2>
        {history.length === 0 ? (
          <p className="mt-3 text-sm text-fog">No services recorded yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {history.map((s) => (
              <div key={s.id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <p className="text-sm font-semibold">
                    {new Date(s.service_date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    {s.mileage != null && <span className="text-fog"> · {s.mileage.toLocaleString()} km</span>}
                  </p>
                  <p className="mt-1 text-sm text-fog">{s.work_done}</p>
                </div>
                {s.cost != null && <p className="font-display text-sm font-bold">B${Number(s.cost).toFixed(2)}</p>}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
