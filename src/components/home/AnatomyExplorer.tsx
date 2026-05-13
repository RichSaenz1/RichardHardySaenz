import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { imageAssets, type ImageAsset } from "../../data/images";
import { useLanguage } from "../../i18n/LanguageContext";
import { cn } from "../../lib/cn";

const areaVisuals: Array<{ image: ImageAsset; crop: string }> = [
  { image: imageAssets.kidneyStones, crop: "object-[50%_48%]" },
  { image: imageAssets.ureteroscopy, crop: "object-center" },
  { image: imageAssets.cystoscopy, crop: "object-center" },
  { image: imageAssets.prostate, crop: "object-[50%_54%]" },
  { image: imageAssets.urinarySystem, crop: "object-center" },
];

export function AnatomyExplorer() {
  const { t } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = t.home.anatomy.areas[selectedIndex];
  const activeVisual = areaVisuals[selectedIndex] ?? areaVisuals[0];
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-navy px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(91,158,201,0.20),transparent_30rem),radial-gradient(circle_at_82%_18%,rgba(201,168,76,0.13),transparent_26rem),linear-gradient(135deg,#0D2B45,#0D1F2D)]" />
      <div className="absolute inset-0 bg-[url('/images/medical-background-texture.webp')] bg-cover bg-center opacity-[0.035] mix-blend-screen" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-cyan">
            {t.home.anatomy.eyebrow}
          </p>
          <h2 className="mt-4 font-heading text-display leading-[0.95] text-white text-balance sm:text-display lg:text-display">
            {t.home.anatomy.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-[1.75] text-blue-100">
            {t.home.anatomy.subtitle}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.16fr_0.84fr] lg:items-stretch">
          <div className="relative min-h-[430px] overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.05] shadow-[0_32px_100px_rgba(0,0,0,0.22)] backdrop-blur sm:min-h-[560px] lg:h-full lg:min-h-0">
            <motion.img
              key={selected.label}
              src={activeVisual.image.src}
              alt={activeVisual.image.alt}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.52, ease: "easeOut" }}
              className={cn(
                "absolute inset-0 h-full w-full object-cover saturate-[1.05] contrast-[1.03]",
                activeVisual.crop,
              )}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_44%,transparent_0,rgba(13,43,69,0.08)_42%,rgba(13,43,69,0.62)_100%)]" />
            <div className="absolute inset-x-8 bottom-8 h-px bg-gradient-to-r from-transparent via-cyan/55 to-transparent" />
          </div>

          <div className="flex h-full flex-col rounded-[2rem] border border-white/10 bg-white/[0.075] p-5 shadow-[0_24px_78px_rgba(0,0,0,0.16)] backdrop-blur lg:p-7">
            <div className="grid gap-2 sm:grid-cols-5 lg:grid-cols-1" role="tablist" aria-label={t.home.anatomy.eyebrow}>
              {t.home.anatomy.areas.map((area, index) => (
                <button
                  key={area.label}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-pressed={selectedIndex === index}
                  role="tab"
                  aria-selected={selectedIndex === index}
                  className={cn(
                    "flex min-h-11 items-center justify-between rounded-sm border px-4 py-3 text-left text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
                    selectedIndex === index
                      ? "border-gold/70 bg-white text-navy shadow-[0_14px_38px_rgba(201,168,76,0.15)]"
                      : "border-white/10 bg-white/[0.04] text-blue-100 hover:border-cyan/50 hover:bg-white/10",
                  )}
                >
                  {area.label}
                  {selectedIndex === index && (
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  )}
                </button>
              ))}
            </div>

            <motion.article
              key={selected.label}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-7"
            >
              <h3 className="font-heading text-display leading-none text-white">
                {selected.label}
              </h3>
              <p className="mt-5 max-w-xl text-base leading-8 text-blue-100">
                {selected.text}
              </p>

              <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <ListGroup
                  title={t.home.anatomy.relatedLabel}
                  items={selected.related.slice(0, 3)}
                />
                <ListGroup
                  title={t.home.anatomy.proceduresLabel}
                  items={selected.procedures.slice(0, 3)}
                />
              </div>

              <Link
                to={selected.href}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-navy transition hover:-translate-y-0.5 hover:bg-softblue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
              >
                {selected.cta}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
}

function ListGroup({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-cyan">
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-blue-100">
            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gold" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
