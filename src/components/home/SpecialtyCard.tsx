import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ImageAsset } from "../../data/images";
import { useLanguage } from "../../i18n/LanguageContext";

type SpecialtyCardProps = {
  title: string;
  text: string;
  href: string;
  image: ImageAsset;
};

export function SpecialtyCard({ title, text, href, image }: SpecialtyCardProps) {
  const { t } = useLanguage();

  return (
    <article className="group rounded-[1.45rem] bg-gradient-to-br from-borderblue via-white to-borderblue p-px shadow-[0_20px_68px_rgba(6,27,51,0.075)] transition duration-300 hover:-translate-y-1 hover:from-medical/40 hover:via-navy/15 hover:to-cyan/40">
      <div className="grid h-full overflow-hidden rounded-[1.42rem] bg-white lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[270px] overflow-hidden bg-softblue">
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1280px) 40vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/42 via-navy/5 to-white/18" />
          <div className="absolute bottom-4 left-4 h-8 w-px rounded-full bg-gradient-to-b from-cyan to-navy opacity-0 transition group-hover:opacity-100" />
        </div>
        <div className="flex min-h-[270px] flex-col justify-between p-8">
          <div>
            <h3 className="font-heading text-4xl leading-none text-navy">{title}</h3>
            <p className="mt-5 min-h-[5.8rem] text-sm leading-7 text-muted">{text}</p>
          </div>
          <Link
            to={href}
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold transition hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            {t.cta.learn}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
