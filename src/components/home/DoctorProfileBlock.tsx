import { CalendarDays } from "lucide-react";
import { imageAssets, optionalImages } from "../../data/images";
import { useLanguage } from "../../i18n/LanguageContext";
import { CTAButton } from "../shared/CTAButton";
import { OptionalImage } from "../shared/OptionalImage";

export function DoctorProfileBlock() {
  const { t } = useLanguage();
  const fallback = (
    <div className="relative h-full min-h-[480px] overflow-hidden rounded-[1.25rem] bg-softblue">
      <img
        src={imageAssets.premiumClinic.src}
        alt={imageAssets.premiumClinic.alt}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/10 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/40 bg-white/90 p-5 text-sm text-navy shadow-soft backdrop-blur">
        {t.brand.doctor} · {t.brand.platform}
      </div>
    </div>
  );

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="overflow-hidden rounded-[1.5rem] border border-borderblue bg-white p-3 shadow-premium">
        <OptionalImage
          src={optionalImages.doctorPortrait.src}
          alt={optionalImages.doctorPortrait.alt}
          className="h-full min-h-[480px] w-full rounded-[1.15rem] object-cover"
          fallback={fallback}
        />
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-medical">
          {t.brand.doctor}
        </p>
        <h2 className="mt-5 max-w-3xl font-heading text-5xl leading-[0.96] text-navy text-balance lg:text-6xl">
          {t.about.subtitle}
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-[1.75] text-muted">
          {t.about.intro}
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {t.about.areas.map((item) => (
            <span
              key={item}
              className="rounded-full border border-borderblue bg-softblue px-4 py-2 text-xs font-medium text-navy"
            >
              {item}
            </span>
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
  );
}
