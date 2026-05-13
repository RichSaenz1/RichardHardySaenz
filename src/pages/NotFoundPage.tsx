import { CalendarDays, Home } from "lucide-react";
import { Breadcrumbs } from "../components/shared/Breadcrumbs";
import { CTAButton } from "../components/shared/CTAButton";
import { SEO } from "../components/shared/SEO";
import { SectionContainer } from "../components/shared/SectionContainer";
import { useLanguage } from "../i18n/LanguageContext";
import { simpleBreadcrumbs } from "../seo/breadcrumbs";
import { seoMetadata } from "../seo/metadata";
import { pageSchema } from "../seo/schema";

export function NotFoundPage() {
  const { language } = useLanguage();
  const breadcrumbs = simpleBreadcrumbs(language, "notFound", "/404");
  const copy =
    language === "es"
      ? {
          title: "Página no encontrada",
          body:
            "La página que busca no está disponible. Puede volver al inicio o agendar una consulta.",
          home: "Volver al inicio",
          book: "Agendar cita",
        }
      : {
          title: "Page not found",
          body:
            "The page you are looking for is not available. You can return home or book a visit.",
          home: "Return home",
          book: "Book visit",
        };

  return (
    <>
      <SEO
        title={seoMetadata.notFound.title}
        description={seoMetadata.notFound.description}
        canonicalPath="/404"
        jsonLd={pageSchema({ breadcrumbs })}
      />
      <section className="luxury-shell bg-mist px-4 pb-14 pt-32 sm:px-6 lg:px-8 lg:pt-40">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-medical">
            UroPanama
          </p>
          <h1 className="mt-5 font-heading text-6xl leading-[0.92] text-navy sm:text-7xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            {copy.body}
          </p>
        </div>
      </section>
      <Breadcrumbs items={breadcrumbs} />
      <SectionContainer className="bg-white">
        <div className="mx-auto flex max-w-4xl flex-wrap gap-3">
          <CTAButton
            to="/"
            variant="secondary"
            icon={<Home aria-hidden="true" className="h-4 w-4" />}
          >
            {copy.home}
          </CTAButton>
          <CTAButton
            to="/agendar-cita"
            icon={<CalendarDays aria-hidden="true" className="h-4 w-4" />}
          >
            {copy.book}
          </CTAButton>
        </div>
      </SectionContainer>
    </>
  );
}
