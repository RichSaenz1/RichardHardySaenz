import Link from "next/link";
import { AlertTriangle, CheckCircle2, CircleDashed } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { FUTURE_MODULES } from "@/lib/constants";
import { requireTenantContext } from "@/lib/data/tenant";
import { formatLocation } from "@/lib/utils";

function statusLabel(value?: string | null) {
  return value ? value.replaceAll("_", " ") : "draft";
}

export default async function DashboardPage() {
  const { tenant, settings } = await requireTenantContext();
  const hasFallback = Boolean(settings?.human_fallback_number);
  const setupItems = [
    { label: "Business profile", complete: Boolean(tenant.business_name) },
    { label: "Tenant membership", complete: true },
    { label: "Language set", complete: Boolean(settings?.languages?.length) },
    { label: "Human fallback", complete: hasFallback },
  ];
  const completeCount = setupItems.filter((item) => item.complete).length;
  const setupProgress = Math.round((completeCount / setupItems.length) * 100);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Overview"
        title={tenant.business_name}
        description="Your Viva tenant foundation is ready. Live channels, automations, catalog, orders, payments, and booking sync are future modules."
        action={
          <Link
            href="/dashboard/settings"
            className="inline-flex rounded-lg bg-viva-green px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800"
          >
            Edit settings
          </Link>
        }
      />

      {!hasFallback ? (
        <section className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <h2 className="text-sm font-semibold">Human fallback number missing</h2>
            <p className="mt-1 text-sm leading-6">
              Future WhatsApp and voice flows require a human fallback path. Add
              one in settings before any live channel is activated.
            </p>
          </div>
        </section>
      ) : null}

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-viva-line bg-white p-5 shadow-sm">
          <div className="text-sm text-viva-muted">Plan</div>
          <div className="mt-2 text-2xl font-semibold capitalize text-viva-ink">
            {tenant.plan ?? "starter"}
          </div>
        </div>
        <div className="rounded-2xl border border-viva-line bg-white p-5 shadow-sm">
          <div className="text-sm text-viva-muted">Status</div>
          <div className="mt-2 text-2xl font-semibold capitalize text-viva-ink">
            {statusLabel(tenant.status)}
          </div>
        </div>
        <div className="rounded-2xl border border-viva-line bg-white p-5 shadow-sm">
          <div className="text-sm text-viva-muted">Location</div>
          <div className="mt-2 text-lg font-semibold text-viva-ink">
            {formatLocation(tenant.city, tenant.country)}
          </div>
        </div>
        <div className="rounded-2xl border border-viva-line bg-white p-5 shadow-sm">
          <div className="text-sm text-viva-muted">Setup progress</div>
          <div className="mt-2 text-2xl font-semibold text-viva-ink">
            {setupProgress}%
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-viva-line bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-viva-ink">Setup checklist</h2>
          <div className="mt-5 space-y-4">
            {setupItems.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                {item.complete ? (
                  <CheckCircle2 className="h-5 w-5 text-viva-green" />
                ) : (
                  <CircleDashed className="h-5 w-5 text-amber-600" />
                )}
                <span className="text-sm text-viva-ink">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-viva-line bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-viva-ink">Future modules</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {FUTURE_MODULES.map((module) => {
              const Icon = module.icon;
              return (
                <div
                  key={module.title}
                  className="rounded-xl border border-dashed border-viva-line bg-viva-surface p-4 opacity-80"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-viva-green">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-viva-ink">{module.title}</div>
                      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-viva-muted">
                        Not yet implemented
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-viva-muted">
                    {module.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
