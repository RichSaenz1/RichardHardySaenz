import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import type { ImageAsset } from "../../data/images";
import { useLanguage } from "../../i18n/LanguageContext";
import { cn } from "../../lib/cn";

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
        "luxury-shell site-hero isolate min-h-[66vh] px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-28 lg:pt-40",
        className,
      )}
    >
      {image && (
        <img
          src={image.src}
          alt=""
          aria-hidden="true"
          className={cn(
            "absolute -right-[62%] top-[11%] z-0 h-[108%] w-[168%] object-cover object-[76%_54%] opacity-[0.3] sm:-right-[24%] sm:top-[8%] sm:w-[128%] sm:opacity-[0.48] md:-right-[17%] md:w-[120%] lg:-right-[12%] lg:top-[7%] lg:h-[110%] lg:w-[116%] lg:opacity-[0.64] xl:-right-[13%] xl:top-[8%]",
            imageClassName,
          )}
          loading="eager"
          decoding="async"
        />
      )}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(245,247,249,1)_0%,rgba(255,255,255,0.98)_48%,rgba(255,255,255,0.78)_76%,rgba(224,238,247,0.28)_100%)] sm:bg-[linear-gradient(90deg,rgba(245,247,249,0.99)_0%,rgba(255,255,255,0.94)_40%,rgba(255,255,255,0.68)_63%,rgba(224,238,247,0.2)_100%)]" />
      <div className="relative z-20 mx-auto max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { y: 18 }}
          animate={reduceMotion ? undefined : { y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="min-w-0 max-w-4xl"
        >
          <p className="site-hero-eyebrow mb-5">
            {eyebrow ?? t.brand.platform}
          </p>
          <h1 className="site-hero-title max-w-5xl font-heading text-navy text-balance">
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
          {actions && <div className="mt-10 flex flex-wrap gap-3">{actions}</div>}
        </motion.div>
      </div>
    </section>
  );
}
