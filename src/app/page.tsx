import { redirect } from "next/navigation";
import { getTenantContext, getUser } from "@/lib/data/tenant";

export default async function HomePage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const tenantContext = await getTenantContext();
  redirect(tenantContext ? "/dashboard" : "/onboarding");
}
