import { ArrowRight, CircleDot, FileSearch, HeartPulse, ShieldCheck, UserRound, Waves } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";

const icons = [UserRound, CircleDot, ShieldCheck, Waves, HeartPulse, FileSearch];

export function ConcernSelector() {
  const { t } = useLanguage();

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {t.home.concerns.items.map((item, index) => {
        const Icon = icons[index] ?? ShieldCheck;

        return (
          <Link
            key={item.title}
            to={item.href}
            className="group relative rounded-card border border-borderblue bg-white p-6 transition duration-200 hover:-translate-y-0.5 hover:border-cyan hover:shadow-[0_4px_16px_rgba(13,43,69,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
          >
            <div className="flex h-full flex-col">
              <span className="grid h-14 w-14 place-items-center rounded-2xl border border-borderblue bg-white text-navy shadow-[0_14px_34px_rgba(27,107,154,0.08)] transition duration-300 group-hover:border-gold/70 group-hover:bg-navy group-hover:text-white group-hover:shadow-[0_18px_42px_rgba(201,168,76,0.22)]">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="mt-7 font-heading text-3xl leading-none text-navy">
                {item.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-7 text-muted">{item.text}</p>
              <span className="mt-7 inline-flex items-center gap-2 text-button text-medical transition group-hover:text-medical">
                {t.cta.view}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
