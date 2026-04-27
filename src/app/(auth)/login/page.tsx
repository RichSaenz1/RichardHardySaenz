import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";
import { getUser } from "@/lib/data/tenant";

export default async function LoginPage() {
  const user = await getUser();
  if (user) redirect("/dashboard");

  return (
    <AuthShell
      title="Log in to Viva"
      subtitle="Manage tenants, setup progress, and business settings for Reserva Viva and Venta Viva."
    >
      <AuthForm mode="login" />
    </AuthShell>
  );
}
