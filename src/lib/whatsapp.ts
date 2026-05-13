import type { Language } from "../i18n/translations";
import { createWhatsAppLink } from "../utils/whatsapp";

export function getWhatsAppHref(pathname: string, language: Language, override?: string) {
  return createWhatsAppLink({
    language,
    sourcePage: pathname,
    overrideMessage: override,
  });
}
