import { BadgeCheck, Clock, Globe2 } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

export function ReviewStats() {
  const { t } = useLanguage();
  const icons = [BadgeCheck, Globe2, Clock];

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {t.bookingPage.reassurance.map(([title, detail], index) => {
        const Icon = icons[index] ?? BadgeCheck;
        return (
          <article
            key={title}
            className="flex items-center gap-5 rounded-[1.2rem] border border-borderblue bg-white/78 p-6 shadow-sm"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-softblue text-navy">
              <Icon aria-hidden="true" className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-semibold text-navy">{title}</h3>
              <p className="text-sm text-muted">{detail}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
