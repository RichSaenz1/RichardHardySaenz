import { intakeFlow } from "../data/intakeFlow";
import type { Language } from "../i18n/translations";

const urgentTerms: Record<Language, string[]> = {
  es: [
    "dolor agudo",
    "fiebre",
    "escalofríos",
    "escalofrios",
    "dolor intenso",
    "dolor fuerte",
    "cólico renal",
    "colico renal",
    "vómitos",
    "vomitos",
    "sangrado",
    "sangre abundante",
    "sangrado importante",
    "retención de orina",
    "retencion de orina",
    "no puedo orinar",
    "dificultad para orinar",
    "post-operatorio",
    "postoperatorio",
    "post operatorio",
    "urgencia no clasificada",
    "debilidad marcada",
    "emergencia",
    "urgencia",
  ],
  en: [
    "acute pain",
    "fever",
    "chills",
    "renal colic",
    "severe pain",
    "intense pain",
    "vomiting",
    "bleeding",
    "heavy bleeding",
    "significant bleeding",
    "urinary retention",
    "cannot urinate",
    "unable to urinate",
    "difficulty urinating",
    "post-operative",
    "postoperative",
    "unclassified urgent",
    "urgent situation",
    "emergency",
    "severe weakness",
  ],
};

export function detectUrgentTerms(value: string, language: Language) {
  const normalized = value.toLocaleLowerCase();
  return urgentTerms[language].some((term) =>
    normalized.includes(term.toLocaleLowerCase()),
  );
}

export function hasUrgentLanguage(values: string[], language: Language) {
  return values.some((value) => detectUrgentTerms(value, language));
}

export function getUrgentGuidance(language: Language) {
  return intakeFlow[language].urgentGuidance;
}
