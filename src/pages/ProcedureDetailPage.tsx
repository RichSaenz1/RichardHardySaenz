import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileText,
  HelpCircle,
  Link as LinkIcon,
  MessageCircle,
  Stethoscope,
} from "lucide-react";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs } from "../components/shared/Breadcrumbs";
import { CTAButton } from "../components/shared/CTAButton";
import { FAQAccordion } from "../components/shared/FAQAccordion";
import { ImageCard } from "../components/shared/ImageCard";
import { MedicalDisclaimer } from "../components/shared/MedicalDisclaimer";
import { PageHero } from "../components/shared/PageHero";
import { SEO } from "../components/shared/SEO";
import { SectionContainer } from "../components/shared/SectionContainer";
import {
  procedurePages,
  procedureRoutes,
  type ProcedureKey,
} from "../i18n/procedurePages";
import { useLanguage } from "../i18n/LanguageContext";
import { getWhatsAppHref } from "../lib/whatsapp";
import { procedureBreadcrumbs } from "../seo/breadcrumbs";
import { seoMetadata, type SeoPageKey } from "../seo/metadata";
import { pageSchema } from "../seo/schema";

type ProcedureDetailPageProps = {
  procedureKey: ProcedureKey;
};

const procedureSeoKey: Record<ProcedureKey, SeoPageKey> = {
  ureteroscopia: "ureteroscopia",
  laserCalculos: "laserCalculos",
  biopsiaProstata: "biopsiaProstata",
  nefrolitotomiaPercutanea: "nefrolitotomiaPercutanea",
  cistoscopia: "cistoscopia",
  laparoscopiaRenal: "laparoscopiaRenal",
  holep: "holep",
  rtup: "rtup",
  adenectomiaProstatica: "adenectomiaProstatica",
  ureteroscopiaFlexible: "ureteroscopiaFlexible",
  ureteroscopiaSemirrigida: "ureteroscopiaSemirrigida",
  litotriciaExtracorporea: "litotriciaExtracorporea",
  disfuncionErectil: "disfuncionErectil",
  vasectomia: "vasectomia",
};

export function ProcedureDetailPage({ procedureKey }: ProcedureDetailPageProps) {
  const { language, t } = useLanguage();
  const location = useLocation();
  const page =
    procedurePages[language]?.[procedureKey] ?? procedurePages.es[procedureKey];
  const labels =
    language === "es"
      ? {
          procedure: "Procedimiento urológico",
          overview: "Comprender el procedimiento",
          when: "Cuándo se conversa",
          preparation: "Antes del procedimiento",
          after: "Después y seguimiento",
          questions: "Preguntas para su consulta",
          related: "Páginas relacionadas",
          relatedTitle: "Conecte este procedimiento con su evaluación.",
          safety:
            "La indicación de cualquier procedimiento depende de una evaluación médica, estudios disponibles y condición general del paciente.",
        }
      : {
          procedure: "Urologic procedure",
          overview: "Understand the procedure",
          when: "When it is discussed",
          preparation: "Before the procedure",
          after: "Afterward and follow-up",
          questions: "Questions for your visit",
          related: "Related pages",
          relatedTitle: "Connect this procedure with your evaluation.",
          safety:
            "The indication for any procedure depends on medical evaluation, available studies, and the patient’s overall condition.",
        };
  const path = procedureRoutes[procedureKey];
  const seo = seoMetadata[procedureSeoKey[procedureKey]];
  const breadcrumbs = procedureBreadcrumbs(language, page.title, path);
  const faqItems = page.faq.map(([question, answer]) => ({
    question,
    answer: completeProcedureFaq(answer, language),
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
        eyebrow={labels.procedure}
        title={page.title}
        subtitle={page.subtitle}
        intro={page.intro}
        image={page.image}
        actions={
          <>
            <CTAButton
              to="/agendar-cita"
              icon={<CalendarDays aria-hidden="true" className="h-4 w-4" />}
            >
              {page.cta}
            </CTAButton>
            <CTAButton
              href={getWhatsAppHref(location.pathname, language)}
              variant="secondary"
              icon={<MessageCircle aria-hidden="true" className="h-4 w-4" />}
            >
              {t.cta.whatsapp}
            </CTAButton>
          </>
        }
      />
      <Breadcrumbs items={breadcrumbs} />

      <SectionContainer className="bg-white">
        <div className="grid items-stretch gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-6">
            <ImageCard
              image={page.image}
              className="h-[420px] rounded-[1.8rem] lg:h-full lg:min-h-[620px]"
              imageClassName="object-cover"
            />
          </div>

          <div className="grid gap-6">
            <ProcedurePanel
              icon={<Stethoscope aria-hidden="true" className="h-6 w-6" />}
              eyebrow={labels.overview}
              title={page.overviewTitle}
              body={page.overview}
              emphasis={labels.safety}
            />

            <ProcedurePanel
              icon={<CheckCircle2 aria-hidden="true" className="h-6 w-6" />}
              eyebrow={labels.when}
              title={page.whenTitle}
              items={page.when}
              compact
            />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-mist">
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          <ProcedurePanel
            icon={<ClipboardList aria-hidden="true" className="h-6 w-6" />}
            eyebrow={labels.preparation}
            title={page.preparationTitle}
            body={page.preparation}
            items={page.preparationItems}
          />
          <ProcedurePanel
            icon={<ArrowRight aria-hidden="true" className="h-6 w-6" />}
            eyebrow={labels.after}
            title={page.afterTitle}
            body={page.after}
            items={page.afterItems}
          />
          <ProcedurePanel
            icon={<HelpCircle aria-hidden="true" className="h-6 w-6" />}
            eyebrow={labels.questions}
            title={page.questionsTitle}
            items={page.questions}
            compact
          />
        </div>

        <div className="mt-7 rounded-[1.55rem] border border-borderblue bg-white/82 p-6 shadow-[0_20px_70px_rgba(6,27,51,0.06)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <LinkIcon aria-hidden="true" className="h-6 w-6 text-medical" />
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-medical">
                {labels.related}
              </p>
              <h2 className="mt-3 font-heading text-4xl leading-none text-navy">
                {labels.relatedTitle}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {page.related.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="rounded-full border border-borderblue bg-softblue/70 px-4 py-2 text-sm font-semibold text-navy transition hover:-translate-y-0.5 hover:border-navy hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
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
          >
            {page.cta}
          </CTAButton>
          <CTAButton
            href={getWhatsAppHref(location.pathname, language)}
            variant="secondary"
            icon={<MessageCircle aria-hidden="true" className="h-4 w-4" />}
          >
            {t.cta.whatsapp}
          </CTAButton>
        </div>
        <MedicalDisclaimer className="mt-8" />
      </SectionContainer>
    </>
  );
}

function ProcedurePanel({
  icon,
  eyebrow,
  title,
  body,
  emphasis,
  items,
  compact = false,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  body?: string;
  emphasis?: string;
  items?: string[];
  compact?: boolean;
}) {
  return (
    <article className="premium-card flex h-full flex-col rounded-[1.55rem] p-7 sm:p-9">
      <div className="text-medical">{icon}</div>
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-medical">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold leading-8 text-navy">{title}</h2>
      {body && <p className="mt-4 text-sm leading-7 text-muted">{body}</p>}
      {emphasis && (
        <p className="mt-5 rounded-2xl border border-borderblue bg-softblue/50 px-4 py-3 text-sm leading-6 text-muted">
          {emphasis}
        </p>
      )}
      {items && items.length > 0 && (
        <ul className={compact ? "mt-6 grid gap-4" : "mt-6 grid gap-3"}>
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <CheckCircle2
                aria-hidden="true"
                className="mt-1 h-4 w-4 flex-none text-cyan"
              />
              <span className="text-sm leading-6 text-muted">{item}</span>
            </li>
          ))}
        </ul>
      )}
      {items && !body && (
        <div className="mt-auto pt-6">
          <FileText aria-hidden="true" className="h-5 w-5 text-gold" />
        </div>
      )}
    </article>
  );
}

function completeProcedureFaq(answer: string, language: "es" | "en") {
  if (answer.length >= 220) {
    return answer;
  }

  const appendix =
    language === "es"
      ? " Durante la consulta se revisan los estudios disponibles, el motivo de consulta y la condición general para explicar si este procedimiento realmente corresponde y qué alternativas pueden existir."
      : " During the visit, available studies, the reason for consultation, and overall condition are reviewed to explain whether this procedure is appropriate and what alternatives may exist.";

  return `${answer}${appendix}`;
}
