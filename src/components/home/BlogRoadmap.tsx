import { BookOpenText, CalendarDays } from "lucide-react";
import { CTAButton } from "../shared/CTAButton";
import { useLanguage } from "../../i18n/LanguageContext";

const copy = {
  es: {
    eyebrow: "Educación médica",
    title: "Temas que el paciente suele necesitar antes de decidir.",
    body:
      "La biblioteca educativa puede iniciar con los temas SEO definidos en el onboarding, conectando síntomas comunes con procedimientos avanzados sin reemplazar la consulta.",
    cta: "Solicitar orientación",
    status: "Tema editorial",
    topics: [
      [
        "Uro-oncología",
        "Cáncer urogenital, sospechas, estudios alterados y segunda opinión.",
      ],
      [
        "Terapia focal",
        "Opciones de conversación para cáncer de próstata en casos seleccionados.",
      ],
      [
        "Cirugía robótica",
        "Cuándo se conversa un abordaje robótico o laparoscópico.",
      ],
      [
        "Enucleación de próstata",
        "HPB, crecimiento prostático benigno, HoLEP y síntomas urinarios.",
      ],
      [
        "Endourología",
        "Litiasis renal, ureteroscopia, láser, litotricia y prevención.",
      ],
    ],
  },
  en: {
    eyebrow: "Medical education",
    title: "Topics patients often need before deciding.",
    body:
      "The education library can start with the SEO topics defined during onboarding, connecting common symptoms with advanced procedures without replacing consultation.",
    cta: "Request guidance",
    status: "Editorial topic",
    topics: [
      [
        "Uro-oncology",
        "Urogenital cancer, suspected findings, abnormal studies, and second opinion.",
      ],
      [
        "Focal therapy",
        "Conversation pathways for selected prostate cancer cases.",
      ],
      [
        "Robotic surgery",
        "When a robotic or laparoscopic approach may be discussed.",
      ],
      [
        "Prostate enucleation",
        "BPH, benign prostate enlargement, HoLEP, and urinary symptoms.",
      ],
      [
        "Endourology",
        "Kidney stones, ureteroscopy, laser, lithotripsy, and prevention.",
      ],
    ],
  },
} as const;

export function BlogRoadmap() {
  const { language } = useLanguage();
  const t = copy[language] ?? copy.es;

  return (
    <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-medical">
          {t.eyebrow}
        </p>
        <h2 className="mt-4 max-w-3xl font-heading text-display leading-[0.96] text-navy text-balance sm:text-display">
          {t.title}
        </h2>
        <p className="mt-6 max-w-xl text-base leading-8 text-muted">{t.body}</p>
        <CTAButton
          to="/agendar-cita"
          className="mt-8"
          icon={<CalendarDays aria-hidden="true" className="h-4 w-4" />}
        >
          {t.cta}
        </CTAButton>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {t.topics.map(([title, body], index) => (
          <article
            key={title}
            className="group rounded-[1.35rem] border border-borderblue bg-white p-6 shadow-[0_18px_54px_rgba(13,43,69,0.055)] transition hover:-translate-y-1 hover:border-gold/70"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-2xl border border-borderblue bg-softblue text-medical">
                <BookOpenText aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="text-xs font-medium text-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.14em] text-medical">
              {t.status}
            </p>
            <h3 className="mt-3 font-heading text-3xl leading-none text-navy">
              {title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-muted">{body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
