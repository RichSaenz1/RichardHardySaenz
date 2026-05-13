import {
  ArrowRight,
  Bot,
  CheckCircle2,
  FileText,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { contact } from "../data/contact";
import { imageAssets } from "../data/images";
import { useLanguage } from "../i18n/LanguageContext";
import { pageUxImprovements } from "../i18n/pageUxImprovements";
import { refinementCopy } from "../i18n/refinementCopy";
import { getWhatsAppHref } from "../lib/whatsapp";
import { BookingForm } from "../components/home/BookingForm";
import { Breadcrumbs } from "../components/shared/Breadcrumbs";
import { CTAButton } from "../components/shared/CTAButton";
import { MedicalDisclaimer } from "../components/shared/MedicalDisclaimer";
import { SEO } from "../components/shared/SEO";
import { SectionContainer } from "../components/shared/SectionContainer";
import { simpleBreadcrumbs } from "../seo/breadcrumbs";
import { seoMetadata } from "../seo/metadata";
import { pageSchema } from "../seo/schema";

export function BookingPage() {
  const { language, t } = useLanguage();
  const location = useLocation();
  const bookingCopy = refinementCopy[language].booking;
  const bookingUx = pageUxImprovements[language].booking;
  const breadcrumbs = simpleBreadcrumbs(
    language,
    "booking",
    seoMetadata.booking.path,
  );
  const contactLabels =
    language === "es"
      ? ["WhatsApp", "Teléfono", "Email", "Ubicación"]
      : ["WhatsApp", "Phone", "Email", "Location"];
  const contactCards = [
    {
      label: contactLabels[0],
      value: contact.whatsappDisplay,
      href: getWhatsAppHref(location.pathname, language),
      icon: MessageCircle,
    },
    {
      label: contactLabels[1],
      value: contact.phoneDisplay,
      href: contact.phoneHref,
      icon: Phone,
    },
    {
      label: contactLabels[2],
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: Mail,
    },
    {
      label: contactLabels[3],
      value: contact.location,
      href: "#contacto",
      icon: MapPin,
    },
  ];
  const appointmentFacts =
    language === "es"
      ? [
          ["Sistema actual", "HuliPractice"],
          ["Primera consulta", "45 minutos"],
          ["Seguimiento", "30 minutos"],
          ["Confirmación", "Manual por el equipo"],
        ]
      : [
          ["Current system", "HuliPractice"],
          ["New visit", "45 minutes"],
          ["Follow-up", "30 minutes"],
          ["Confirmation", "Manual by the team"],
        ];

  return (
    <>
      <SEO
        title={seoMetadata.booking.title}
        description={seoMetadata.booking.description}
        canonicalPath={seoMetadata.booking.path}
        jsonLd={pageSchema({ breadcrumbs })}
      />
      <section className="luxury-shell relative overflow-hidden bg-mist px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-24 lg:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_22%,rgba(91,158,201,0.18),transparent_32rem),linear-gradient(135deg,#F5F7F9,#E0EEF7)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_0.82fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-medical">
              {t.brand.platform}
            </p>
            <h1 className="mt-5 font-heading text-display leading-[0.92] text-navy text-balance sm:text-display lg:text-display">
              {t.bookingPage.title}
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-[1.7] text-slate-600">
              {t.bookingPage.subtitle}
            </p>
            <p className="mt-5 max-w-xl text-base leading-[1.8] text-muted">
              {bookingCopy.heroBody}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton
                href={getWhatsAppHref(location.pathname, language)}
                icon={<MessageCircle aria-hidden="true" className="h-4 w-4" />}
              >
                {t.cta.whatsapp}
              </CTAButton>
              <CTAButton
                href={contact.phoneHref}
                variant="secondary"
                icon={<Phone aria-hidden="true" className="h-4 w-4" />}
              >
                {t.cta.call}
              </CTAButton>
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_30px_90px_rgba(13,43,69,0.10)] lg:min-h-[480px]">
            <img
              src={imageAssets.premiumClinic.src}
              alt={imageAssets.premiumClinic.alt}
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-navy/12 via-transparent to-white/26" />
            <div className="absolute bottom-5 left-5 right-5 rounded-[1.25rem] border border-white/70 bg-white/90 p-5 shadow-[0_20px_60px_rgba(13,43,69,0.12)] backdrop-blur-xl">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-medical">
                {bookingCopy.privacyTitle}
              </p>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                {bookingCopy.international}
              </p>
            </div>
          </div>
        </div>
      </section>
      <Breadcrumbs items={breadcrumbs} />

      <SectionContainer className="bg-white">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.64fr)_minmax(320px,0.36fr)]">
          <div className="relative">
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-softblue/70 via-white to-transparent" />
            <div className="relative">
              <BookingForm />
            </div>
          </div>

          <aside id="contacto" className="lg:sticky lg:top-28">
            <SupportCard title={bookingUx.panelTitle}>
              <p className="mb-5 text-sm leading-7 text-muted">
                {bookingUx.panelBody}
              </p>
              <div className="grid gap-3">
                {contactCards.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex gap-3 rounded-2xl border border-borderblue bg-white/80 p-4 transition hover:-translate-y-0.5 hover:bg-softblue/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                    >
                      <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 flex-none text-medical" />
                      <span>
                        <span className="block text-xs font-medium uppercase tracking-[0.14em] text-navy">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-sm leading-6 text-muted">
                          {item.value}
                        </span>
                      </span>
                    </a>
                  );
                })}
              </div>
              <div className="mt-6 rounded-[1.25rem] border border-borderblue bg-softblue/55 p-4">
                <p className="text-sm font-medium text-navy">
                  {bookingUx.assuranceTitle}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {bookingUx.assuranceBody}
                </p>
              </div>
              <ul className="mt-5 grid gap-3">
                {bookingUx.panelSteps.map((step) => (
                  <li key={step} className="flex gap-3 text-sm leading-6 text-muted">
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 flex-none text-cyan"
                    />
                    {step}
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid gap-2 rounded-[1.25rem] border border-borderblue bg-softblue/45 p-4">
                {appointmentFacts.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 border-b border-borderblue/70 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
                      {label}
                    </span>
                    <span className="text-sm font-medium text-navy">{value}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("uropanama:open-assistant"))
                }
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-borderblue bg-white px-5 py-3 text-sm font-medium text-navy transition hover:-translate-y-0.5 hover:border-gold hover:bg-softblue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
              >
                {t.cta.assistant}
                <Bot aria-hidden="true" className="h-4 w-4" />
              </button>
            </SupportCard>
          </aside>
        </div>

        <div className="mt-10 rounded-[2rem] border border-borderblue bg-gradient-to-br from-softblue/72 via-white to-white p-6 shadow-[0_20px_70px_rgba(13,43,69,0.06)] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-medical">
                {bookingUx.panelTitle}
              </p>
              <h2 className="mt-3 font-heading text-display leading-none text-navy text-balance">
                {bookingUx.quickTitle}
              </h2>
              <p className="mt-5 text-base leading-8 text-muted">
                {bookingUx.quickBody}
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {bookingUx.quickItems.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[1.25rem] border border-borderblue bg-white/82 p-5"
                >
                  <span className="text-xs font-medium text-gold">0{index + 1}</span>
                  <h3 className="mt-3 text-base font-medium text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-mist">
        <div className="rounded-[2rem] border border-borderblue bg-white/86 p-5 shadow-[0_24px_80px_rgba(13,43,69,0.07)] backdrop-blur sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-medical">
                {t.bookingPage.bringTitle}
              </p>
              <h2 className="mt-3 max-w-xl font-heading text-display leading-[0.96] text-navy text-balance">
                {bookingUx.preparationTitle}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-muted">
                {bookingUx.preparationBody}
              </p>
              <div className="mt-7 divide-y divide-borderblue rounded-[1.35rem] border border-borderblue bg-soft/70">
                <InfoPill
                  icon={<ShieldCheck aria-hidden="true" className="h-5 w-5" />}
                  title={bookingUx.assuranceTitle}
                  body={bookingUx.assuranceBody}
                />
                <InfoPill
                  icon={<Globe2 aria-hidden="true" className="h-5 w-5" />}
                  title={bookingCopy.international}
                  body={t.bookingPage.subtitle}
                />
                <InfoPill
                  icon={<FileText aria-hidden="true" className="h-5 w-5" />}
                  title={refinementCopy[language].concierge.note}
                  body={bookingCopy.heroBody}
                />
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="rounded-[1.5rem] border border-borderblue bg-soft/75 p-5">
                <h3 className="font-heading text-3xl leading-none text-navy">
                  {bookingCopy.nextTitle}
                </h3>
                <div className="mt-5 grid gap-4">
                  {bookingCopy.next.map(([title, body], index) => (
                    <div key={title} className="flex gap-3">
                      <span className="grid h-8 w-8 flex-none place-items-center rounded-full border border-borderblue bg-white text-xs font-medium text-medical">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-navy">{title}</p>
                        <p className="mt-1 text-sm leading-6 text-muted">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <CTAButton
                  to="/agendar-cita"
                  variant="secondary"
                  className="mt-6"
                  icon={<ArrowRight aria-hidden="true" className="h-4 w-4" />}
                >
                  {t.cta.book}
                </CTAButton>
              </div>

              <div className="rounded-[1.5rem] border border-borderblue bg-soft/75 p-5">
                <h3 className="font-heading text-3xl leading-none text-navy">
                  {t.bookingPage.bringTitle}
                </h3>
                <div className="mt-5 grid gap-2">
                  {t.bookingPage.bring.map((item) => (
                    <div key={item} className="flex gap-3 rounded-xl bg-softblue/55 px-3 py-2.5">
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 flex-none text-cyan" />
                      <p className="text-sm font-medium leading-5 text-navy">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-mist py-12 lg:py-14">
        <MedicalDisclaimer />
      </SectionContainer>
    </>
  );
}

function SupportCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[1.45rem] border border-borderblue bg-white/82 p-5 shadow-[0_18px_58px_rgba(13,43,69,0.06)] backdrop-blur sm:p-6">
      <h2 className="font-heading text-3xl leading-none text-navy">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function InfoPill({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-4 p-4">
      <span className="grid h-10 w-10 flex-none place-items-center rounded-2xl bg-white text-medical shadow-[0_10px_30px_rgba(13,43,69,0.06)]">
        {icon}
      </span>
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-navy">
          {title}
        </p>
        <p className="mt-2 text-xs leading-6 text-muted">{body}</p>
      </div>
    </div>
  );
}
