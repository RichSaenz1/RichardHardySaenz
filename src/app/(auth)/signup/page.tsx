import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";
import { getUser } from "@/lib/data/tenant";

export default async function SignupPage() {
  const user = await getUser();
  if (user) redirect("/dashboard");

  return (
    <AuthShell
      title="Create your Viva account"
      subtitle="Start with the SaaS foundation. Live WhatsApp, voice, payments, and bookings come later."
    >
      <AuthForm mode="signup" />
    </AuthShell>
  );
}
