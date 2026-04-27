"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { canManageTenant, requireTenantContext } from "@/lib/data/tenant";
import type { ActionState } from "@/types";

const settingsSchema = z.object({
  business_name: z.string().trim().min(2, "Business name is required."),
  business_type: z.string().trim().min(1, "Business type is required."),
  city: z.string().trim().optional(),
  country: z.string().trim().optional(),
  timezone: z.string().trim().default("America/Panama"),
  language: z.string().trim().default("es"),
  tone: z.string().trim().default("friendly"),
  greeting: z.string().trim().optional(),
  human_fallback_number: z.string().trim().optional(),
  booking_url: z.string().trim().optional(),
});

export async function updateSettings(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const tenantContext = await requireTenantContext();

  if (!canManageTenant(tenantContext.role)) {
    return { error: "Only owners and admins can update tenant settings." };
  }

  const parsed = settingsSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }

  const values = parsed.data;
  const supabase = await createClient();

  const { error: tenantError } = await supabase
    .from("tenants")
    .update({
      business_name: values.business_name,
      business_type: values.business_type,
      city: values.city || null,
      country: values.country || null,
      timezone: values.timezone,
    })
    .eq("id", tenantContext.tenant.id);

  if (tenantError) {
    return { error: tenantError.message };
  }

  const { error: settingsError } = await supabase
    .from("tenant_settings")
    .update({
      languages: [values.language],
      tone: values.tone,
      greeting: values.greeting || null,
      human_fallback_number: values.human_fallback_number || null,
      booking_url: values.booking_url || null,
    })
    .eq("tenant_id", tenantContext.tenant.id);

  if (settingsError) {
    return { error: settingsError.message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/settings");
  return { success: "Settings saved." };
}
