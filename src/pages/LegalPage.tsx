import { CalendarDays } from "lucide-react";
import { Breadcrumbs } from "../components/shared/Breadcrumbs";
import { CTAButton } from "../components/shared/CTAButton";
import { SEO } from "../components/shared/SEO";
import { SectionContainer } from "../components/shared/SectionContainer";
import { useLanguage } from "../i18n/LanguageContext";
import { simpleBreadcrumbs } from "../seo/breadcrumbs";
import { seoMetadata } from "../seo/metadata";
import { pageSchema } from "../seo/schema";

type LegalPageProps = {
  type: "privacy" | "terms";
};

export function LegalPage({ type }: LegalPageProps) {
  const { language, t } = useLanguage();
  const seo = seoMetadata[type];
  const breadcrumbs = simpleBreadcrumbs(language, type, seo.path);
  const copy = getCopy(type, language);

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        canonicalPath={seo.path}
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
            {copy.intro}
          </p>
        </div>
      </section>
      <Breadcrumbs items={breadcrumbs} />
      <SectionContainer className="bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="premium-card rounded-[1.55rem] p-7 sm:p-9">
            <p className="rounded-2xl border border-amber-100 bg-amber-50/80 px-4 py-3 text-sm leading-7 text-muted">
              {copy.notice}
            </p>
            <div className="mt-8 grid gap-7">
              {copy.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="font-heading text-4xl leading-none text-navy">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-muted">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
            <div className="mt-9">
              <CTAButton
                to="/agendar-cita"
                icon={<CalendarDays aria-hidden="true" className="h-4 w-4" />}
              >
                {t.cta.book}
              </CTAButton>
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  );
}

function getCopy(type: "privacy" | "terms", language: "es" | "en") {
  if (type === "privacy") {
    return language === "es"
      ? {
          title: "Privacidad",
          intro:
            "Información general sobre cómo se utiliza la información enviada por formularios y canales digitales.",
          notice:
            "Esta página resume el uso general de la información enviada por canales digitales. La versión final debe ser revisada y aprobada antes de publicación.",
          sections: [
            {
              title: "Datos de contacto",
              body:
                "Los formularios y enlaces de WhatsApp pueden solicitar nombre, teléfono, email, motivo general de consulta y preferencia de horario para coordinar una cita.",
            },
            {
              title: "Uso de la información",
              body:
                "La información se utiliza para responder solicitudes, coordinar disponibilidad y preparar orientación inicial. Este sitio no solicita documentos médicos ni valores de laboratorio.",
            },
            {
              title: "Seguridad médica",
              body:
                "El sitio, formularios y asistente no realizan diagnósticos ni sustituyen una evaluación médica. En caso de emergencia, acuda a un servicio médico de urgencia.",
            },
          ],
        }
      : {
          title: "Privacy",
          intro:
            "General information about how data submitted through forms and digital channels is used.",
          notice:
            "This page summarizes the general use of information submitted through digital channels. Final copy should be reviewed and approved before publication.",
          sections: [
            {
              title: "Contact data",
              body:
                "Forms and WhatsApp links may request name, phone, email, general reason for consultation, and preferred time to coordinate a visit.",
            },
            {
              title: "Use of information",
              body:
                "Information is used to respond to requests, coordinate availability, and prepare initial guidance. This site does not request medical documents or lab values.",
            },
            {
              title: "Medical safety",
              body:
                "The website, forms, and assistant do not provide diagnoses and do not replace medical evaluation. In an emergency, seek urgent medical care.",
            },
          ],
        };
  }

  return language === "es"
    ? {
        title: "Términos de uso",
        intro:
          "Condiciones generales para el uso informativo del sitio web de UroPanama.",
        notice:
          "Estas condiciones explican el uso informativo del sitio. La versión final debe ser revisada y aprobada antes de publicación.",
        sections: [
          {
            title: "Contenido educativo",
            body:
              "La información del sitio tiene fines educativos y de orientación general. No constituye diagnóstico, tratamiento ni recomendación médica personalizada.",
          },
          {
            title: "Coordinación de citas",
            body:
              "El envío de un formulario o mensaje por WhatsApp no confirma una cita automáticamente. El equipo debe confirmar disponibilidad y próximos pasos.",
          },
          {
            title: "Emergencias",
            body:
              "Este sitio no debe utilizarse para emergencias médicas. Si presenta síntomas graves, acuda a un servicio médico de urgencia.",
          },
        ],
      }
    : {
        title: "Terms of use",
        intro:
          "General conditions for using the UroPanama website as an informational resource.",
        notice:
          "These terms explain informational use of the website. Final copy should be reviewed and approved before publication.",
        sections: [
          {
            title: "Educational content",
            body:
              "Website information is for education and general guidance. It is not a diagnosis, treatment, or personalized medical recommendation.",
          },
          {
            title: "Appointment coordination",
            body:
              "Submitting a form or WhatsApp message does not automatically confirm a visit. The team must confirm availability and next steps.",
          },
          {
            title: "Emergencies",
            body:
              "This site should not be used for medical emergencies. If you have severe symptoms, seek urgent medical care.",
          },
        ],
      };
}
