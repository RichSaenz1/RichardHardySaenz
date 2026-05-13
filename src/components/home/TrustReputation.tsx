import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Quote, ShieldCheck, Sparkles } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

const trustIcons = [BadgeCheck, ShieldCheck, Sparkles];

export function TrustReputation() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-medical">
          {t.home.authority.eyebrow}
        </p>
        <h2 className="mt-5 font-heading text-5xl leading-[0.95] text-navy text-balance lg:text-[4.25rem]">
          {t.home.authority.title}
        </h2>
        <p className="mt-7 text-lg leading-[1.75] text-muted">
          {t.home.authority.body}
        </p>
      </div>

      <div className="grid items-stretch gap-4 md:grid-cols-3 lg:grid-cols-1">
        {t.home.authority.stats.map(([value, label, note], index) => {
          const Icon = trustIcons[index] ?? BadgeCheck;

          return (
            <motion.article
              key={label}
              initial={reduceMotion ? false : { y: 14 }}
              whileInView={reduceMotion ? undefined : { y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="relative h-full min-h-[190px] overflow-hidden rounded-[1.35rem] border border-borderblue bg-white p-5 shadow-[0_22px_70px_rgba(6,27,51,0.075)] sm:p-6 lg:min-h-0"
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-medical via-cyan to-gold opacity-80" />
              <div className="flex h-full flex-col items-start gap-4 lg:flex-row">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl border border-borderblue bg-softblue text-navy">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-heading text-3xl leading-none text-navy lg:text-4xl">
                    {value}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-5 text-navy">
                    {label}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted">{note}</p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="lg:col-span-2">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-medical">
            {t.home.authority.reviewsTitle}
          </p>
          <div className="fine-divider h-px flex-1" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {t.home.authority.reviews.map(([title, body, note]) => (
            <article
              key={title}
              className="rounded-[1.25rem] border border-borderblue bg-white/80 p-6 shadow-[0_18px_54px_rgba(6,27,51,0.06)] backdrop-blur"
            >
              <Quote aria-hidden="true" className="h-5 w-5 text-gold" />
              <h3 className="mt-4 text-base font-semibold text-navy">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{body}</p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-medical">
                {note}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
