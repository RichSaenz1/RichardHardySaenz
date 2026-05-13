import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, MessageCircle } from "lucide-react";
import { imageAssets, optionalImages } from "../../data/images";
import { useLanguage } from "../../i18n/LanguageContext";
import { CTAButton } from "../shared/CTAButton";

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const { language, t } = useLanguage();
  const [doctorName, platformName] = t.home.hero.eyebrow.split("·").map((part) => part.trim());
  const doctorProof =
    language === "en"
      ? {
          eyebrow: "Specialist-led care",
          body: "Uro-oncology, endourology and minimally invasive urologic surgery.",
        }
      : {
          eyebrow: "Atención dirigida por especialista",
          body: "Uro-oncología, endourología y cirugía urológica mínimamente invasiva.",
        };
  const proofPoints =
    language === "en"
      ? [
          ["10+", "years of clinical and surgical experience"],
          ["HoLEP", "laser prostate and endourology training"],
          ["AUA · EAU", "international urology memberships"],
        ]
      : [
          ["10+", "años de experiencia clínica y quirúrgica"],
          ["HoLEP", "láser prostático y endourología"],
          ["AUA · EAU", "membresías urológicas internacionales"],
        ];

  function openAssistant() {
    window.dispatchEvent(new CustomEvent("uropanama:open-assistant"));
  }

  return (
    <section className="luxury-shell site-hero relative isolate min-h-[94vh] px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <motion.img
        src={imageAssets.premiumClinic.src}
        alt=""
        aria-hidden="true"
        decoding="async"
        className="absolute inset-y-0 right-0 -z-30 h-full w-full object-cover object-[62%_center] opacity-[0.54] saturate-[1.02] contrast-[1.05] lg:w-[84%] lg:opacity-[0.70]"
        animate={reduceMotion ? undefined : { scale: [1.02, 1.14, 1.02], x: [0, -54, 0], y: [0, 12, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <img
        src={imageAssets.heroUroPanama.src}
        alt=""
        aria-hidden="true"
        decoding="async"
        loading="lazy"
        className="pointer-events-none absolute bottom-2 right-[3%] -z-20 hidden h-[46rem] w-[46rem] object-contain opacity-[0.20] mix-blend-multiply lg:block"
      />
      <div className="absolute inset-0 -z-10 bg-[url('/images/medical-background-texture.webp')] bg-cover bg-center opacity-[0.055]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(245,247,249,0.96)_0%,rgba(255,255,255,0.92)_42%,rgba(224,238,247,0.24)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-mist via-mist/70 to-transparent" />

      <div className="relative mx-auto grid min-h-[calc(94vh-8rem)] max-w-[1360px] items-center gap-10 lg:grid-cols-[minmax(0,0.98fr)_minmax(340px,0.72fr)]">
        <motion.div
          initial={reduceMotion ? false : { y: 18 }}
          animate={reduceMotion ? undefined : { y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-[920px] lg:-mt-6"
        >
          <p className="site-hero-eyebrow flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-5">
            <span>{doctorName}</span>
            <span className="h-1 w-1 rounded-full bg-gold" aria-hidden="true" />
            <span>{platformName}</span>
          </p>
          <h1 className="site-hero-title mt-7 max-w-[820px] font-heading text-navy text-balance">
            {t.home.hero.title}
          </h1>
          <p className="mt-7 max-w-[46rem] text-[17px] leading-[1.75] text-slate-600 sm:mt-8 sm:text-xl">
            {t.home.hero.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <CTAButton
              to="/agendar-cita"
              icon={<CalendarDays aria-hidden="true" className="h-4 w-4" />}
              className="min-h-12 px-7 text-[15px] shadow-[0_16px_42px_rgba(13,43,69,0.14)]"
            >
              {t.cta.book}
            </CTAButton>
            <button
              type="button"
              onClick={openAssistant}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-borderblue bg-white/78 px-7 text-[15px] font-semibold text-navy shadow-[0_14px_36px_rgba(13,43,69,0.07)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-navy hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              {t.cta.assistant}
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 grid max-w-3xl gap-2 sm:grid-cols-3">
            {proofPoints.map(([value, label]) => (
              <div
                key={value}
                className="rounded-2xl border border-white/70 bg-white/72 px-4 py-3 shadow-[0_14px_34px_rgba(13,43,69,0.065)] backdrop-blur"
              >
                <p className="font-heading text-2xl leading-none text-navy">
                  {value}
                </p>
                <p className="mt-1.5 text-[11px] font-semibold uppercase leading-4 tracking-[0.11em] text-muted">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-[1.35rem] border border-white/70 bg-white/80 p-3 shadow-[0_18px_46px_rgba(13,43,69,0.09)] backdrop-blur lg:hidden">
            <img
              src={optionalImages.doctorPortrait.src}
              alt={optionalImages.doctorPortrait.alt}
              className="h-16 w-16 flex-none rounded-2xl object-cover object-[50%_18%]"
              loading="eager"
              decoding="async"
            />
            <div className="min-w-0">
              <p className="site-hero-eyebrow text-[11px]">
                {doctorProof.eyebrow}
              </p>
              <p className="mt-1 text-sm font-semibold leading-5 text-navy">
                Dr. Carlos A. Brugiati
              </p>
              <p className="mt-1 text-xs leading-5 text-muted">
                {doctorProof.body}
              </p>
            </div>
          </div>

          <div className="mt-10 max-w-5xl border-y border-borderblue/75 py-5 sm:mt-14">
            <div className="site-hero-eyebrow flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-center">
              {t.home.hero.trust.map((item, index) => (
                <span key={item} className="inline-flex items-center gap-5">
                  {index > 0 && (
                    <span className="hidden h-1 w-1 rounded-full bg-gold sm:block" />
                  )}
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
          <div className="relative ml-auto max-w-[420px]">
            <div className="absolute -inset-6 rounded-[2.4rem] bg-gradient-to-br from-cyan/20 via-white/70 to-gold/16 blur-2xl" />
            <div className="premium-card relative overflow-hidden rounded-[2rem] p-3">
              <div className="relative overflow-hidden rounded-[1.6rem] bg-softblue">
                <img
                  src={optionalImages.doctorPortrait.src}
                  alt={optionalImages.doctorPortrait.alt}
                  className="h-[560px] w-full object-cover object-[50%_18%]"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/92 via-navy/42 to-transparent p-6 text-white">
                  <p className="site-hero-eyebrow text-[11px] text-cyan">
                    {doctorProof.eyebrow}
                  </p>
                  <p className="mt-2 font-heading text-3xl leading-none">
                    Dr. Carlos A. Brugiati
                  </p>
                  <p className="mt-2 text-sm leading-6 text-blue-100">
                    {doctorProof.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
