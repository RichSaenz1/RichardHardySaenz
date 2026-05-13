import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ImageAsset } from "../../data/images";
type ProcedureCardProps = {
  title: string;
  text: string;
  href: string;
  image: ImageAsset;
  ctaLabel: string;
};

export function ProcedureCard({
  title,
  text,
  href,
  image,
  ctaLabel,
}: ProcedureCardProps) {
  return (
    <article className="group h-full rounded-card border border-borderblue bg-white p-6 transition duration-200 hover:-translate-y-0.5 hover:border-cyan hover:shadow-[0_4px_16px_rgba(13,43,69,0.06)]">
      <div className="grid h-full gap-5 md:grid-cols-[220px_1fr]">
        <div className="relative min-h-[200px] overflow-hidden rounded-sm bg-softblue">
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-contain object-center p-2 transition duration-700 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            sizes="(min-width: 768px) 220px, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/10 via-transparent to-white/10" />
        </div>
        <div className="flex flex-col">
          <h3 className="font-heading text-3xl leading-none text-navy">{title}</h3>
          <p className="mt-4 min-h-[6rem] flex-1 text-sm leading-7 text-muted">
            {text}
          </p>
          <Link
            to={href}
            className="mt-6 inline-flex items-center gap-2 text-button text-medical transition hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            {ctaLabel}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
