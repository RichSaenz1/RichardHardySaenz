import { redirect } from "next/navigation";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { getTenantContext, requireUser } from "@/lib/data/tenant";

export default async function OnboardingPage() {
  await requireUser();
  const tenantContext = await getTenantContext();

  if (tenantContext) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-viva-surface px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="mb-4 inline-flex rounded-full border border-teal-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-viva-green">
            Step 1 foundation
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-viva-ink">
            Create your first tenant
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-viva-muted">
            Add the business profile Viva will use later for Reserva Viva,
            Venta Viva, or the combined Viva Platform offer.
          </p>
        </div>

        <section className="rounded-2xl border border-viva-line bg-white p-6 shadow-soft">
          <OnboardingForm />
        </section>
      </div>
    </main>
  );
}
