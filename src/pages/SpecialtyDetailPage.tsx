import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Link as LinkIcon,
  MessageCircle,
} from "lucide-react";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { specialtyVisuals } from "../data/pageVisuals";
import {
  specialtyRouteByKey,
  type SpecialtyKey,
} from "../i18n/translations";
import { useLanguage } from "../i18n/LanguageContext";
import { internalPages } from "../i18n/internalPages";
import { pageUxImprovements } from "../i18n/pageUxImprovements";
import { specialtyBoxFillers } from "../i18n/specialtyBoxFillers";
import { specialtyEnhancements } from "../i18n/specialtyEnhancements";
import { getWhatsAppHref } from "../lib/whatsapp";
import { Breadcrumbs } from "../components/shared/Breadcrumbs";
import { CTAButton } from "../components/shared/CTAButton";
import { FAQAccordion } from "../components/shared/FAQAccordion";
import { ImageCard } from "../components/shared/ImageCard";
import { MedicalDisclaimer } from "../components/shared/MedicalDisclaimer";
import { PageHero } from "../components/shared/PageHero";
import { SEO } from "../components/shared/SEO";
import { SectionContainer } from "../components/shared/SectionContainer";
import { specialtyBreadcrumbs } from "../seo/breadcrumbs";
import { seoMetadata, type SeoPageKey } from "../seo/metadata";
import { pageSchema } from "../seo/schema";

type SpecialtyDetailPageProps = {
  pageKey: SpecialtyKey;
};

type SecondOpinionUx = (typeof pageUxImprovements)["es"]["secondOpinion"];

const specialtySeoKey: Record<SpecialtyKey, SeoPageKey> = {
  prostata: "prostata",
  calculosRenales: "calculosRenales",
  uroOncologia: "uroOncologia",
  endourologia: "endourologia",
  cirugiaLaparoscopica: "cirugiaLaparoscopica",
  saludMasculina: "saludMasculina",
  segundaOpinion: "segundaOpinion",
  ureteroscopia: "ureteroscopia",
};

export function SpecialtyDetailPage({ pageKey }: SpecialtyDetailPageProps) {
  const { language, t } = useLanguage();
  const location = useLocation();
  const copy = internalPages[language];
  const secondOpinionUx = pageUxImprovements[language].secondOpinion;
  const page = {
    ...copy.pages[pageKey],
    ...specialtyEnhancements[language][pageKey],
    ...specialtyBoxFillers[language][pageKey],
  };
  const visuals = specialtyVisuals[pageKey];
  const seo = seoMetadata[specialtySeoKey[pageKey]];
  const breadcrumbs =
    pageKey === "segundaOpinion"
      ? [
          { label: language === "es" ? "Inicio" : "Home", href: "/" },
          { label: page.title, href: seo.path },
        ]
      : specialtyBreadcrumbs(language, page.title, seo.path);
  const faqItems = page.faq.map(([question, answer]) => ({
    question,
    answer: completeFaqAnswer(answer, language),
  }));

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        canonicalPath={seo.path}
        jsonLd={pageSchema({ breadcrumbs, faqs: faqItems })}
      />
      <PageHero
        eyebrow={t.brand.platform}
        title={page.title}
        subtitle={page.subtitle}
        intro={page.intro}
        image={visuals.image}
        actions={
          <>
            <CTAButton
              to="/agendar-cita"
              icon={<CalendarDays aria-hidden="true" className="h-4 w-4" />}
              analyticsEvent={
                pageKey === "segundaOpinion"
                  ? "second_opinion_cta_click"
                  : "specialty_page_cta_click"
              }
              analyticsPayload={{ pageKey, location: "hero" }}
            >
              {page.cta}
            </CTAButton>
            <CTAButton
              href={getWhatsAppHref(location.pathname, language)}
              variant="secondary"
              icon={<MessageCircle aria-hidden="true" className="h-4 w-4" />}
              analyticsEvent="whatsapp_click"
              analyticsPayload={{ pageKey, location: "hero" }}
            >
              {t.cta.whatsapp}
            </CTAButton>
          </>
        }
      />
      <Breadcrumbs items={breadcrumbs} />

      {pageKey === "segundaOpinion" && (
        <SecondOpinionDecisionSection
          copy={secondOpinionUx}
          cta={page.cta}
          whatsappLabel={t.cta.whatsapp}
          whatsappHref={getWhatsAppHref(location.pathname, language)}
        />
      )}

      <SectionContainer className="bg-white">
        <div className="grid items-stretch gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5 lg:h-full">
            <ImageCard
              image={visuals.accent}
              className="h-[360px] lg:h-full lg:min-h-[660px]"
            />
            {page.urgent && (
              <aside className="flex gap-3 rounded-[1.25rem] border border-red-100 bg-red-50/70 p-5 text-sm leading-7 text-muted shadow-sm">
                <AlertTriangle
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 flex-none text-red-500"
                />
                <div>
                  <p className="font-medium text-navy">
                    {page.urgentTitle ?? copy.common.urgent}
                  </p>
                  <p className="mt-1">{page.urgent}</p>
                </div>
              </aside>
            )}
          </div>

          <div className="grid h-full content-stretch gap-6">
            <article className="premium-card flex flex-col justify-center rounded-[1.6rem] p-7 sm:p-9">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-medical">
                {copy.common.overview}
              </p>
              <h2 className="mt-4 font-heading text-5xl leading-[0.95] text-navy text-balance">
                {page.overviewTitle}
              </h2>
              <p className="mt-6 text-base leading-8 text-muted">
                {page.overview}
              </p>
            </article>

            <article className="premium-card flex flex-col justify-center rounded-[1.6rem] p-7 sm:p-9">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-medical">
                {copy.common.when}
              </p>
              <h2 className="mt-4 font-heading text-4xl leading-none text-navy">
                {page.whenTitle}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {page.when.map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-1 h-5 w-5 flex-none text-cyan"
                    />
                    <p className="text-sm leading-7 text-muted">{item}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-mist">
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          <InfoBlock
            icon={<ClipboardCheck aria-hidden="true" className="h-6 w-6" />}
            eyebrow={copy.common.evaluate}
            title={page.evaluateTitle}
            body={page.evaluate}
            points={page.evaluatePoints}
          />

          <article className="premium-card flex h-full flex-col rounded-[1.45rem] p-7">
            <FileText aria-hidden="true" className="h-6 w-6 text-medical" />
            <p className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-medical">
              {copy.common.bring}
            </p>
            <h2 className="mt-3 text-xl font-medium leading-7 text-navy">
              {page.bringTitle}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">{page.bringIntro}</p>
            <p className="mt-4 rounded-2xl border border-borderblue bg-softblue/45 px-4 py-3 text-sm leading-6 text-muted">
              {language === "es"
                ? "No es necesario tener todos los documentos para solicitar una cita; sin embargo, traerlos organizados permite revisar el caso con más claridad y evitar repetir información importante."
                : "You do not need every document to request a visit; however, bringing organized records helps the case be reviewed more clearly and avoids repeating important information."}
            </p>
            <ul className="mt-5 grid gap-2">
              {page.bring.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-borderblue bg-white/72 px-3 py-2 text-xs font-medium text-navy"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="premium-card flex h-full flex-col rounded-[1.45rem] p-7">
            <ArrowRight aria-hidden="true" className="h-6 w-6 text-gold" />
            <p className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-medical">
              {copy.common.next}
            </p>
            <h2 className="mt-3 text-xl font-medium leading-7 text-navy">
              {page.nextTitle}
            </h2>
            {page.nextIntro && (
              <p className="mt-3 text-sm leading-6 text-muted">{page.nextIntro}</p>
            )}
            <p className="mt-4 rounded-2xl border border-borderblue bg-white/70 px-4 py-3 text-sm leading-6 text-muted">
              {language === "es"
                ? "Cada paso se define después de revisar síntomas, antecedentes y estudios disponibles. La orientación del sitio es educativa y no reemplaza la consulta médica."
                : "Each step is defined after reviewing symptoms, history, and available studies. Website guidance is educational and does not replace a medical consultation."}
            </p>
            <ol className="mt-5 grid gap-3">
              {page.next.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 text-xs font-medium text-gold">
                    0{index + 1}
                  </span>
                  <p className="text-sm leading-6 text-muted">{item}</p>
                </li>
              ))}
            </ol>
          </article>
        </div>

        <div className="mt-7 rounded-[1.55rem] border border-borderblue bg-white/80 p-6 shadow-[0_20px_70px_rgba(13,43,69,0.06)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <LinkIcon aria-hidden="true" className="h-6 w-6 text-medical" />
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-medical">
                {copy.common.related}
              </p>
              <h2 className="mt-3 font-heading text-4xl leading-none text-navy">
                {page.relatedTitle}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {page.related.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="rounded-full border border-borderblue bg-softblue/70 px-4 py-2 text-sm font-medium text-navy transition hover:-translate-y-0.5 hover:border-gold hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer title={page.faqTitle}>
        <FAQAccordion items={faqItems} />
        <div className="mt-9 flex flex-wrap gap-4">
          <CTAButton
            to="/agendar-cita"
            icon={<CalendarDays aria-hidden="true" className="h-4 w-4" />}
            analyticsEvent={
              pageKey === "segundaOpinion"
                ? "second_opinion_cta_click"
                : "specialty_page_cta_click"
            }
            analyticsPayload={{ pageKey, location: "faq" }}
          >
            {page.cta}
          </CTAButton>
          {pageKey !== "segundaOpinion" && (
            <CTAButton to={specialtyRouteByKey.segundaOpinion} variant="secondary">
              {t.cta.secondOpinion}
            </CTAButton>
          )}
        </div>
        <MedicalDisclaimer className="mt-8" />
      </SectionContainer>
    </>
  );
}

function completeFaqAnswer(answer: string, language: "es" | "en") {
  if (answer.length >= 230) {
    return answer;
  }

  const appendix =
    language === "es"
      ? " Durante la consulta se revisa el contexto completo, los estudios disponibles y los síntomas actuales para orientar próximos pasos de forma segura, sin sustituir una evaluación médica ni prometer un resultado específico."
      : " During the visit, the full context, available studies, and current symptoms are reviewed to guide safe next steps, without replacing medical evaluation or promising a specific outcome.";

  return `${answer}${appendix}`;
}

function InfoBlock({
  icon,
  eyebrow,
  title,
  body,
  points,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  body: string;
  points?: string[];
}) {
  return (
    <article className="premium-card flex h-full flex-col rounded-[1.45rem] p-7">
      <div className="text-medical">{icon}</div>
      <p className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-medical">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-xl font-medium leading-7 text-navy">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-muted">{body}</p>
      {points && points.length > 0 && (
        <ul className="mt-6 grid gap-3">
          {points.map((point) => (
            <li key={point} className="flex gap-3">
              <CheckCircle2
                aria-hidden="true"
                className="mt-1 h-4 w-4 flex-none text-cyan"
              />
              <span className="text-sm leading-6 text-muted">{point}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function SecondOpinionDecisionSection({
  copy,
  cta,
  whatsappLabel,
  whatsappHref,
}: {
  copy: SecondOpinionUx;
  cta: string;
  whatsappLabel: string;
  whatsappHref: string;
}) {
  return (
    <SectionContainer className="bg-navy text-white" dark>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(91,158,201,0.20),transparent_28rem),radial-gradient(circle_at_82%_12%,rgba(201,168,76,0.13),transparent_26rem)]" />
      <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-cyan">
            {copy.reviewEyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl font-heading text-5xl leading-[0.95] text-white text-balance sm:text-6xl">
            {copy.reviewTitle}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100">
            {copy.reviewBody}
          </p>
          <div className="mt-8 grid gap-3">
            {copy.reviewItems.map((item, index) => (
              <div
                key={item.title}
                className="rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur"
              >
                <span className="text-xs font-medium text-gold">0{index + 1}</span>
                <h3 className="mt-3 text-base font-medium text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-blue-100">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <article className="rounded-[1.75rem] border border-white/12 bg-white p-6 text-navy shadow-[0_30px_90px_rgba(0,0,0,0.18)] sm:p-8">
            <FileText aria-hidden="true" className="h-6 w-6 text-medical" />
            <h3 className="mt-4 font-heading text-4xl leading-none">
              {copy.documentTitle}
            </h3>
            <p className="mt-4 text-sm leading-7 text-muted">
              {copy.documentBody}
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {copy.documentItems.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-2xl border border-borderblue bg-softblue/55 px-4 py-3"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 flex-none text-cyan"
                  />
                  <p className="text-sm font-medium leading-5 text-navy">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-white/12 bg-white/[0.08] p-6 backdrop-blur sm:p-8">
            <h3 className="font-heading text-4xl leading-none text-white">
              {copy.decisionTitle}
            </h3>
            <div className="mt-6 grid gap-4">
              {copy.decisionSteps.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-full border border-cyan/35 bg-white/10 text-xs font-medium text-cyan">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-blue-100">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 rounded-2xl border border-gold/20 bg-gold/10 p-4 text-sm leading-7 text-blue-100">
              {copy.safetyNote}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CTAButton
                to="/agendar-cita"
                variant="light"
                analyticsEvent="second_opinion_cta_click"
                analyticsPayload={{ location: "decision_section" }}
              >
                {cta}
              </CTAButton>
              <CTAButton
                href={whatsappHref}
                variant="secondary"
                icon={<MessageCircle aria-hidden="true" className="h-4 w-4" />}
                analyticsEvent="whatsapp_click"
                analyticsPayload={{ location: "decision_section" }}
              >
                {whatsappLabel}
              </CTAButton>
            </div>
          </article>
        </div>
      </div>
    </SectionContainer>
  );
}
