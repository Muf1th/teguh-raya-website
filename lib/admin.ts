import { createHash } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "tr_admin";

/** Session token derived from the admin password — changes if the password changes. */
export function adminToken(): string {
  const pw = process.env.ADMIN_PASSWORD ?? "";
  return createHash("sha256").update(`teguh-raya-admin:${pw}`).digest("hex");
}

export function isAdmin(): boolean {
  if (!process.env.ADMIN_PASSWORD) return false;
  return cookies().get(COOKIE)?.value === adminToken();
}

/** Call at the top of every protected admin page. */
export function requireAdmin() {
  if (!isAdmin()) redirect("/admin/login");
}

export const ADMIN_COOKIE = COOKIE;
