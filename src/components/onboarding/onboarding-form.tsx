"use client";

import { useActionState } from "react";
import { completeOnboarding } from "@/app/onboarding/actions";
import { BUSINESS_TYPES, LANGUAGES, TIMEZONES } from "@/lib/constants";
import type { ActionState } from "@/types";

const initialState: ActionState = {};

export function OnboardingForm() {
  const [state, formAction, isPending] = useActionState(
    completeOnboarding,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-viva-ink">Business name</span>
          <input
            name="business_name"
            required
            className="mt-2 w-full rounded-lg border-viva-line bg-white px-4 py-3 text-viva-ink shadow-sm focus:border-viva-green focus:ring-viva-green"
            placeholder="Viva Dental Studio"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-viva-ink">Business type</span>
          <select
            name="business_type"
            required
            className="mt-2 w-full rounded-lg border-viva-line bg-white px-4 py-3 text-viva-ink shadow-sm focus:border-viva-green focus:ring-viva-green"
            defaultValue=""
          >
            <option value="" disabled>
              Select a type
            </option>
            {BUSINESS_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-viva-ink">Language</span>
          <select
            name="language"
            className="mt-2 w-full rounded-lg border-viva-line bg-white px-4 py-3 text-viva-ink shadow-sm focus:border-viva-green focus:ring-viva-green"
            defaultValue="es"
          >
            {LANGUAGES.map((language) => (
              <option key={language.value} value={language.value}>
                {language.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-viva-ink">City</span>
          <input
            name="city"
            className="mt-2 w-full rounded-lg border-viva-line bg-white px-4 py-3 text-viva-ink shadow-sm focus:border-viva-green focus:ring-viva-green"
            placeholder="Panama City"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-viva-ink">Country</span>
          <input
            name="country"
            className="mt-2 w-full rounded-lg border-viva-line bg-white px-4 py-3 text-viva-ink shadow-sm focus:border-viva-green focus:ring-viva-green"
            placeholder="Panama"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-viva-ink">Timezone</span>
          <select
            name="timezone"
            className="mt-2 w-full rounded-lg border-viva-line bg-white px-4 py-3 text-viva-ink shadow-sm focus:border-viva-green focus:ring-viva-green"
            defaultValue="America/Panama"
          >
            {TIMEZONES.map((timezone) => (
              <option key={timezone} value={timezone}>
                {timezone}
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
            className="mt-2 w-full rounded-lg border-viva-line bg-white px-4 py-3 text-viva-ink shadow-sm focus:border-viva-green focus:ring-viva-green"
            placeholder="+507..."
          />
        </label>
      </div>

      {state.error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      ) : null}

      <div className="flex flex-col gap-3 border-t border-viva-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-viva-muted">
          This creates the tenant foundation only. Channels, AI, payments, and
          automations stay off until later phases.
        </p>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-viva-green px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Creating..." : "Create tenant"}
        </button>
      </div>
    </form>
  );
}
