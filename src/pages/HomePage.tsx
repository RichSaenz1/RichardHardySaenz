import { Suspense, lazy } from "react";
import { specialtyVisuals } from "../data/pageVisuals";
import { specialtyRouteByKey, type SpecialtyKey } from "../i18n/translations";
import { useLanguage } from "../i18n/LanguageContext";
import {
  homeProcedureKeys,
  procedurePages,
  procedureRoutes,
  procedureSectionLabels,
} from "../i18n/procedurePages";
import { ConcernSelector } from "../components/home/ConcernSelector";
import { HeroSection } from "../components/home/HeroSection";
import { AccessNetwork } from "../components/home/AccessNetwork";
import { BlogRoadmap } from "../components/home/BlogRoadmap";
import { PatientJourney } from "../components/home/PatientJourney";
import { ProcedureCard } from "../components/home/ProcedureCard";
import { SpecialtyCard } from "../components/home/SpecialtyCard";
import { TrustReputation } from "../components/home/TrustReputation";
import { MedicalDisclaimer } from "../components/shared/MedicalDisclaimer";
import { SEO } from "../components/shared/SEO";
import { SectionContainer } from "../components/shared/SectionContainer";
import { seoMetadata } from "../seo/metadata";

const AnatomyExplorer = lazy(() =>
  import("../components/home/AnatomyExplorer").then((module) => ({
    default: module.AnatomyExplorer,
  })),
);

const homeSpecialtyKeys: SpecialtyKey[] = [
  "uroOncologia",
  "calculosRenales",
  "prostata",
  "endourologia",
  "cirugiaLaparoscopica",
  "saludMasculina",
];

export function HomePage() {
  const { language, t } = useLanguage();
  const procedureCopy = procedurePages[language] ?? procedurePages.es;
  const procedureLabels =
    procedureSectionLabels[language] ?? procedureSectionLabels.es;

  return (
    <>
      <SEO
        title={seoMetadata.home.title}
        description={seoMetadata.home.description}
        canonicalPath={seoMetadata.home.path}
      />
      <HeroSection />

      <SectionContainer
        eyebrow={t.home.concerns.eyebrow}
        title={t.home.concerns.title}
        subtitle={t.home.concerns.subtitle}
      >
        <ConcernSelector />
      </SectionContainer>

      <SectionContainer className="bg-white">
        <AccessNetwork />
      </SectionContainer>

      <SectionContainer
        title={t.home.specialties.title}
        eyebrow={t.home.specialties.eyebrow}
        subtitle={t.home.specialties.subtitle}
      >
        <div className="grid gap-7 xl:grid-cols-2">
          {homeSpecialtyKeys.map((key) => (
            <SpecialtyCard
              key={key}
              title={t.specialties[key].title}
              text={t.specialties[key].subtitle}
              href={specialtyRouteByKey[key]}
              image={specialtyVisuals[key].image}
            />
          ))}
        </div>
      </SectionContainer>

      <SectionContainer
        title={t.home.procedures.title}
        eyebrow={t.home.procedures.eyebrow}
        subtitle={t.home.procedures.subtitle}
      >
        <div className="grid gap-5 xl:grid-cols-2">
          {homeProcedureKeys.map((key) => {
            const item = procedureCopy[key] ?? procedurePages.es[key];

            return (
              <ProcedureCard
                key={key}
                title={item.title}
                text={item.cardText}
                href={procedureRoutes[key]}
                image={item.image}
                ctaLabel={procedureLabels.cardCta}
              />
            );
          })}
        </div>
      </SectionContainer>

      <SectionContainer className="bg-mist">
        <TrustReputation />
      </SectionContainer>

      <SectionContainer
        title={t.home.journey.title}
        eyebrow={t.home.journey.eyebrow}
        subtitle={t.home.journey.subtitle}
      >
        <PatientJourney />
      </SectionContainer>

      <Suspense fallback={<div className="bg-navy py-24" aria-hidden="true" />}>
        <AnatomyExplorer />
      </Suspense>

      <SectionContainer className="bg-mist">
        <BlogRoadmap />
        <MedicalDisclaimer className="mt-12" />
      </SectionContainer>
    </>
  );
}
