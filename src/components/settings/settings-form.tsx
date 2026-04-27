"use client";

import { useActionState } from "react";
import { updateSettings } from "@/app/dashboard/settings/actions";
import { BUSINESS_TYPES, LANGUAGES, TIMEZONES, TONES } from "@/lib/constants";
import type { ActionState } from "@/types";
import type { Tenant, TenantSettings } from "@/types/database";

type SettingsFormProps = {
  tenant: Tenant;
  settings: TenantSettings | null;
  canEdit: boolean;
};

const initialState: ActionState = {};

export function SettingsForm({ tenant, settings, canEdit }: SettingsFormProps) {
  const [state, formAction, isPending] = useActionState(updateSettings, initialState);
  const language = settings?.languages?.[0] ?? "es";

  return (
    <form action={formAction} className="space-y-8">
      <fieldset disabled={!canEdit || isPending} className="space-y-8 disabled:opacity-70">
        <section className="rounded-2xl border border-viva-line bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-viva-ink">Business profile</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-viva-ink">Business name</span>
              <input
                name="business_name"
                required
                defaultValue={tenant.business_name}
                className="mt-2 w-full rounded-lg border-viva-line bg-white px-4 py-3 text-viva-ink shadow-sm focus:border-viva-green focus:ring-viva-green"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-viva-ink">Business type</span>
              <select
                name="business_type"
                required
                defaultValue={tenant.business_type}
                className="mt-2 w-full rounded-lg border-viva-line bg-white px-4 py-3 text-viva-ink shadow-sm focus:border-viva-green focus:ring-viva-green"
              >
                {BUSINESS_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-viva-ink">Timezone</span>
              <select
                name="timezone"
                defaultValue={tenant.timezone ?? "America/Panama"}
                className="mt-2 w-full rounded-lg border-viva-line bg-white px-4 py-3 text-viva-ink shadow-sm focus:border-viva-green focus:ring-viva-green"
              >
                {TIMEZONES.map((timezone) => (
                  <option key={timezone} value={timezone}>
                    {timezone}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-viva-ink">City</span>
              <input
                name="city"
                defaultValue={tenant.city ?? ""}
                className="mt-2 w-full rounded-lg border-viva-line bg-white px-4 py-3 text-viva-ink shadow-sm focus:border-viva-green focus:ring-viva-green"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-viva-ink">Country</span>
              <input
                name="country"
                defaultValue={tenant.country ?? ""}
                className="mt-2 w-full rounded-lg border-viva-line bg-white px-4 py-3 text-viva-ink shadow-sm focus:border-viva-green focus:ring-viva-green"
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-viva-line bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-viva-ink">Runtime settings</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-viva-ink">Language</span>
              <select
                name="language"
                defaultValue={language}
                className="mt-2 w-full rounded-lg border-viva-line bg-white px-4 py-3 text-viva-ink shadow-sm focus:border-viva-green focus:ring-viva-green"
              >
                {LANGUAGES.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-viva-ink">Tone</span>
              <select
                name="tone"
                defaultValue={settings?.tone ?? "friendly"}
                className="mt-2 w-full rounded-lg border-viva-line bg-white px-4 py-3 text-viva-ink shadow-sm focus:border-viva-green focus:ring-viva-green"
              >
                {TONES.map((tone) => (
                  <option key={tone.value} value={tone.value}>
                    {tone.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-viva-ink">
                Human fallback number
              </span>
              <input
                name="human_fallback_number"
                type="tel"
                defaultValue={settings?.human_fallback_number ?? ""}
                className="mt-2 w-full rounded-lg border-viva-line bg-white px-4 py-3 text-viva-ink shadow-sm focus:border-viva-green focus:ring-viva-green"
                placeholder="+507..."
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-viva-ink">Booking URL</span>
              <input
                name="booking_url"
                type="url"
                defaultValue={settings?.booking_url ?? ""}
                className="mt-2 w-full rounded-lg border-viva-line bg-white px-4 py-3 text-viva-ink shadow-sm focus:border-viva-green focus:ring-viva-green"
                placeholder="https://..."
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-viva-ink">Greeting</span>
              <textarea
                name="greeting"
                rows={4}
                defaultValue={settings?.greeting ?? ""}
                className="mt-2 w-full rounded-lg border-viva-line bg-white px-4 py-3 text-viva-ink shadow-sm focus:border-viva-green focus:ring-viva-green"
                placeholder="Gracias por contactar a nuestro negocio. Como puedo ayudarle?"
              />
            </label>
          </div>
        </section>
      </fieldset>

      {state.error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      ) : null}

      {state.success ? (
        <div className="rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-800">
          {state.success}
        </div>
      ) : null}

      <div className="flex items-center justify-end gap-3">
        {!canEdit ? (
          <span className="text-sm text-viva-muted">
            Staff members can view settings but cannot edit them.
          </span>
        ) : null}
        <button
          type="submit"
          disabled={!canEdit || isPending}
          className="rounded-lg bg-viva-green px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Saving..." : "Save settings"}
        </button>
      </div>
    </form>
  );
}
