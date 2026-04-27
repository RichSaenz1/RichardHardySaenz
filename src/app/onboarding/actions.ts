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

  const values = parsed.data;

  const { error } = await supabase.rpc("create_tenant_with_owner", {
    p_business_name: values.business_name,
    p_business_type: values.business_type,
    p_city: values.city || null,
    p_country: values.country || null,
    p_timezone: values.timezone,
    p_language: values.language,
    p_human_fallback_number: values.human_fallback_number || null,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}
