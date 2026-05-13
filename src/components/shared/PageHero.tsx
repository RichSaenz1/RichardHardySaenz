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
        "luxury-shell relative overflow-hidden bg-mist bg-clinic-radial px-6 pb-16 pt-32 sm:px-10 lg:px-[60px] lg:pb-[120px] lg:pt-40 xl:px-20",
        className,
      )}
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-borderblue" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1fr]">
        <motion.div
          initial={reduceMotion ? false : { y: 18 }}
          animate={reduceMotion ? undefined : { y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="mb-5 text-eyebrow uppercase text-medical">
            {eyebrow ?? t.brand.platform}
          </p>
          <h1 className="max-w-5xl font-heading text-display text-navy text-balance max-sm:text-[36px]">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-body-lg text-muted">
            {subtitle}
          </p>
          {intro && (
            <p className="mt-5 max-w-2xl text-body text-muted">
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
              className="h-[340px] rounded-panel lg:h-[500px]"
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
