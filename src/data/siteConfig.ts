import { contact } from "./contact";

export const siteConfig = {
  doctorName: "Dr. Carlos A. Brugiati",
  platformName: "UroPanama",
  baseUrl: `https://${contact.domain}`,
  defaultOgImage: "/images/hero-uro-panama.png",
  positioning:
    "Urología avanzada y cirugía mínimamente invasiva en Panamá",
  shortPositioning:
    "Urología, uro-oncología, endourología y mínima invasión.",
  disclaimer:
    "La información de este sitio tiene fines educativos y de orientación general. No sustituye una evaluación médica. En caso de emergencia, acuda a un servicio médico de urgencia.",
  assistantDisclaimer:
    "El asistente digital no realiza diagnósticos. Su función es orientación inicial y coordinación de citas.",
  publicTrustSignals: [
    "Perfil público con alta valoración de pacientes.",
    "153 opiniones de pacientes",
    "Especialista en urología",
    "Atención en Ciudad de Panamá",
  ],
  trustStrip: [
    "Uro-oncología",
    "Endourología",
    "Cirugía percutánea",
    "Laparoscopía",
    "Mínima invasión",
  ],
  verifiedNote: "Datos a verificar antes de la publicación final.",
};

// TODO: Finalize SEO schema, verified licensing, clinic address, business hours,
// Google Business review integration, HuliHealth review integration, blog/articles,
// English translations, medical referral page, and reputation automation.
export const physicianJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Physician", "MedicalBusiness"],
  name: siteConfig.doctorName,
  alternateName: siteConfig.platformName,
  description:
    "Atención urológica especializada en Panamá con enfoque en próstata, cálculos renales, uro-oncología, endourología y cirugía mínimamente invasiva.",
  url: siteConfig.baseUrl,
  medicalSpecialty: [
    "Urology",
    "Urologic Oncology",
    "Endourology",
    "Minimally Invasive Surgery",
  ],
  telephone: contact.phoneDisplay,
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ciudad de Panamá",
    addressCountry: "PA",
  },
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Publication status",
      value: "Prototype schema. Final data must be verified before publishing.",
    },
  ],
};
