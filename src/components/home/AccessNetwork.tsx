import type { ReactNode } from "react";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  ClipboardCheck,
  Globe2,
  ShieldCheck,
} from "lucide-react";
import { CTAButton } from "../shared/CTAButton";
import { useLanguage } from "../../i18n/LanguageContext";

type HospitalPartner = {
  name: string;
  location: string;
  image: string;
  href: string;
};

type InsurancePartner = {
  name: string;
  domain?: string;
  logoSrc?: string;
  category: "national" | "international";
};

const hospitals: HospitalPartner[] = [
  {
    name: "Hospiten Paitilla",
    location: "Paitilla, Ciudad de Panamá",
    image:
      "https://143557140.fs1.hubspotusercontent-eu1.net/hubfs/143557140/IMK07770-Mejorado-NR.jpg",
    href: "https://hospitenpaitilla.com/nuestro-centro",
  },
  {
    name: "Pacífica Salud Costa del Este",
    location: "Costa del Este, Ciudad de Panamá",
    image:
      "https://www.pacificasalud.com/wp-content/uploads/2023/04/Pacifica-Salud-Sede-Costa-del-Este.jpg",
    href: "https://www.pacificasalud.com/en/",
  },
  {
    name: "The Panama Clinic",
    location: "Pacific Center, Ciudad de Panamá",
    image:
      "https://thepanamaclinic.com/wp-content/uploads/2023/02/Hospital-The-Panama-Clinic.jpg",
    href: "https://thepanamaclinic.com/nosotros/",
  },
  {
    name: "Hospital San Fernando",
    location: "Vía España, Ciudad de Panamá",
    image:
      "https://www.saludpanama.com/images/easyblog_articles/868/b2ap3_large_clinica_hospital_san_fernando.jpg",
    href: "https://www.hospitalsanfernando.com/en/about-us/",
  },
];

const insurancePartners: InsurancePartner[] = [
  { name: "SURA", domain: "segurossura.com.pa", category: "national" },
  {
    name: "MAPFRE",
    domain: "mapfre.com.pa",
    logoSrc: "https://www.mapfre.com.pa/media/logo-mapfre.png",
    category: "national",
  },
  { name: "Blue Cross Blue Shield", domain: "bcbs.com", category: "national" },
  {
    name: "Acerta",
    domain: "acertaseguros.com",
    logoSrc: "https://acertaseguros.com/wp-content/uploads/2024/07/acerta-logo-nuevo.png",
    category: "national",
  },
  {
    name: "Ancon",
    domain: "asegurancon.com",
    category: "national",
  },
  { name: "ASSA", domain: "assanet.com", category: "national" },
  {
    name: "AXA",
    domain: "axa.com",
    logoSrc: "https://www.axa.com/images/logo.png?version=4.21.2",
    category: "national",
  },
  {
    name: "Bupa",
    domain: "bupaglobal.com",
    logoSrc:
      "https://www.bupaglobal.com/-/media/Icons/Bupa-logo-2022.png?h=945&iar=0&w=945&hash=65FADCE73E46357E3B45963271F4A33C",
    category: "national",
  },
  { name: "WorldWide", domain: "wwmedicalassurance.com", category: "national" },
  { name: "Unir Vivir", category: "national" },
  { name: "Sagicor", domain: "sagicor.com", category: "national" },
  { name: "Pan American Life", domain: "palig.com", category: "national" },
  {
    name: "La Regional de Seguros",
    domain: "laregionaldeseguros.com",
    logoSrc:
      "https://www.laregionaldeseguros.com/lrds/wp-content/uploads/2017/06/logo.png",
    category: "national",
  },
  {
    name: "Mercantil de Seguros",
    category: "national",
  },
  { name: "Aetna", domain: "aetna.com", category: "international" },
  {
    name: "Afspa",
    domain: "afspa.org",
    logoSrc: "https://www.afspa.org/wp-content/uploads/2021/08/Logo_AFSPA.png",
    category: "international",
  },
  {
    name: "AEG",
    logoSrc: "https://country.aeg.com/static/media/logo2.svg",
    category: "international",
  },
  { name: "Allianz", domain: "allianz.com", category: "international" },
  { name: "Assist Card", domain: "assistcard.com", category: "international" },
  { name: "Cigna", domain: "cigna.com", category: "international" },
  {
    name: "Argos Assistance",
    domain: "argosassistance.com",
    logoSrc: "https://www.argosassistance.com/wp-content/uploads/2025/05/Argos_logo_340x156.png",
    category: "international",
  },
  {
    name: "Bupa",
    domain: "bupaglobal.com",
    logoSrc:
      "https://www.bupaglobal.com/-/media/Icons/Bupa-logo-2022.png?h=945&iar=0&w=945&hash=65FADCE73E46357E3B45963271F4A33C",
    category: "international",
  },
  {
    name: "Euro-Center",
    domain: "euro-center.com",
    logoSrc: "https://www.euro-center.com/wp-content/themes/eurocenter/assets/logo.7bc95fb9.svg",
    category: "international",
  },
  {
    name: "Redbridge",
    logoSrc: "https://api.naascorp.cc/uploads/img_328x64px_providers_logo_redbridge_d71f570f47.svg",
    category: "international",
  },
  { name: "Sagicor Life", domain: "sagicor.com", category: "international" },
  {
    name: "Vumi",
    domain: "vumigroup.com",
    logoSrc: "https://www.vumigroup.com/wp-content/uploads/2019/11/logo-myVumi.png",
    category: "international",
  },
  {
    name: "Geo Blue",
    domain: "geo-blue.com",
    logoSrc: "https://c8s387h5.media.zestyio.com/logo-geo-blue-main.svg",
    category: "international",
  },
  { name: "Optima", category: "international" },
  {
    name: "Europ Assistance",
    domain: "europ-assistance.com",
    logoSrc: "https://www.europ-assistance.com/wp-content/uploads/2025/07/logo-ea.svg",
    category: "international",
  },
  { name: "GMC", category: "international" },
  { name: "United Health Care", domain: "uhc.com", category: "international" },
  {
    name: "Trawick",
    domain: "trawickinternational.com",
    category: "international",
  },
  {
    name: "IMC Insurance Brokers",
    category: "international",
  },
  {
    name: "Global Excel",
    domain: "globalexcel.com",
    logoSrc: "https://globalexcel.com/wp-content/uploads/gemLogoColor.svg",
    category: "international",
  },
  {
    name: "Continental Assist",
    domain: "continentalassist.com",
    logoSrc: "https://eva.continentalassist.com/assets/images/logoconti.png",
    category: "international",
  },
  { name: "Claria", category: "international" },
  { name: "DKV", domain: "dkv.com", category: "international" },
  {
    name: "Best Doctor Insurance",
    domain: "bestdoctorsinsurance.com",
    category: "international",
  },
  {
    name: "April International",
    domain: "april-international.com",
    category: "international",
  },
];

const copy = {
  es: {
    eyebrow: "Acceso y coordinación",
    title: "Seguros y hospitales para una atención mejor coordinada.",
    body:
      "El equipo puede orientar la coordinación de citas, procedimientos y validación de cobertura según la aseguradora y la sede correspondiente.",
    hospitalsTitle: "Hospitales donde opera o atiende",
    hospitalsNote:
      "La sede se confirma de acuerdo con el tipo de consulta, procedimiento y disponibilidad.",
    insuranceTitle: "Seguros aceptados",
    insurancePrompt:
      "Seleccione una categoría para ver las aseguradoras aceptadas. El equipo confirma cobertura y requisitos antes de la cita.",
    national: "Nacionales",
    international: "Internacionales",
    viewList: "Ver lista",
    hideList: "Ocultar lista",
    insurersLabel: "aseguradoras",
    confirmation:
      "La cobertura, preautorización y requisitos pueden variar por póliza. El equipo confirma los detalles antes de la cita.",
    cta: "Confirmar cobertura",
    secondaryCta: "Agendar consulta",
    proof: [
      ["4", "hospitales de referencia"],
      ["39+", "aseguradoras listadas"],
      ["Manual", "confirmación por el equipo"],
    ],
  },
  en: {
    eyebrow: "Access and coordination",
    title: "Insurance and hospitals for better coordinated care.",
    body:
      "The team can help coordinate visits, procedures, and coverage validation according to the insurer and care location.",
    hospitalsTitle: "Hospitals where he operates or provides care",
    hospitalsNote:
      "The location is confirmed according to visit type, procedure, and availability.",
    insuranceTitle: "Accepted insurance",
    insurancePrompt:
      "Select a category to view accepted insurers. The team confirms coverage and requirements before the visit.",
    national: "National",
    international: "International",
    viewList: "View list",
    hideList: "Hide list",
    insurersLabel: "insurers",
    confirmation:
      "Coverage, preauthorization, and requirements may vary by policy. The team confirms details before the visit.",
    cta: "Confirm coverage",
    secondaryCta: "Book visit",
    proof: [
      ["4", "reference hospitals"],
      ["39+", "listed insurers"],
      ["Manual", "team confirmation"],
    ],
  },
} as const;

export function AccessNetwork() {
  const { language } = useLanguage();
  const t = copy[language] ?? copy.es;
  const nationalInsurance = insurancePartners.filter(
    (item) => item.category === "national",
  );
  const internationalInsurance = insurancePartners.filter(
    (item) => item.category === "international",
  );

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-medical">
          {t.eyebrow}
        </p>
        <h2 className="mx-auto mt-4 max-w-4xl font-heading text-display leading-[0.95] text-navy text-balance sm:text-display">
          {t.title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-[1.75] text-muted">
          {t.body}
        </p>

        <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
          {t.proof.map(([value, label]) => (
            <div
              key={label}
              className="rounded-2xl border border-borderblue bg-white/82 p-4 shadow-[0_14px_42px_rgba(13,43,69,0.055)]"
            >
              <p className="font-heading text-3xl leading-none text-navy">
                {value}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-muted">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-8">
        <article className="overflow-hidden rounded-[1.35rem] border border-borderblue bg-white shadow-[0_22px_70px_rgba(13,43,69,0.075)]">
          <SectionHeader
            icon={<Building2 aria-hidden="true" className="h-5 w-5" />}
            title={t.hospitalsTitle}
            note={t.hospitalsNote}
          />
          <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-2 xl:grid-cols-4">
            {hospitals.map((hospital) => (
              <a
                key={hospital.name}
                href={hospital.href}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-2xl border border-borderblue bg-white text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_52px_rgba(13,43,69,0.12)]"
              >
                <div className="aspect-[4/3] overflow-hidden bg-softblue">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-medium text-navy">
                        {hospital.name}
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-muted">
                        {hospital.location}
                      </p>
                    </div>
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 flex-none text-medical transition group-hover:translate-x-0.5"
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </article>

        <article className="overflow-hidden rounded-[1.35rem] border border-borderblue bg-white shadow-[0_22px_70px_rgba(13,43,69,0.075)]">
          <SectionHeader
            icon={<ShieldCheck aria-hidden="true" className="h-5 w-5" />}
            title={t.insuranceTitle}
            note={t.confirmation}
          />

          <div className="space-y-5 p-4 sm:p-6">
            <p className="mx-auto max-w-2xl text-center text-sm leading-6 text-muted">
              {t.insurancePrompt}
            </p>

            <div className="grid gap-4">
              <InsuranceGroup
                icon={
                  <ClipboardCheck aria-hidden="true" className="h-4 w-4" />
                }
                title={t.national}
                items={nationalInsurance}
                viewLabel={t.viewList}
                hideLabel={t.hideList}
                countLabel={t.insurersLabel}
              />
              <InsuranceGroup
                icon={<Globe2 aria-hidden="true" className="h-4 w-4" />}
                title={t.international}
                items={internationalInsurance}
                viewLabel={t.viewList}
                hideLabel={t.hideList}
                countLabel={t.insurersLabel}
              />
            </div>
          </div>
        </article>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton to="/agendar-cita">{t.cta}</CTAButton>
          <CTAButton to="/agendar-cita" variant="secondary">
            {t.secondaryCta}
          </CTAButton>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  note,
}: {
  icon: ReactNode;
  title: string;
  note: string;
}) {
  return (
    <div className="border-b border-borderblue bg-softblue/55 px-5 py-5 sm:px-6">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
        <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl border border-borderblue bg-white text-navy">
          {icon}
        </span>
        <div>
          <h3 className="text-lg font-medium text-navy">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-muted">{note}</p>
        </div>
      </div>
    </div>
  );
}

function InsuranceLogo({
  partner,
  compact = false,
}: {
  partner: InsurancePartner;
  compact?: boolean;
}) {
  const src = partner.logoSrc
    ? partner.logoSrc
    : partner.domain
    ? `https://www.google.com/s2/favicons?domain=${partner.domain}&sz=128`
    : undefined;
  const initials = getPartnerInitials(partner.name);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border border-borderblue bg-white text-center shadow-[0_10px_30px_rgba(13,43,69,0.045)] ${
        compact ? "min-h-24 px-3 py-4" : "min-h-24 px-3 py-4"
      }`}
    >
      <div
        className={`relative flex items-center justify-center overflow-hidden rounded-xl border border-borderblue bg-white ${
          compact ? "h-12 w-full max-w-[8.5rem]" : "h-12 w-full max-w-[9.5rem]"
        }`}
      >
        <span className="absolute inset-0 grid place-items-center text-xs font-medium text-medical">
          {initials}
        </span>
        {src ? (
          <img
            src={src}
            alt={`${partner.name} logo`}
            loading="lazy"
            decoding="async"
            className={`relative z-10 object-contain ${
              partner.logoSrc ? "max-h-9 max-w-[8rem]" : "h-7 w-7"
            }`}
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : null}
      </div>
      <p className="text-xs font-medium leading-4 text-navy">
        {partner.name}
      </p>
    </div>
  );
}

function InsuranceGroup({
  icon,
  title,
  items,
  viewLabel,
  hideLabel,
  countLabel,
}: {
  icon: ReactNode;
  title: string;
  items: InsurancePartner[];
  viewLabel: string;
  hideLabel: string;
  countLabel: string;
}) {
  return (
    <details className="group rounded-2xl border border-borderblue bg-softblue/35">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-white/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan sm:px-5 [&::-webkit-details-marker]:hidden">
        <span className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 flex-none place-items-center rounded-2xl border border-borderblue bg-white text-medical">
            {icon}
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-medium uppercase tracking-[0.14em] text-medical">
              {title}
            </span>
            <span className="mt-1 block text-xs font-medium text-muted">
              {items.length} {countLabel}
            </span>
          </span>
        </span>
        <span className="flex flex-none items-center gap-2 rounded-full border border-borderblue bg-white px-3 py-2 text-xs font-medium text-navy shadow-sm">
          <span className="group-open:hidden">{viewLabel}</span>
          <span className="hidden group-open:inline">{hideLabel}</span>
          <ChevronDown
            aria-hidden="true"
            className="h-4 w-4 transition group-open:rotate-180"
          />
        </span>
      </summary>
      <div className="border-t border-borderblue p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {items.map((item) => (
            <InsuranceLogo
              key={`${item.category}-${item.name}`}
              partner={item}
              compact
            />
          ))}
        </div>
      </div>
    </details>
  );
}

function getPartnerInitials(name: string) {
  const compact = name
    .replace(/Blue Cross Blue Shield/g, "BCBS")
    .replace(/United Health Care/g, "UHC")
    .replace(/Pan American Life/g, "PAL")
    .replace(/Best Doctor Insurance/g, "BDI")
    .replace(/IMC Insurance Brokers/g, "IMC")
    .replace(/Continental Assist/g, "CA");

  const words = compact.match(/[A-Za-z0-9]+/g) ?? [name.slice(0, 2)];
  return words
    .slice(0, 3)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}
