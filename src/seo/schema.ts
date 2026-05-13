import { contact } from "../data/contact";
import { siteConfig } from "../data/siteConfig";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.baseUrl}${normalizedPath}`;
}

export function absoluteImageUrl(path = siteConfig.defaultOgImage) {
  return absoluteUrl(path);
}

export function physicianSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Physician", "MedicalBusiness"],
    name: siteConfig.doctorName,
    alternateName: siteConfig.platformName,
    url: siteConfig.baseUrl,
    image: absoluteImageUrl(),
    description:
      "Atención urológica especializada en Panamá con enfoque en próstata, cálculos renales, uro-oncología, endourología y cirugía mínimamente invasiva.",
    medicalSpecialty: [
      "Urology",
      "Urologic Oncology",
      "Endourology",
      "Minimally Invasive Surgery",
    ],
    areaServed: {
      "@type": "City",
      name: "Ciudad de Panamá",
    },
    telephone: contact.phoneDisplay,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ciudad de Panamá",
      addressCountry: "PA",
    },
    sameAs: [contact.instagramUrl],
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Publication status",
        value:
          "Prototype schema. Credentials, address, hours, reviews, and affiliations must be verified before publishing.",
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.platformName,
    alternateName: siteConfig.doctorName,
    url: siteConfig.baseUrl,
    inLanguage: ["es", "en"],
    publisher: {
      "@type": "MedicalBusiness",
      name: siteConfig.doctorName,
    },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function pageSchema({
  breadcrumbs,
  faqs,
}: {
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FaqItem[];
} = {}) {
  return [
    physicianSchema(),
    websiteSchema(),
    ...(breadcrumbs ? [breadcrumbSchema(breadcrumbs)] : []),
    ...(faqs && faqs.length ? [faqSchema(faqs)] : []),
  ];
}
