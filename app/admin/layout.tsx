import type { Metadata } from "next";
import Link from "next/link";
import { isAdmin } from "@/lib/admin";
import { logout } from "./actions";

// The admin area is private — never indexed by search engines.
export const metadata: Metadata = {
  title: "Workshop Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = isAdmin();
  return (
    <div className="min-h-svh pt-24 sm:pt-28">
      <div className="wrap pb-20">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-steel pb-5">
          <p className="font-brand text-lg font-bold uppercase tracking-wide">
            Teguh <span className="text-accent">Raya</span>{" "}
            <span className="text-sm font-semibold text-fog">· Admin</span>
          </p>
          {authed && (
            <nav className="flex flex-wrap items-center gap-4 text-sm font-medium" aria-label="Admin">
              <Link href="/admin" className="text-fog hover:text-paper">Reminders</Link>
              <Link href="/admin/customers" className="text-fog hover:text-paper">Customers</Link>
              <form action={logout}>
                <button className="text-fog underline underline-offset-4 hover:text-paper">Log out</button>
              </form>
            </nav>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
