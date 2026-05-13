import { concernFromPath, getConcernLabel, intakeFlow } from "../data/intakeFlow";
import type { Language } from "../i18n/translations";
import type { IntakeLead, LeadSummary } from "../types/intake";
import { createWhatsAppMessage } from "./whatsapp";

export function generateLeadSummary(
  leadData: IntakeLead,
  language: Language,
): LeadSummary {
  const concern = leadData.concern ?? concernFromPath(leadData.sourcePage);
  const concernLabel = getConcernLabel(concern, language);
  const yes = intakeFlow[language].options.yes;
  const no = intakeFlow[language].options.no;
  const notSure = intakeFlow[language].options.notSure;
  const firstVisit =
    leadData.isFirstVisit === null
      ? notSure
      : leadData.isFirstVisit
        ? yes
        : no;
  const hasStudies =
    leadData.hasStudies === null
      ? notSure
      : leadData.hasStudies
        ? yes
        : no;

  const title =
    language === "es"
      ? `Solicitud de cita: ${concernLabel}`
      : `Appointment request: ${concernLabel}`;
  const summaryText =
    language === "es"
      ? `Paciente indica interés en ${concernLabel.toLocaleLowerCase()}. Primera consulta: ${firstVisit}. Estudios disponibles: ${hasStudies}. Preferencia: ${leadData.preferredTime || "por confirmar"}.`
      : `Patient is interested in ${concernLabel.toLocaleLowerCase()}. First visit: ${firstVisit}. Studies available: ${hasStudies}. Preference: ${leadData.preferredTime || "to be confirmed"}.`;

  return {
    title,
    patientName: leadData.name,
    phone: leadData.phone,
    concernLabel,
    summaryText,
    recommendedNextAction: leadData.urgentFlag
      ? intakeFlow[language].summary.urgentNextAction
      : intakeFlow[language].summary.nextAction,
    whatsappMessage: createWhatsAppMessage({
      language,
      sourcePage: leadData.sourcePage,
      leadData,
    }),
  };
}
