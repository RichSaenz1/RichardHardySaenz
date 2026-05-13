import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Bot, MessageCircle } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { getWhatsAppHref } from "../../lib/whatsapp";
import { trackEvent } from "../../utils/analytics";

const AssistantDrawer = lazy(() =>
  import("../AssistantDrawer").then((module) => ({
    default: module.AssistantDrawer,
  })),
);

export function FloatingActions() {
  const { language, t } = useLanguage();
  const location = useLocation();
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [actionsVisible, setActionsVisible] = useState(false);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const whatsappHref = useMemo(
    () => getWhatsAppHref(location.pathname, language),
    [language, location.pathname],
  );

  useEffect(() => {
    function openAssistant() {
      setAssistantOpen(true);
      trackEvent("assistant_open", { source: "custom_event", path: location.pathname });
    }

    window.addEventListener("uropanama:open-assistant", openAssistant);
    return () => window.removeEventListener("uropanama:open-assistant", openAssistant);
  }, [location.pathname]);

  function openAssistant(source: string, trigger?: HTMLElement | null) {
    lastFocusedElement.current =
      trigger ?? (document.activeElement as HTMLElement | null);
    setAssistantOpen(true);
    trackEvent("assistant_open", { source, path: location.pathname });
  }

  function closeAssistant() {
    setAssistantOpen(false);
    requestAnimationFrame(() => {
      lastFocusedElement.current?.focus();
    });
  }

  useEffect(() => {
    function handleScroll() {
      setActionsVisible(window.scrollY > 620);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {actionsVisible && (
        <>
          <button
            type="button"
            onClick={(event) => openAssistant("floating_mobile", event.currentTarget)}
            className="fixed bottom-24 left-4 z-40 grid h-12 w-12 place-items-center rounded-full border border-borderblue bg-white/86 text-navy shadow-[0_18px_54px_rgba(6,27,51,0.14)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan md:hidden"
            aria-label={t.home.floating.assistantLabel}
          >
            <Bot aria-hidden="true" className="h-5 w-5" />
          </button>

          <a
            href={whatsappHref}
            className="fixed bottom-24 right-4 z-40 grid h-12 w-12 place-items-center rounded-full border border-borderblue bg-white/86 text-medical shadow-[0_18px_54px_rgba(6,27,51,0.14)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan md:hidden"
            aria-label={t.home.floating.whatsappLabel}
            onClick={() => trackEvent("whatsapp_click", { path: location.pathname, source: "floating_mobile" })}
          >
            <MessageCircle aria-hidden="true" className="h-5 w-5" />
          </a>

          <div className="fixed bottom-24 left-5 z-40 hidden md:block">
            <button
              type="button"
              onClick={(event) => openAssistant("floating_desktop", event.currentTarget)}
              className="group flex h-14 items-center gap-0 rounded-full border border-borderblue bg-white/82 p-2 text-navy shadow-[0_18px_54px_rgba(6,27,51,0.12)] backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
              aria-label={t.home.floating.assistantLabel}
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-white">
                <Bot aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-28 group-hover:px-3 group-hover:opacity-100">
                {t.home.floating.assistantLabel}
              </span>
            </button>
          </div>

          <div className="fixed bottom-24 right-5 z-40 hidden md:block">
            <a
              href={whatsappHref}
              className="group flex h-14 items-center gap-0 rounded-full border border-borderblue bg-white/82 p-2 text-navy shadow-[0_18px_54px_rgba(6,27,51,0.12)] backdrop-blur transition hover:-translate-y-0.5 hover:border-navy hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
              aria-label={t.home.floating.whatsappLabel}
              onClick={() => trackEvent("whatsapp_click", { path: location.pathname, source: "floating_desktop" })}
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-medical text-white">
                <MessageCircle aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-28 group-hover:px-3 group-hover:opacity-100">
                {t.home.floating.whatsappLabel}
              </span>
            </a>
          </div>
        </>
      )}

      {assistantOpen && (
        <Suspense fallback={null}>
          <AssistantDrawer
            open={assistantOpen}
            onClose={closeAssistant}
          />
        </Suspense>
      )}
    </>
  );
}
