import { useLanguage } from "../../i18n/LanguageContext";
import { cn } from "../../lib/cn";
import { trackEvent } from "../../utils/analytics";

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      className="inline-flex h-10 items-center rounded-full border border-navy/10 bg-white/70 p-1 text-[12px] font-medium uppercase tracking-[0.1em] text-muted shadow-[0_10px_28px_rgba(13,43,69,0.045)] backdrop-blur"
      aria-label={t.header.languageLabel}
    >
      {(["es", "en"] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => {
            setLanguage(item);
            trackEvent("language_toggle", { language: item });
          }}
          className={cn(
            "h-8 min-w-10 rounded-full px-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
            language === item
              ? "bg-navy text-white shadow-[0_6px_18px_rgba(13,43,69,0.14)]"
              : "text-muted hover:text-navy",
          )}
          aria-pressed={language === item}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
