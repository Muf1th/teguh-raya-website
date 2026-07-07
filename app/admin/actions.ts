"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, adminToken, requireAdmin } from "@/lib/admin";
import { getSupabase } from "@/lib/supabase";

/* ---------- Auth ---------- */

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login?error=1");
  }
  cookies().set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  redirect("/admin");
}

export async function logout() {
  cookies().delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

/* ---------- Customers & vehicles ---------- */

export async function addCustomerWithVehicle(formData: FormData) {
  requireAdmin();
  const db = getSupabase();

  const { data: customer, error: cErr } = await db
    .from("customers")
    .insert({
      name: String(formData.get("name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
    })
    .select("id")
    .single();
  if (cErr || !customer) throw new Error(cErr?.message ?? "Could not add customer");

  const { error: vErr } = await db.from("vehicles").insert({
    customer_id: customer.id,
    make: String(formData.get("make") ?? "").trim(),
    model: String(formData.get("model") ?? "").trim(),
    year: String(formData.get("year") ?? "").trim() || null,
    plate: String(formData.get("plate") ?? "").trim().toUpperCase(),
    current_mileage: numOrNull(formData.get("current_mileage")),
    service_interval_km: numOrNull(formData.get("service_interval_km")) ?? 5000,
    service_interval_months: numOrNull(formData.get("service_interval_months")) ?? 6,
    last_service_date: strOrNull(formData.get("last_service_date")),
    last_service_mileage: numOrNull(formData.get("last_service_mileage")),
  });
  if (vErr) throw new Error(vErr.message);

  revalidatePath("/admin");
  revalidatePath("/admin/customers");
  redirect("/admin/customers?added=1");
}

export async function deleteCustomer(formData: FormData) {
  requireAdmin();
  const db = getSupabase();
  await db.from("customers").delete().eq("id", String(formData.get("customer_id")));
  revalidatePath("/admin");
  revalidatePath("/admin/customers");
}

/* ---------- Services & mileage ---------- */

export async function recordService(formData: FormData) {
  requireAdmin();
  const db = getSupabase();
  const vehicleId = String(formData.get("vehicle_id"));
  const date = String(formData.get("service_date"));
  const mileage = numOrNull(formData.get("mileage"));

  const { error: sErr } = await db.from("services").insert({
    vehicle_id: vehicleId,
    service_date: date,
    mileage,
    work_done: String(formData.get("work_done") ?? "").trim(),
    cost: numOrNull(formData.get("cost")),
  });
  if (sErr) throw new Error(sErr.message);

  // Recording a service resets the reminder clock automatically
  const { error: vErr } = await db
    .from("vehicles")
    .update({
      last_service_date: date,
      last_service_mileage: mileage,
      current_mileage: mileage,
    })
    .eq("id", vehicleId);
  if (vErr) throw new Error(vErr.message);

  revalidatePath("/admin");
  revalidatePath(`/admin/vehicles/${vehicleId}`);
}

export async function updateVehicle(formData: FormData) {
  requireAdmin();
  const db = getSupabase();
  const vehicleId = String(formData.get("vehicle_id"));
  await db
    .from("vehicles")
    .update({
      current_mileage: numOrNull(formData.get("current_mileage")),
      service_interval_km: numOrNull(formData.get("service_interval_km")) ?? 5000,
      service_interval_months: numOrNull(formData.get("service_interval_months")) ?? 6,
      notes: strOrNull(formData.get("notes")),
    })
    .eq("id", vehicleId);
  revalidatePath("/admin");
  revalidatePath(`/admin/vehicles/${vehicleId}`);
}

/* ---------- helpers ---------- */
function numOrNull(v: FormDataEntryValue | null): number | null {
  const s = String(v ?? "").trim();
  if (!s) return null;
  const n = Number(s.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}
function strOrNull(v: FormDataEntryValue | null): string | null {
  const s = String(v ?? "").trim();
  return s || null;
}
