"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { DASHBOARD_NAV } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type SidebarProps = {
  tenantName: string;
  userEmail?: string | null;
  role: string;
};

export function Sidebar({ tenantName, userEmail, role }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [open, setOpen] = useState(false);

  async function logout() {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/login");
  }

  const nav = (
    <nav className="space-y-1">
      {DASHBOARD_NAV.map((item) => {
        const isActive = item.activeExact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
              isActive
                ? "bg-viva-mint text-viva-green"
                : "text-viva-muted hover:bg-viva-surface hover:text-viva-ink",
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const content = (
    <div className="flex h-full flex-col">
      <div className="border-b border-viva-line px-5 py-5">
        <Link href="/dashboard" className="block">
          <div className="text-lg font-semibold tracking-tight text-viva-ink">Viva</div>
          <div className="mt-1 truncate text-sm text-viva-muted">{tenantName}</div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">{nav}</div>

      <div className="border-t border-viva-line p-4">
        <div className="rounded-xl bg-viva-surface p-3">
          <div className="truncate text-sm font-medium text-viva-ink">
            {userEmail ?? "Signed in"}
          </div>
          <div className="mt-1 text-xs capitalize text-viva-muted">{role}</div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-viva-line bg-white px-3 py-2.5 text-sm font-semibold text-viva-ink transition hover:bg-viva-surface"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-viva-line bg-white px-4 py-3 lg:hidden">
        <div>
          <div className="text-base font-semibold text-viva-ink">Viva</div>
          <div className="max-w-[220px] truncate text-xs text-viva-muted">{tenantName}</div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-lg border border-viva-line p-2 text-viva-ink"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      <aside className="hidden min-h-screen w-72 shrink-0 border-r border-viva-line bg-white lg:block">
        {content}
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-viva-ink/30"
            onClick={() => setOpen(false)}
          />
          <aside className="relative h-full w-80 max-w-[88vw] bg-white shadow-soft">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 rounded-lg border border-viva-line p-2"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
            {content}
          </aside>
        </div>
      ) : null}
    </>
  );
}
