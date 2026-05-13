import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/cn";

type SectionContainerProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  dark?: boolean;
};

export function SectionContainer({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
  innerClassName,
  dark = false,
}: SectionContainerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden px-6 py-16 sm:px-10 lg:px-[60px] lg:py-[120px] xl:px-20",
        dark ? "bg-navy text-white" : "bg-white text-navy",
        className,
      )}
    >
      <motion.div
        className={cn("mx-auto max-w-7xl", innerClassName)}
        initial={reduceMotion ? false : { y: 20 }}
        whileInView={reduceMotion ? undefined : { y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        {(eyebrow || title || subtitle) && (
          <div className="mb-10 max-w-3xl">
            {eyebrow && (
              <p
                className={cn(
                  "mb-3 text-eyebrow uppercase",
                  dark ? "text-cyan" : "text-medical",
                )}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={cn(
                  "max-w-4xl font-heading text-h1 text-balance sm:text-display",
                  dark ? "text-white" : "text-navy",
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "mt-6 max-w-2xl text-body-lg",
                  dark ? "text-blue-100" : "text-muted",
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </motion.div>
    </section>
  );
}
