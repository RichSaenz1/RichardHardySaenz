import { Sidebar } from "@/components/dashboard/sidebar";
import { requireTenantContext } from "@/lib/data/tenant";
import { getUser } from "@/lib/data/tenant";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tenantContext, user] = await Promise.all([
    requireTenantContext(),
    getUser(),
  ]);

  return (
    <div className="min-h-screen bg-viva-surface lg:flex">
      <Sidebar
        tenantName={tenantContext.tenant.business_name}
        userEmail={user?.email}
        role={tenantContext.role}
      />
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
