import { PRODUCT_MOTIONS } from "@/lib/constants";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <main className="grid min-h-screen grid-cols-1 bg-viva-surface lg:grid-cols-[1.1fr_0.9fr]">
      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <div className="mb-8 inline-flex rounded-full border border-teal-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-viva-green">
              Viva Platform
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-viva-ink">
              {title}
            </h1>
            <p className="mt-3 text-base leading-7 text-viva-muted">{subtitle}</p>
          </div>
          <div className="rounded-2xl border border-viva-line bg-white p-6 shadow-soft">
            {children}
          </div>
        </div>
      </section>

      <aside className="hidden border-l border-viva-line bg-white px-10 py-12 lg:block">
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="text-sm font-semibold text-viva-green">One platform</div>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-viva-ink">
              Two commercial motions, one tenant foundation.
            </h2>
            <div className="mt-10 space-y-4">
              {PRODUCT_MOTIONS.map((motion) => (
                <div
                  key={motion.name}
                  className="rounded-2xl border border-viva-line bg-viva-surface p-5"
                >
                  <h3 className="font-semibold text-viva-ink">{motion.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-viva-muted">
                    {motion.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p className="max-w-md text-sm leading-6 text-viva-muted">
            Step 1 is intentionally quiet: auth, tenants, onboarding, dashboard,
            settings, and RLS. Provider integrations stay modular for later upgrades.
          </p>
        </div>
      </aside>
    </main>
  );
}
