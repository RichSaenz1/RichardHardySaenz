import {
  homeProcedureKeys,
  procedurePages,
  procedureRoutes,
  procedureSectionLabels,
  type ProcedureKey,
} from "../i18n/procedurePages";
import { useLanguage } from "../i18n/LanguageContext";
import { ProcedureCard } from "../components/home/ProcedureCard";
import { CTAButton } from "../components/shared/CTAButton";
import { PageHero } from "../components/shared/PageHero";
import { SEO } from "../components/shared/SEO";
import { SectionContainer } from "../components/shared/SectionContainer";
import { imageAssets } from "../data/images";

const accessibleProcedureTitles: Record<ProcedureKey, { es: string; en: string }> = {
  ureteroscopia: {
    es: "Ureteroscopia: evaluacion y tratamiento endoscopico del ureter",
    en: "Ureteroscopy: endoscopic evaluation and treatment of the ureter",
  },
  laserCalculos: {
    es: "Laser para calculos urinarios",
    en: "Laser treatment for urinary stones",
  },
  biopsiaProstata: {
    es: "Biopsia de prostata para aclarar hallazgos",
    en: "Prostate biopsy to clarify findings",
  },
  nefrolitotomiaPercutanea: {
    es: "Nefrolitotomia percutanea para calculos grandes o complejos",
    en: "Percutaneous nephrolithotomy for large or complex stones",
  },
  cistoscopia: {
    es: "Cistoscopia para evaluar vejiga y via urinaria",
    en: "Cystoscopy to evaluate the bladder and urinary tract",
  },
  laparoscopiaRenal: {
    es: "Cirugia renal laparoscopica de minima invasion",
    en: "Minimally invasive laparoscopic kidney surgery",
  },
  holep: {
    es: "HoLEP: cirugia laser para crecimiento benigno de prostata",
    en: "HoLEP: laser surgery for benign prostate enlargement",
  },
  rtup: {
    es: "RTUP: reseccion endoscopica para obstruccion prostatica",
    en: "TURP: endoscopic resection for prostate obstruction",
  },
  adenectomiaProstatica: {
    es: "Adenectomia prostatica para prostatas de gran tamano",
    en: "Prostate adenomectomy for very enlarged prostates",
  },
  ureteroscopiaFlexible: {
    es: "Ureteroscopia flexible para calculos dentro del rinon",
    en: "Flexible ureteroscopy for stones inside the kidney",
  },
  ureteroscopiaSemirrigida: {
    es: "Ureteroscopia semirrigida para calculos en el ureter",
    en: "Semirigid ureteroscopy for stones in the ureter",
  },
  litotriciaExtracorporea: {
    es: "Litotricia extracorporea con ondas de choque",
    en: "Extracorporeal shock wave lithotripsy",
  },
  disfuncionErectil: {
    es: "Evaluacion integral de disfuncion erectil",
    en: "Comprehensive erectile dysfunction evaluation",
  },
  vasectomia: {
    es: "Vasectomia: anticoncepcion masculina ambulatoria",
    en: "Vasectomy: outpatient male contraception",
  },
};

const copy = {
  es: {
    title: "Procedimientos urologicos explicados con claridad.",
    subtitle:
      "Rutas educativas para entender cuando se conversa cada procedimiento, que estudios se revisan y como se confirma la indicacion medica.",
    eyebrow: "Procedimientos",
    sectionTitle: "Opciones frecuentes de procedimiento",
    sectionSubtitle:
      "Cada tarjeta usa un titulo descriptivo para pacientes que visitan el sitio por primera vez, manteniendo el nombre medico como referencia.",
    cta: "Agendar orientacion",
  },
  en: {
    title: "Urologic procedures explained clearly.",
    subtitle:
      "Educational pathways to understand when each procedure may be discussed, which studies are reviewed, and how the medical indication is confirmed.",
    eyebrow: "Procedures",
    sectionTitle: "Common procedure options",
    sectionSubtitle:
      "Each card uses a patient-friendly title while preserving the medical name as a reference.",
    cta: "Request guidance",
  },
} as const;

export function ProceduresPage() {
  const { language } = useLanguage();
  const t = copy[language] ?? copy.es;
  const procedureCopy = procedurePages[language] ?? procedurePages.es;
  const procedureLabels = procedureSectionLabels[language] ?? procedureSectionLabels.es;

  return (
    <>
      <SEO
        title="Procedimientos urologicos | Dr. Carlos Brugiati"
        description={t.subtitle}
        canonicalPath="/procedimientos"
      />
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        subtitle={t.subtitle}
        image={imageAssets.bluegatiProceduresHero}
        actions={<CTAButton to="/agendar-cita">{t.cta}</CTAButton>}
      />
      <SectionContainer title={t.sectionTitle} subtitle={t.sectionSubtitle}>
        <div className="grid gap-5 xl:grid-cols-2">
          {homeProcedureKeys.map((key) => {
            const item = procedureCopy[key] ?? procedurePages.es[key];
            const accessibleTitle =
              accessibleProcedureTitles[key]?.[language] ??
              accessibleProcedureTitles[key]?.es ??
              item.title;

            return (
              <ProcedureCard
                key={key}
                title={item.title}
                accessibleTitle={accessibleTitle}
                text={item.cardText}
                href={procedureRoutes[key]}
                image={item.image}
                ctaLabel={procedureLabels.cardCta}
              />
            );
          })}
        </div>
      </SectionContainer>
    </>
  );
}
