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
        "mx-auto flex max-w-5xl items-center justify-center gap-3 rounded-pill bg-cyan/10 px-6 py-3 text-center text-caption text-muted",
        className,
      )}
      role="note"
    >
      <AlertTriangle
        aria-hidden="true"
        className="h-4 w-4 flex-none text-cyan"
      />
      <p>{compact ? t.safety.assistant : t.safety.global}</p>
    </div>
  );
}
