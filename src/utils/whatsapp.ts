import { contact } from "../data/contact";
import {
  concernFromPath,
  getConcernLabel,
  intakeFlow,
} from "../data/intakeFlow";
import type { Language } from "../i18n/translations";
import type { IntakeLead, PatientConcern } from "../types/intake";

type WhatsAppLinkInput = {
  concern?: PatientConcern;
  language: Language;
  sourcePage?: string;
  leadData?: Partial<IntakeLead>;
  overrideMessage?: string;
};

const phoneDigits = contact.whatsappDisplay.replace(/\D/g, "");

export function createWhatsAppMessage({
  concern,
  language,
  sourcePage = "/",
  leadData,
  overrideMessage,
}: WhatsAppLinkInput) {
  const resolvedConcern =
    concern ?? leadData?.concern ?? concernFromPath(sourcePage);
  const baseMessage =
    overrideMessage ??
    intakeFlow[language].concerns[resolvedConcern].whatsappMessage;

  if (!leadData) {
    return baseMessage;
  }

  const yes = intakeFlow[language].options.yes;
  const no = intakeFlow[language].options.no;
  const notSure = intakeFlow[language].options.notSure;
  const concernLabel = getConcernLabel(resolvedConcern, language);

  const labels =
    language === "es"
      ? {
          name: "Nombre",
          phone: "WhatsApp",
          email: "Email",
          concern: "Motivo",
          firstVisit: "Primera consulta",
          studies: "Estudios disponibles",
          studyTypes: "Tipo de estudios",
          preferred: "Preferencia de horario",
          message: "Mensaje",
          urgent: "Nota",
        }
      : {
          name: "Name",
          phone: "WhatsApp",
          email: "Email",
          concern: "Reason",
          firstVisit: "First visit",
          studies: "Studies available",
          studyTypes: "Study types",
          preferred: "Preferred time",
          message: "Message",
          urgent: "Note",
        };

  const firstVisit =
    leadData.isFirstVisit === null || leadData.isFirstVisit === undefined
      ? notSure
      : leadData.isFirstVisit
        ? yes
        : no;
  const hasStudies =
    leadData.hasStudies === null || leadData.hasStudies === undefined
      ? notSure
      : leadData.hasStudies
        ? yes
        : no;

  const lines = [
    baseMessage,
    "",
    leadData.name && `${labels.name}: ${leadData.name}`,
    leadData.phone && `${labels.phone}: ${leadData.phone}`,
    leadData.email && `${labels.email}: ${leadData.email}`,
    `${labels.concern}: ${concernLabel}`,
    `${labels.firstVisit}: ${firstVisit}`,
    `${labels.studies}: ${hasStudies}`,
    leadData.studyTypes?.length
      ? `${labels.studyTypes}: ${leadData.studyTypes.join(", ")}`
      : "",
    leadData.preferredTime && `${labels.preferred}: ${leadData.preferredTime}`,
    leadData.message && `${labels.message}: ${leadData.message}`,
    leadData.urgentFlag
      ? `${labels.urgent}: ${language === "es" ? "Mencioné síntomas que pueden requerir atención urgente." : "I mentioned symptoms that may require urgent care."}`
      : "",
  ].filter(Boolean);

  return lines.join("\n");
}

export function createWhatsAppLink(input: WhatsAppLinkInput) {
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(
    createWhatsAppMessage(input),
  )}`;
}
