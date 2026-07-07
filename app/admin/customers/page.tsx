import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { getSupabase } from "@/lib/supabase";
import { addCustomerWithVehicle, deleteCustomer } from "../actions";

export const dynamic = "force-dynamic";

const input =
  "w-full rounded-xl border border-steel bg-ink px-4 py-3 text-sm focus:border-accent focus:outline-none";
const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-fog";

type CustomerRow = {
  id: string;
  name: string;
  phone: string;
  vehicles: { id: string; make: string; model: string; plate: string }[];
};

export default async function AdminCustomersPage({
  searchParams,
}: {
  searchParams: { added?: string };
}) {
  requireAdmin();
  const db = getSupabase();
  const { data, error } = await db
    .from("customers")
    .select("id, name, phone, vehicles(id, make, model, plate)")
    .order("created_at", { ascending: false });

  const customers = (data ?? []) as unknown as CustomerRow[];

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <div>
        <h1 className="h-display text-2xl">Customers</h1>
        {searchParams.added && (
          <p className="mt-2 text-sm text-accent">Customer added ✓</p>
        )}
        {error && <p className="mt-2 text-sm text-accent">Database error: {error.message}</p>}
        <div className="mt-6 space-y-3">
          {customers.length === 0 && (
            <p className="text-sm text-fog">No customers yet — add your first one with the form.</p>
          )}
          {customers.map((c) => (
            <div key={c.id} className="card flex flex-wrap items-center justify-between gap-4 p-5">
              <div>
                <p className="font-display font-bold">{c.name}</p>
                <p className="mt-0.5 text-sm text-fog">{c.phone}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {c.vehicles.map((v) => (
                    <Link
                      key={v.id}
                      href={`/admin/vehicles/${v.id}`}
                      className="rounded-full border border-steel px-3 py-1 text-xs text-fog hover:border-accent hover:text-paper"
                    >
                      {v.make} {v.model} · {v.plate}
                    </Link>
                  ))}
                </div>
              </div>
              <form
                action={deleteCustomer}
              >
                <input type="hidden" name="customer_id" value={c.id} />
                <button className="text-xs text-fog underline underline-offset-4 hover:text-accent">
                  Delete
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>

      <aside>
        <h2 className="h-display text-lg">Add customer & vehicle</h2>
        <form action={addCustomerWithVehicle} className="card mt-4 space-y-4 p-6">
          <div>
            <label htmlFor="c-name" className={label}>Customer name *</label>
            <input id="c-name" name="name" required className={input} />
          </div>
          <div>
            <label htmlFor="c-phone" className={label}>WhatsApp number *</label>
            <input id="c-phone" name="phone" required placeholder="+673 …" className={input} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="c-make" className={label}>Make *</label>
              <input id="c-make" name="make" required placeholder="Toyota" className={input} />
            </div>
            <div>
              <label htmlFor="c-model" className={label}>Model *</label>
              <input id="c-model" name="model" required placeholder="Hilux" className={input} />
            </div>
            <div>
              <label htmlFor="c-year" className={label}>Year</label>
              <input id="c-year" name="year" className={input} />
            </div>
            <div>
              <label htmlFor="c-plate" className={label}>Plate *</label>
              <input id="c-plate" name="plate" required className={input} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="c-lsd" className={label}>Last service date</label>
              <input id="c-lsd" name="last_service_date" type="date" className={input} />
            </div>
            <div>
              <label htmlFor="c-lsm" className={label}>Mileage at last service</label>
              <input id="c-lsm" name="last_service_mileage" inputMode="numeric" className={input} />
            </div>
            <div>
              <label htmlFor="c-ikm" className={label}>Service every (km)</label>
              <input id="c-ikm" name="service_interval_km" defaultValue={5000} inputMode="numeric" className={input} />
            </div>
            <div>
              <label htmlFor="c-imo" className={label}>Or every (months)</label>
              <input id="c-imo" name="service_interval_months" defaultValue={6} inputMode="numeric" className={input} />
            </div>
          </div>
          <div>
            <label htmlFor="c-cm" className={label}>Current mileage (km)</label>
            <input id="c-cm" name="current_mileage" inputMode="numeric" className={input} />
          </div>
          <button className="btn-primary w-full">Save customer</button>
          <p className="text-xs leading-relaxed text-fog">
            Tip: fill last service date + mileage and the reminder date is calculated automatically.
          </p>
        </form>
      </aside>
    </div>
  );
}
