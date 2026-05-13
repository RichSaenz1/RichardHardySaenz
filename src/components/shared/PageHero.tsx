import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import type { ImageAsset } from "../../data/images";
import { useLanguage } from "../../i18n/LanguageContext";
import { cn } from "../../lib/cn";
import { ImageCard } from "./ImageCard";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  intro?: string;
  image?: ImageAsset;
  imageClassName?: string;
  actions?: ReactNode;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  intro,
  image,
  imageClassName,
  actions,
  className,
}: PageHeroProps) {
  const reduceMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section
      className={cn(
        "luxury-shell relative overflow-hidden bg-mist bg-clinic-radial px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-28 lg:pt-40",
        className,
      )}
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-borderblue" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
        <motion.div
          initial={reduceMotion ? false : { y: 18 }}
          animate={reduceMotion ? undefined : { y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-medical">
            {eyebrow ?? t.brand.platform}
          </p>
          <h1 className="max-w-5xl font-heading text-6xl leading-[0.92] text-navy text-balance sm:text-7xl lg:text-[5.8rem]">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-[1.75] text-muted sm:text-xl">
            {subtitle}
          </p>
          {intro && (
            <p className="mt-5 max-w-2xl text-base leading-[1.75] text-muted">
              {intro}
            </p>
          )}
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </motion.div>

        {image && (
          <motion.div
            initial={reduceMotion ? false : { y: 14 }}
            animate={reduceMotion ? undefined : { y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
            className="min-h-[280px]"
          >
            <ImageCard
              image={image}
              className="h-[340px] rounded-[1.5rem] lg:h-[500px]"
              imageClassName={cn("object-cover", imageClassName)}
              loading="eager"
              fetchPriority="high"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
