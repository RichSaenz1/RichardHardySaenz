import { ArrowRight, CalendarDays, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { imageAssets } from "../data/images";
import { specialtyVisuals } from "../data/pageVisuals";
import { specialtyRouteByKey, type SpecialtyKey } from "../i18n/translations";
import { useLanguage } from "../i18n/LanguageContext";
import { internalPages } from "../i18n/internalPages";
import { Breadcrumbs } from "../components/shared/Breadcrumbs";
import { CTAButton } from "../components/shared/CTAButton";
import { ImageCard } from "../components/shared/ImageCard";
import { MedicalDisclaimer } from "../components/shared/MedicalDisclaimer";
import { PageHero } from "../components/shared/PageHero";
import { SEO } from "../components/shared/SEO";
import { SectionContainer } from "../components/shared/SectionContainer";
import { simpleBreadcrumbs } from "../seo/breadcrumbs";
import { seoMetadata } from "../seo/metadata";
import { pageSchema } from "../seo/schema";

const specialtyKeys: SpecialtyKey[] = [
  "prostata",
  "calculosRenales",
  "uroOncologia",
  "endourologia",
  "cirugiaLaparoscopica",
  "saludMasculina",
  "segundaOpinion",
];

export function SpecialtiesPage() {
  const { language, t } = useLanguage();
  const copy = internalPages[language];
  const hub = copy.specialtiesHub;
  const breadcrumbs = simpleBreadcrumbs(
    language,
    "specialties",
    seoMetadata.specialties.path,
  );

  function openAssistant() {
    window.dispatchEvent(new CustomEvent("uropanama:open-assistant"));
  }

  return (
    <>
      <SEO
        title={seoMetadata.specialties.title}
        description={seoMetadata.specialties.description}
        canonicalPath={seoMetadata.specialties.path}
        jsonLd={pageSchema({ breadcrumbs })}
      />
      <PageHero
        title={hub.title}
        subtitle={hub.subtitle}
        intro={hub.intro}
        image={imageAssets.uroOncology}
        actions={
          <CTAButton
            to="/agendar-cita"
            icon={<CalendarDays aria-hidden="true" className="h-4 w-4" />}
          >
            {t.cta.evaluation}
          </CTAButton>
        }
      />
      <Breadcrumbs items={breadcrumbs} />

      <SectionContainer
        title={hub.selectorTitle}
        eyebrow={t.brand.platform}
        subtitle={hub.selectorIntro}
        className="bg-white"
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {specialtyKeys.map((key) => {
            const page = copy.pages[key];
            return (
              <Link
                key={key}
                to={specialtyRouteByKey[key]}
                className="group overflow-hidden rounded-[1.5rem] border border-borderblue bg-white shadow-[0_18px_60px_rgba(13,43,69,0.06)] transition duration-300 hover:-translate-y-1 hover:border-gold/70 hover:shadow-[0_26px_80px_rgba(13,43,69,0.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
              >
                <ImageCard
                  image={specialtyVisuals[key].image}
                  className="h-56 rounded-none border-0 shadow-none"
                  imageClassName="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="p-6">
                  <h2 className="font-heading text-4xl leading-none text-navy">
                    {page.title}
                  </h2>
                  <p className="mt-4 min-h-[5.25rem] text-sm leading-7 text-muted">
                    {page.intro}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold">
                    {page.cta}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </SectionContainer>

      <SectionContainer className="bg-mist">
        <div className="rounded-[1.75rem] border border-borderblue bg-white/84 p-7 shadow-[0_22px_76px_rgba(13,43,69,0.07)] backdrop-blur sm:p-9 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-medical">
              {copy.common.assistant}
            </p>
            <h2 className="mt-4 font-heading text-5xl leading-none text-navy">
              {hub.unsureTitle}
            </h2>
            <p className="mt-5 text-base leading-8 text-muted">{hub.unsureBody}</p>
          </div>
          <div className="mt-7 flex flex-wrap gap-3 lg:mt-0">
            <button
              type="button"
              onClick={openAssistant}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-pill border border-navy bg-transparent px-6 text-button text-navy transition hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(13,43,69,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              {t.cta.assistant}
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
            </button>
            <CTAButton
              to="/agendar-cita"
              icon={<CalendarDays aria-hidden="true" className="h-4 w-4" />}
            >
              {t.cta.book}
            </CTAButton>
          </div>
        </div>
        <MedicalDisclaimer className="mt-12" />
      </SectionContainer>
    </>
  );
}
