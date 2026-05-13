import type { Language } from "../i18n/translations";
import type { BreadcrumbItem } from "./schema";

const labels = {
  es: {
    home: "Inicio",
    about: "Dr. Brugiati",
    specialties: "Especialidades",
    procedures: "Procedimientos",
    booking: "Agendar cita",
    privacy: "Privacidad",
    terms: "Términos",
    notFound: "Página no encontrada",
  },
  en: {
    home: "Home",
    about: "Dr. Brugiati",
    specialties: "Specialties",
    procedures: "Procedures",
    booking: "Book visit",
    privacy: "Privacy",
    terms: "Terms",
    notFound: "Page not found",
  },
};

export function baseBreadcrumb(language: Language): BreadcrumbItem {
  return { label: labels[language].home, href: "/" };
}

export function specialtyBreadcrumbs(
  language: Language,
  current: string,
  href: string,
): BreadcrumbItem[] {
  return [
    baseBreadcrumb(language),
    { label: labels[language].specialties, href: "/especialidades" },
    { label: current, href },
  ];
}

export function procedureBreadcrumbs(
  language: Language,
  current: string,
  href: string,
): BreadcrumbItem[] {
  return [
    baseBreadcrumb(language),
    { label: labels[language].procedures, href: "/ureteroscopia" },
    { label: current, href },
  ];
}

export function simpleBreadcrumbs(
  language: Language,
  key: keyof typeof labels.es,
  href: string,
): BreadcrumbItem[] {
  return [baseBreadcrumb(language), { label: labels[language][key], href }];
}
