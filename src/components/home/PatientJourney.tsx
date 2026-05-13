import { motion, useReducedMotion } from "framer-motion";
import {
  ClipboardCheck,
  FileSearch,
  MessageCircle,
  ScanSearch,
  Stethoscope,
} from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

const timelineIcons = [
  MessageCircle,
  ClipboardCheck,
  Stethoscope,
  FileSearch,
  ScanSearch,
];

export function PatientJourney() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative">
      <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-cyan via-borderblue to-gold lg:left-0 lg:right-0 lg:top-12 lg:mx-auto lg:h-px lg:w-[calc(100%-9rem)] lg:bg-gradient-to-r" />

      <div className="grid gap-6 lg:grid-cols-5 lg:gap-5">
        {t.home.journey.steps.map(([title, text], index) => {
          const Icon = timelineIcons[index] ?? ClipboardCheck;

          return (
            <motion.article
              key={title}
              initial={reduceMotion ? false : { y: 18 }}
              whileInView={reduceMotion ? undefined : { y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              className="relative pl-16 lg:pl-0 lg:pt-24"
            >
              <div className="absolute left-0 top-0 z-10 grid h-12 w-12 place-items-center rounded-full border border-borderblue bg-white text-sm font-bold text-navy shadow-[0_16px_44px_rgba(6,27,51,0.09)] lg:left-1/2 lg:top-6 lg:-translate-x-1/2">
                <span className="font-heading text-xl leading-none text-medical">
                  {index + 1}
                </span>
              </div>
              <div className="group relative h-full overflow-hidden rounded-[1.35rem] border border-borderblue bg-gradient-to-br from-white via-white to-softblue/45 p-5 shadow-[0_18px_54px_rgba(6,27,51,0.06)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-gold/70 hover:shadow-[0_24px_70px_rgba(6,27,51,0.10)]">
                <div className="grid h-11 w-11 place-items-center rounded-2xl border border-borderblue bg-white text-medical shadow-[0_10px_30px_rgba(6,27,51,0.06)] transition group-hover:border-gold/70 group-hover:text-navy">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold leading-tight text-navy">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
