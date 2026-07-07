import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { login } from "../actions";

export const dynamic = "force-dynamic";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  if (isAdmin()) redirect("/admin");

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="h-display text-2xl">Workshop login</h1>
      <p className="mt-2 text-sm text-fog">
        This area is for workshop staff only.
      </p>
      <form action={login} className="card mt-6 space-y-4 p-6">
        <div>
          <label htmlFor="password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-fog">
            Admin password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            className="w-full rounded-xl border border-steel bg-ink px-4 py-3 text-sm focus:border-accent focus:outline-none"
          />
          {searchParams.error && (
            <p role="alert" className="mt-2 text-xs text-accent">
              Wrong password — try again.
            </p>
          )}
        </div>
        <button className="btn-primary w-full">Log in</button>
      </form>
    </div>
  );
}
