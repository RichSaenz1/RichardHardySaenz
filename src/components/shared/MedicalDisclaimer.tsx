import { AlertTriangle } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { cn } from "../../lib/cn";

type MedicalDisclaimerProps = {
  className?: string;
  compact?: boolean;
};

export function MedicalDisclaimer({
  className,
  compact = false,
}: MedicalDisclaimerProps) {
  const { t } = useLanguage();

  return (
    <div
      className={cn(
        "flex gap-3 rounded-2xl border border-borderblue bg-softblue/60 p-4 text-sm leading-6 text-muted",
        className,
      )}
      role="note"
    >
      <AlertTriangle
        aria-hidden="true"
        className="mt-0.5 h-5 w-5 flex-none text-medical"
      />
      <p>{compact ? t.safety.assistant : t.safety.global}</p>
    </div>
  );
}
