import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CalendarDays, ChevronDown, Menu, X } from "lucide-react";
import { optionalImages } from "../../data/images";
import {
  specialtyRouteByKey,
  type SpecialtyKey,
} from "../../i18n/translations";
import { useLanguage } from "../../i18n/LanguageContext";
import {
  procedureNavigationKeys,
  procedurePages,
  procedureRoutes,
} from "../../i18n/procedurePages";
import { cn } from "../../lib/cn";
import { CTAButton } from "../shared/CTAButton";
import { LanguageToggle } from "../shared/LanguageToggle";
import { OptionalImage } from "../shared/OptionalImage";

type DropdownId = "specialties" | "procedures";

type DropdownItem = {
  key: string;
  href: string;
  title: string;
  description: string;
};

type HeaderDropdownProps = {
  id: DropdownId;
  label: string;
  intro: string;
  hint: string;
  href: string;
  items: DropdownItem[];
  isActive: boolean;
  isOpen: boolean;
  onOpenChange: (id: DropdownId | null) => void;
};

const specialtyKeys: SpecialtyKey[] = [
  "prostata",
  "calculosRenales",
  "uroOncologia",
  "endourologia",
  "cirugiaLaparoscopica",
  "saludMasculina",
  "segundaOpinion",
];

function HeaderDropdown({
  id,
  label,
  intro,
  hint,
  href,
  items,
  isActive,
  isOpen,
  onOpenChange,
}: HeaderDropdownProps) {
  return (
    <div
      className="relative"
      onMouseEnter={() => onOpenChange(id)}
      onMouseLeave={() => onOpenChange(null)}
    >
      <button
        type="button"
        onClick={() => onOpenChange(isOpen ? null : id)}
        onFocus={() => onOpenChange(id)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            onOpenChange(null);
          }

          if (event.key === "ArrowDown") {
            event.preventDefault();
            onOpenChange(id);
          }
        }}
        className={cn(
          "group relative inline-flex items-center gap-1.5 px-0 py-3 text-[14.5px] font-medium tracking-[-0.01em] text-muted transition hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan",
          isActive && "text-navy",
        )}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-3.5 w-3.5 transition duration-200",
            isOpen && "rotate-180",
          )}
        />
        <span
          className={cn(
            "absolute -bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-medical opacity-0 transition duration-200 group-hover:opacity-70",
            isActive && "opacity-100 group-hover:opacity-100",
          )}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              onOpenChange(null);
            }
          }}
          className="absolute left-1/2 top-full mt-4 w-[min(680px,calc(100vw-2rem))] -translate-x-1/2 rounded-[1.6rem] border border-navy/10 bg-white p-5 shadow-[0_28px_80px_rgba(13,43,69,0.14)] backdrop-blur-2xl"
        >
          <div className="mb-4 flex items-end justify-between gap-5 px-1">
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-medical">
                {intro}
              </p>
              <p className="mt-1 text-sm leading-5 text-muted">{hint}</p>
            </div>
            <Link
              to={href}
              role="menuitem"
              className="shrink-0 text-xs font-medium text-navy underline decoration-medical/70 underline-offset-4 transition hover:text-medical focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
            >
              {label}
            </Link>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {items.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                role="menuitem"
                className="group rounded-[1.05rem] px-3.5 py-3 transition hover:bg-softblue/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-navy">
                    {item.title}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-medical opacity-0 transition group-hover:opacity-100" />
                </span>
                <span className="mt-1 block truncate text-xs leading-5 text-muted">
                  {item.description}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownId | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const location = useLocation();
  const { language, t } = useLanguage();
  const procedureCopy = procedurePages[language] ?? procedurePages.es;

  const specialtyRoutes = useMemo(
    () =>
      new Set([
        "/especialidades",
        ...specialtyKeys
          .filter((key) => key !== "segundaOpinion")
          .map((key) => specialtyRouteByKey[key]),
      ]),
    [],
  );
  const isSpecialtiesActive = specialtyRoutes.has(location.pathname);
  const procedureRoutesSet = useMemo(
    () => new Set(Object.values(procedureRoutes)),
    [],
  );
  const isProceduresActive = procedureRoutesSet.has(location.pathname);

  const specialtyDropdownItems: DropdownItem[] = specialtyKeys.map((key) => ({
    key,
    href: specialtyRouteByKey[key],
    title: t.specialties[key].title,
    description: t.specialties[key].subtitle,
  }));

  const procedureDropdownItems: DropdownItem[] = procedureNavigationKeys.map((key) => {
    const procedure = procedureCopy[key] ?? procedurePages.es[key];

    return {
      key,
      href: procedureRoutes[key],
      title: procedure.title,
      description: procedure.cardText,
    };
  });

  const mainNav = [
    t.header.nav.home,
    t.header.nav.specialties,
    t.header.nav.procedures,
    t.header.nav.secondOpinion,
    t.header.nav.contact,
  ];

  const mobilePrimaryNav = [
    t.header.nav.home,
    t.header.nav.secondOpinion,
    t.header.nav.contact,
  ];

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 18);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const logoFallback = (
      <div className="flex min-w-0 items-center gap-3">
      <div className="relative grid h-9 w-9 flex-none place-items-center rounded-full border border-navy/10 bg-white/65 text-navy shadow-[0_12px_30px_rgba(13,43,69,0.055)] backdrop-blur">
        <span className="font-heading text-[22px] leading-none tracking-[-0.05em]">
          U
        </span>
        <span className="absolute -right-0.5 top-2 h-3.5 w-px rounded-full bg-medical/70" />
      </div>
      <div className="min-w-0 leading-none">
        <p className="truncate text-[15px] font-medium tracking-[-0.01em] text-navy">
          {t.brand.doctor}
        </p>
        <p className="mt-2 truncate text-[10.5px] font-medium uppercase tracking-[0.14em] text-medical/80">
          {t.brand.platform}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background,border-color,box-shadow] duration-300",
          isScrolled
            ? "border-navy/10 bg-white/90 shadow-[0_12px_40px_rgba(13,43,69,0.06)] backdrop-blur-[22px]"
            : "border-navy/5 bg-mist/70 backdrop-blur-[18px]",
        )}
      >
        <div className="relative mx-auto grid h-[76px] max-w-[1440px] grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-5 xl:h-[86px] xl:grid-cols-[minmax(250px,1fr)_auto_minmax(250px,1fr)] xl:px-10">
          <NavLink
            to="/"
            aria-label={t.header.homeLabel}
            className="flex min-w-0 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
          >
            <OptionalImage
              src={optionalImages.doctorLogo.src}
              alt={optionalImages.doctorLogo.alt}
              className="h-11 max-w-[230px] object-contain"
              fallback={
                <OptionalImage
                  src={optionalImages.uropanamaLogo.src}
                  alt={optionalImages.uropanamaLogo.alt}
                  className="h-11 max-w-[220px] object-contain"
                  fallback={logoFallback}
                />
              }
            />
          </NavLink>

          <nav
            className="hidden items-center justify-center gap-8 xl:flex"
            aria-label={t.header.navLabel}
          >
            {mainNav.map((item) => {
              if (item.href === t.header.nav.specialties.href) {
                return (
                  <HeaderDropdown
                    key={item.href}
                    id="specialties"
                    label={item.label}
                    intro={t.header.specialtiesIntro}
                    hint={t.header.specialtiesHint}
                    href={item.href}
                    items={specialtyDropdownItems}
                    isActive={isSpecialtiesActive}
                    isOpen={openDropdown === "specialties"}
                    onOpenChange={setOpenDropdown}
                  />
                );
              }

              if (item.href === t.header.nav.procedures.href) {
                return (
                  <HeaderDropdown
                    key={item.href}
                    id="procedures"
                    label={item.label}
                    intro={t.header.proceduresIntro}
                    hint={t.header.proceduresHint}
                    href={item.href}
                    items={procedureDropdownItems}
                    isActive={isProceduresActive}
                    isOpen={openDropdown === "procedures"}
                    onOpenChange={setOpenDropdown}
                  />
                );
              }

              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "group relative py-3 text-[14.5px] font-medium tracking-[-0.01em] text-muted transition hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan",
                      isActive && "text-navy",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        className={cn(
                          "absolute -bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-medical opacity-0 transition duration-200 group-hover:opacity-70",
                          isActive && "opacity-100 group-hover:opacity-100",
                        )}
                      />
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="hidden items-center justify-end gap-3 xl:flex">
            <LanguageToggle />
            <CTAButton
              to="/agendar-cita"
              icon={<CalendarDays aria-hidden="true" className="h-4 w-4" />}
              className="min-h-0 h-11 px-5 py-0 text-[14px] shadow-[0_10px_30px_rgba(13,43,69,0.12)]"
            >
              {t.cta.book}
            </CTAButton>
          </div>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center justify-self-end rounded-full border border-navy/10 bg-white/70 text-navy shadow-[0_12px_32px_rgba(13,43,69,0.075)] backdrop-blur transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan xl:hidden"
            onClick={() => setIsOpen((value) => !value)}
            aria-expanded={isOpen}
            aria-label={isOpen ? t.header.closeMenu : t.header.openMenu}
          >
            {isOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 top-[76px] z-40 overflow-y-auto border-t border-navy/5 bg-mist/95 px-4 py-6 shadow-[0_28px_90px_rgba(13,43,69,0.16)] backdrop-blur-2xl xl:hidden">
          <nav
            className="mx-auto max-w-[35rem]"
            aria-label={t.header.mobileNavLabel}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="font-heading text-4xl leading-none tracking-[-0.03em] text-navy">
                  {t.header.menuTitle}
                </p>
                <p className="mt-2 max-w-[18rem] text-xs font-medium uppercase tracking-[0.14em] text-medical">
                  {t.brand.doctor}
                </p>
              </div>
              <LanguageToggle />
            </div>

            <div className="grid gap-1">
              {mobilePrimaryNav.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-2xl px-4 py-3 text-base font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
                      isActive
                        ? "bg-white text-navy shadow-sm"
                        : "text-muted hover:bg-white/75 hover:text-navy",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="mt-6 rounded-[1.45rem] border border-navy/10 bg-white/75 p-4 shadow-[0_18px_46px_rgba(13,43,69,0.075)] backdrop-blur">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-medical">
                {t.header.specialtiesIntro}
              </p>
              <div className="mt-3 grid gap-1">
                {specialtyDropdownItems.map((item) => (
                  <Link
                    key={item.key}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm font-medium text-navy transition hover:bg-softblue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-[1.45rem] border border-navy/10 bg-white/75 p-4 shadow-[0_18px_46px_rgba(13,43,69,0.075)] backdrop-blur">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-medical">
                {t.header.proceduresIntro}
              </p>
              <div className="mt-3 grid gap-1">
                {procedureDropdownItems.map((item) => (
                  <Link
                    key={item.key}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm font-medium text-navy transition hover:bg-softblue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <p className="mt-5 rounded-2xl border border-borderblue bg-white/60 px-4 py-3 text-sm leading-6 text-muted">
              {t.home.hero.microcopy}
            </p>

            <div className="mt-5">
              <CTAButton
                to="/agendar-cita"
                className="w-full"
                icon={<CalendarDays aria-hidden="true" className="h-4 w-4" />}
              >
                {t.cta.book}
              </CTAButton>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
