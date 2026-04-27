import { PageHeader } from "@/components/dashboard/page-header";
import { SettingsForm } from "@/components/settings/settings-form";
import { canManageTenant, requireTenantContext } from "@/lib/data/tenant";

export default async function SettingsPage() {
  const { tenant, settings, role } = await requireTenantContext();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Settings"
        title="Business and runtime settings"
        description="These tenant values will later be injected into WhatsApp, voice, booking, and sales automations. Step 1 only saves the settings."
      />

      <SettingsForm
        tenant={tenant}
        settings={settings}
        canEdit={canManageTenant(role)}
      />
    </div>
  );
}
