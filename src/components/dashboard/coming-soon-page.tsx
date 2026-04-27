import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";

type ComingSoonPageProps = {
  title: string;
  description: string;
};

export function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Not yet implemented"
        title={title}
        description={description}
      />

      <section className="rounded-2xl border border-dashed border-viva-line bg-white p-8 text-center">
        <div className="mx-auto max-w-xl">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-viva-mint text-viva-green">
            <ArrowLeft className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold text-viva-ink">Coming soon</h2>
          <p className="mt-2 text-sm leading-6 text-viva-muted">
            This section is intentionally disabled in Step 1. The tenant
            foundation is ready, but provider workflows and business modules are
            added in later phases.
          </p>
          <Link
            href="/dashboard"
            className="mt-6 inline-flex rounded-lg border border-viva-line px-4 py-2 text-sm font-semibold text-viva-ink transition hover:bg-viva-surface"
          >
            Back to overview
          </Link>
        </div>
      </section>
    </div>
  );
}
