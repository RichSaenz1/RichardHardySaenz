import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, MessageCircle } from "lucide-react";
import { optionalImages } from "../../data/images";
import { useLanguage } from "../../i18n/LanguageContext";
import { getWhatsAppHref } from "../../lib/whatsapp";
import { CTAButton } from "../shared/CTAButton";

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const { language, t } = useLanguage();
  const doctorProof =
    language === "en"
      ? {
          eyebrow: "Specialist-led care",
          body: "Uro-oncology, endourology and minimally invasive urologic surgery.",
        }
      : {
          eyebrow: "Atencion dirigida por especialista",
          body: "Uro-oncologia, endourologia y cirugia urologica minimamente invasiva.",
        };
  const proofPoints =
    language === "en"
      ? [
          ["10+", "years of clinical and surgical experience"],
          ["HoLEP", "laser prostate and endourology training"],
          ["AUA · EAU", "international urology memberships"],
        ]
      : [
          ["10+", "anos de experiencia clinica y quirurgica"],
          ["HoLEP", "laser prostatico y endourologia"],
          ["AUA · EAU", "membresias urologicas internacionales"],
        ];

  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden bg-white px-6 pb-16 pt-28 sm:px-10 lg:px-[60px] lg:pt-32 xl:px-20">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#F5F7F9_0%,#FFFFFF_52%,#E0EEF7_130%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.82),rgba(255,255,255,0.42)),linear-gradient(180deg,rgba(224,238,247,0.28),rgba(255,255,255,0.92))]" />

      <div className="relative mx-auto grid min-h-[calc(88vh-8rem)] max-w-[1280px] items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={reduceMotion ? false : { y: 18 }}
          animate={reduceMotion ? undefined : { y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-[680px]"
        >
          <p className="text-eyebrow font-medium uppercase text-medical">UROPANAMA</p>
          <h1 className="mt-7 max-w-[680px] font-heading text-display text-navy text-balance max-sm:text-[36px]">
            {t.home.hero.title}
          </h1>
          <p className="mt-7 max-w-[42rem] text-body-lg text-muted sm:mt-8">
            {t.home.hero.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <CTAButton
              to="/agendar-cita"
              icon={<CalendarDays aria-hidden="true" className="h-4 w-4" />}
              className="px-7"
            >
              {t.cta.book}
            </CTAButton>
            <CTAButton
              href={getWhatsAppHref("/", language)}
              variant="secondary"
              icon={<MessageCircle aria-hidden="true" className="h-4 w-4" />}
              className="px-7"
            >
              WhatsApp
            </CTAButton>
          </div>

          <div className="mt-5 grid max-w-3xl gap-2 sm:grid-cols-3">
            {proofPoints.map(([value, label]) => (
              <div
                key={value}
                className="rounded-card border border-white/70 bg-white/75 px-4 py-3 shadow-[0_14px_34px_rgba(13,43,69,0.065)] backdrop-blur"
              >
                <p className="font-heading text-2xl leading-none text-navy">{value}</p>
                <p className="mt-1.5 text-[11px] font-medium uppercase leading-4 tracking-[0.11em] text-muted">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-panel border border-white/70 bg-white/80 p-3 shadow-[0_18px_46px_rgba(13,43,69,0.09)] backdrop-blur lg:hidden">
            <img
              src={optionalImages.doctorPortrait.src}
              alt={optionalImages.doctorPortrait.alt}
              className="h-16 w-16 flex-none rounded-card object-cover object-[50%_18%]"
              loading="eager"
              decoding="async"
            />
            <div className="min-w-0">
              <p className="text-eyebrow font-medium uppercase text-medical">{doctorProof.eyebrow}</p>
              <p className="mt-1 text-sm font-medium leading-5 text-navy">Dr. Carlos A. Brugiati</p>
              <p className="mt-1 text-xs leading-5 text-muted">{doctorProof.body}</p>
            </div>
          </div>

          <div className="mt-10 max-w-5xl border-y border-borderblue/75 py-5 sm:mt-14">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-center text-eyebrow font-medium uppercase text-medical">
              {t.home.hero.trust.map((item, index) => (
                <span key={item} className="inline-flex items-center gap-5">
                  {index > 0 && <span className="hidden h-1 w-1 rounded-full bg-medical sm:block" />}
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.aside
          initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.12 }}
          className="relative hidden lg:block"
          aria-label={doctorProof.eyebrow}
        >
          <div className="relative ml-auto max-w-[440px]">
            <div className="relative overflow-hidden rounded-panel border border-borderblue bg-softblue shadow-[0_24px_72px_rgba(13,43,69,0.12)]">
              <img
                src={optionalImages.doctorPortrait.src}
                alt={optionalImages.doctorPortrait.alt}
                className="h-[560px] w-full object-cover object-[50%_18%]"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/92 via-navy/42 to-transparent p-6 text-white">
                <p className="text-eyebrow font-medium uppercase text-cyan">{doctorProof.eyebrow}</p>
                <p className="mt-2 font-heading text-3xl leading-none">Dr. Carlos A. Brugiati</p>
                <p className="mt-2 text-sm leading-6 text-blue-100">{doctorProof.body}</p>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
