"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { ActionState } from "@/types";

const onboardingSchema = z.object({
  business_name: z.string().trim().min(2, "Business name is required."),
  business_type: z.string().trim().min(1, "Business type is required."),
  city: z.string().trim().optional(),
  country: z.string().trim().optional(),
  timezone: z.string().trim().default("America/Panama"),
  language: z.string().trim().default("es"),
  human_fallback_number: z.string().trim().optional(),
});

export async function completeOnboarding(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = onboardingSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to finish onboarding." };
  }

  const { data: existingTenant } = await supabase
    .from("tenant_memberships")
    .select("tenant_id")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (existingTenant?.tenant_id) {
    redirect("/dashboard");
  }

  const values = parsed.data;

  const { data: tenant, error: tenantError } = await supabase
    .from("tenants")
    .insert({
      business_name: values.business_name,
      business_type: values.business_type,
      city: values.city || null,
      country: values.country || null,
      timezone: values.timezone,
      status: "draft",
      plan: "starter",
      owner_user_id: user.id,
    })
    .select("*")
    .single();

  if (tenantError || !tenant) {
    return { error: tenantError?.message ?? "Could not create tenant." };
  }

  const { error: membershipError } = await supabase.from("tenant_memberships").insert({
    tenant_id: tenant.id,
    user_id: user.id,
    role: "owner",
  });

  if (membershipError) {
    return { error: membershipError.message };
  }

  const { error: settingsError } = await supabase.from("tenant_settings").insert({
    tenant_id: tenant.id,
    languages: [values.language],
    human_fallback_number: values.human_fallback_number || null,
    tone: "friendly",
    hours: {},
    services: [],
  });

  if (settingsError) {
    return { error: settingsError.message };
  }

  redirect("/dashboard");
}
