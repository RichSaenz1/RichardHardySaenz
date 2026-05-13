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
            className="group relative rounded-[1.45rem] bg-gradient-to-br from-borderblue via-white to-borderblue p-px shadow-[0_20px_64px_rgba(6,27,51,0.07)] transition duration-300 hover:-translate-y-1 hover:from-medical/40 hover:via-navy/15 hover:to-cyan/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
          >
            <div className="flex h-full flex-col rounded-[1.42rem] bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(239,248,252,0.74))] p-7 backdrop-blur">
              <span className="grid h-14 w-14 place-items-center rounded-2xl border border-borderblue bg-white text-navy shadow-[0_14px_34px_rgba(11,102,195,0.08)] transition duration-300 group-hover:border-navy/70 group-hover:bg-navy group-hover:text-white group-hover:shadow-[0_18px_42px_rgba(13,43,69,0.16)]">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="mt-7 font-heading text-3xl leading-none text-navy">
                {item.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-7 text-muted">{item.text}</p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-medical transition group-hover:text-navy">
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
