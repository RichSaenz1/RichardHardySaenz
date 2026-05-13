import {
  Bot,
  CalendarDays,
  CheckCircle2,
  MessageCircle,
  Send,
  ShieldAlert,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { concernFromPath, intakeFlow } from "../data/intakeFlow";
import { useLanguage } from "../i18n/LanguageContext";
import { cn } from "../lib/cn";
import type { IntakeLead, LeadSummary, PatientConcern } from "../types/intake";
import { generateLeadSummary } from "../utils/leadSummary";
import { hasUrgentLanguage } from "../utils/medicalSafety";
import { trackEvent } from "../utils/analytics";
import { createWhatsAppLink } from "../utils/whatsapp";

type AssistantDrawerProps = {
  open: boolean;
  onClose: () => void;
};

type AssistantFormValues = {
  name: string;
  phone: string;
  email: string;
  preferredTime: string;
  isFirstVisit: "" | "yes" | "no";
  hasStudies: "" | "yes" | "no";
  studyTypes: string;
  message: string;
  consentAccepted: boolean;
};

const emptyValues: AssistantFormValues = {
  name: "",
  phone: "",
  email: "",
  preferredTime: "",
  isFirstVisit: "",
  hasStudies: "",
  studyTypes: "",
  message: "",
  consentAccepted: false,
};

type AssistantErrors = Partial<Record<keyof AssistantFormValues, string>>;

export function AssistantDrawer({ open, onClose }: AssistantDrawerProps) {
  const { language, t } = useLanguage();
  const location = useLocation();
  const flow = intakeFlow[language];
  const [concern, setConcern] = useState<PatientConcern>(() =>
    concernFromPath(location.pathname),
  );
  const [values, setValues] = useState<AssistantFormValues>(emptyValues);
  const [errors, setErrors] = useState<AssistantErrors>({});
  const [summary, setSummary] = useState<LeadSummary | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      setConcern(concernFromPath(location.pathname));
    }
  }, [location.pathname, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function closeAndRestoreFocus() {
      onClose();
      requestAnimationFrame(() => {
        previouslyFocusedRef.current?.focus();
      });
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeAndRestoreFocus();
      }

      if (event.key === "Tab" && drawerRef.current) {
        trapFocus(event, drawerRef.current);
      }
    }

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  const selectedConcern = flow.concerns[concern];
  const urgentFlag = useMemo(
    () =>
      hasUrgentLanguage(
        [
          values.message,
          values.studyTypes,
          values.preferredTime,
          selectedConcern.safeResponse,
        ],
        language,
      ),
    [language, selectedConcern.safeResponse, values.message, values.preferredTime, values.studyTypes],
  );

  const lead = useMemo(
    () =>
      buildLead({
        values,
        concern,
        language,
        sourcePage: location.pathname,
        urgentFlag,
      }),
    [concern, language, location.pathname, urgentFlag, values],
  );

  const whatsappHref = useMemo(
    () =>
      createWhatsAppLink({
        language,
        sourcePage: location.pathname,
        concern,
        leadData: summary ? lead : undefined,
      }),
    [concern, language, lead, location.pathname, summary],
  );

  function selectConcern(nextConcern: PatientConcern) {
    setConcern(nextConcern);
    setSummary(null);
    setErrors({});
    trackEvent("assistant_concern_selected", {
      concern: nextConcern,
      path: location.pathname,
    });
  }

  function updateField(
    field: keyof AssistantFormValues,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const value =
      field === "consentAccepted"
        ? (event.target as HTMLInputElement).checked
        : event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSummary(null);
  }

  function validate() {
    const nextErrors: AssistantErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = flow.validation.required;
    }

    if (!isValidPhone(values.phone)) {
      nextErrors.phone = flow.validation.phone;
    }

    if (values.email.trim() && !isValidEmail(values.email)) {
      nextErrors.email = flow.validation.email;
    }

    if (!values.consentAccepted) {
      nextErrors.consentAccepted = flow.validation.consent;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function prepareSummary() {
    if (!validate()) {
      return;
    }

    setSummary(generateLeadSummary(lead, language));
  }

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[70] bg-navy/24 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="assistant-title"
    >
      <div
        className="absolute inset-x-3 bottom-3 max-h-[calc(100vh-1.5rem)] overflow-y-auto rounded-[1.65rem] border border-white/70 bg-white shadow-[0_30px_100px_rgba(6,27,51,0.22)] md:bottom-5 md:left-auto md:right-5 md:top-5 md:w-[min(31rem,calc(100vw-2.5rem))]"
        ref={drawerRef}
      >
        <div className="sticky top-0 z-10 border-b border-white/20 bg-navy px-5 py-4 text-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/12 text-cyan">
                <Bot aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <h2 id="assistant-title" className="text-base font-semibold">
                  {flow.assistantTitle}
                </h2>
                <p className="mt-1 text-xs leading-5 text-blue-100">
                  {flow.diagnosticDisclaimer}
                </p>
              </div>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => {
                onClose();
                requestAnimationFrame(() => {
                  previouslyFocusedRef.current?.focus();
                });
              }}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
              aria-label={t.home.floating.closeAssistant}
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-b from-softblue/75 to-white p-5">
          <div className="rounded-[1.35rem] bg-white/70 p-4 shadow-sm">
            <div className="max-w-[92%] rounded-2xl rounded-tl-sm bg-white p-4 text-sm leading-7 text-navy shadow-sm">
              {flow.openingMessage}
            </div>
            <div className="ml-auto mt-3 max-w-[92%] rounded-2xl rounded-tr-sm bg-navy p-4 text-sm leading-7 text-white shadow-sm">
              {flow.responsePrompt}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {flow.quickActions.map((action) => (
              <button
                key={action.concern}
                type="button"
                onClick={() => selectConcern(action.concern)}
                className={cn(
                  "rounded-full border px-3 py-2 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
                  concern === action.concern
                    ? "border-gold bg-white text-navy shadow-sm"
                    : "border-borderblue bg-white/78 text-muted hover:border-cyan hover:text-navy",
                )}
              >
                {action.label}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-[1.25rem] border border-borderblue bg-white/82 p-4">
            <p className="text-sm font-semibold text-navy">
              {selectedConcern.label}
            </p>
            <p className="mt-2 text-sm leading-7 text-muted">
              {selectedConcern.safeResponse}
            </p>
            <p className="mt-3 rounded-2xl bg-softblue/65 px-4 py-3 text-xs leading-6 text-muted">
              {selectedConcern.intakePrompt}
            </p>
          </div>

          {(urgentFlag || selectedConcern.emergencyWarning) && (
            <div className="mt-4 flex gap-3 rounded-2xl border border-amber-100 bg-amber-50/85 p-4 text-xs leading-5 text-muted">
              <ShieldAlert
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 flex-none text-amber-600"
              />
              <p>{flow.urgentGuidance}</p>
            </div>
          )}

          <div className="mt-4 grid gap-3">
            <AssistantField
              label={flow.fields.name}
              id="assistant-name"
              error={errors.name}
              required
            >
              <input
                id="assistant-name"
                value={values.name}
                onChange={(event) => updateField("name", event)}
                placeholder={flow.placeholders.name}
                className={fieldClass(Boolean(errors.name))}
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "assistant-name-error" : undefined}
              />
            </AssistantField>

            <div className="grid gap-3 sm:grid-cols-2">
              <AssistantField
                label={flow.fields.phone}
                id="assistant-phone"
                error={errors.phone}
                required
              >
                <input
                  id="assistant-phone"
                  value={values.phone}
                  onChange={(event) => updateField("phone", event)}
                  placeholder={flow.placeholders.phone}
                  className={fieldClass(Boolean(errors.phone))}
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "assistant-phone-error" : undefined}
                />
              </AssistantField>
              <AssistantField
                label={flow.fields.email}
                id="assistant-email"
                error={errors.email}
              >
                <input
                  id="assistant-email"
                  type="email"
                  value={values.email}
                  onChange={(event) => updateField("email", event)}
                  placeholder={flow.placeholders.email}
                  className={fieldClass(Boolean(errors.email))}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "assistant-email-error" : undefined}
                />
              </AssistantField>
            </div>

            <textarea
              value={values.message}
              onChange={(event) => updateField("message", event)}
              placeholder={flow.placeholders.message}
              className="min-h-24 resize-y rounded-xl border border-borderblue bg-white/90 px-4 py-3 text-sm text-navy outline-none transition placeholder:text-slate-400 focus:border-medical focus:ring-4 focus:ring-softblue"
              aria-label={flow.fields.message}
            />

            <div className="grid gap-3 sm:grid-cols-2">
              <select
                value={values.isFirstVisit}
                onChange={(event) => updateField("isFirstVisit", event)}
                className="min-h-11 rounded-xl border border-borderblue bg-white/90 px-4 text-sm text-navy outline-none transition focus:border-medical focus:ring-4 focus:ring-softblue"
                aria-label={flow.fields.isFirstVisit}
              >
                <option value="">{flow.fields.isFirstVisit}</option>
                <option value="yes">{flow.options.yes}</option>
                <option value="no">{flow.options.no}</option>
              </select>
              <select
                value={values.hasStudies}
                onChange={(event) => updateField("hasStudies", event)}
                className="min-h-11 rounded-xl border border-borderblue bg-white/90 px-4 text-sm text-navy outline-none transition focus:border-medical focus:ring-4 focus:ring-softblue"
                aria-label={flow.fields.hasStudies}
              >
                <option value="">{flow.fields.hasStudies}</option>
                <option value="yes">{flow.options.yes}</option>
                <option value="no">{flow.options.no}</option>
              </select>
            </div>

            <input
              value={values.preferredTime}
              onChange={(event) => updateField("preferredTime", event)}
              placeholder={flow.placeholders.preferredTime}
              className="min-h-11 rounded-xl border border-borderblue bg-white/90 px-4 text-sm text-navy outline-none transition placeholder:text-slate-400 focus:border-medical focus:ring-4 focus:ring-softblue"
              aria-label={flow.fields.preferredTime}
            />
            <input
              value={values.studyTypes}
              onChange={(event) => updateField("studyTypes", event)}
              placeholder={flow.placeholders.studyTypes}
              className="min-h-11 rounded-xl border border-borderblue bg-white/90 px-4 text-sm text-navy outline-none transition placeholder:text-slate-400 focus:border-medical focus:ring-4 focus:ring-softblue"
              aria-label={flow.fields.studyTypes}
            />
          </div>

          <label className="mt-4 flex cursor-pointer gap-3 rounded-2xl border border-borderblue bg-white/80 p-4 text-xs leading-6 text-muted transition hover:border-medical">
            <input
              type="checkbox"
              checked={values.consentAccepted}
              onChange={(event) => updateField("consentAccepted", event)}
              className="mt-1 h-4 w-4 rounded border-borderblue text-medical focus:ring-cyan"
              aria-invalid={Boolean(errors.consentAccepted)}
              aria-describedby={
                errors.consentAccepted ? "assistant-consent-error" : undefined
              }
            />
            <span>
              {flow.fields.consent}
              {errors.consentAccepted && (
                <span
                  id="assistant-consent-error"
                  className="mt-2 block font-semibold text-red-600"
                >
                  {errors.consentAccepted}
                </span>
              )}
            </span>
          </label>

          {summary && (
            <div className="mt-4 rounded-2xl border border-borderblue bg-white/88 p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 flex-none text-cyan"
                />
                <div>
                  <p className="text-sm font-semibold text-navy">
                    {urgentFlag ? flow.summary.urgentTitle : flow.summary.title}
                  </p>
                  <p className="mt-2 text-xs leading-6 text-muted">
                    {urgentFlag ? flow.summary.urgentBody : flow.summary.body}
                  </p>
                  <p className="mt-2 text-xs leading-6 text-muted">
                    {summary.summaryText}
                  </p>
                  <p className="mt-2 text-xs font-semibold leading-6 text-navy">
                    {summary.recommendedNextAction}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            <button
              type="button"
              onClick={prepareSummary}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-borderblue bg-white px-4 py-3 text-sm font-semibold text-navy shadow-sm transition hover:-translate-y-0.5 hover:border-medical hover:bg-softblue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              {flow.summary.prepare}
            </button>
            <Link
              to="/agendar-cita"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-navy px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-navy-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              {flow.summary.book}
              <CalendarDays aria-hidden="true" className="h-4 w-4" />
            </Link>
            <a
              href={whatsappHref}
              onClick={(event) => {
                if (!summary) {
                  event.preventDefault();
                  prepareSummary();
                } else {
                  trackEvent("whatsapp_click", {
                    source: "assistant_summary",
                    concern,
                    path: location.pathname,
                  });
                }
              }}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-borderblue bg-white px-4 py-3 text-sm font-semibold text-navy shadow-sm transition hover:-translate-y-0.5 hover:border-medical hover:bg-softblue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              {flow.summary.sendWhatsapp}
              <Send aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function trapFocus(event: KeyboardEvent, container: HTMLElement) {
  const focusable = Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute("disabled"));

  if (!focusable.length) {
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function buildLead({
  values,
  concern,
  language,
  sourcePage,
  urgentFlag,
}: {
  values: AssistantFormValues;
  concern: PatientConcern;
  language: "es" | "en";
  sourcePage: string;
  urgentFlag: boolean;
}): IntakeLead {
  return {
    name: values.name.trim(),
    phone: values.phone.trim(),
    email: values.email.trim(),
    concern,
    preferredTime: values.preferredTime.trim(),
    isFirstVisit: parseBoolean(values.isFirstVisit),
    hasStudies: parseBoolean(values.hasStudies),
    studyTypes: values.studyTypes
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    message: values.message.trim(),
    language,
    sourcePage,
    createdAt: new Date().toISOString(),
    urgentFlag,
    consentAccepted: values.consentAccepted,
  };
}

function parseBoolean(value: "" | "yes" | "no") {
  if (value === "yes") {
    return true;
  }

  if (value === "no") {
    return false;
  }

  return null;
}

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function fieldClass(hasError: boolean) {
  return cn(
    "min-h-11 w-full rounded-xl border border-borderblue bg-white/90 px-4 text-sm text-navy outline-none transition placeholder:text-slate-400 focus:border-medical focus:ring-4 focus:ring-softblue",
    hasError && "border-red-300 focus:border-red-400 focus:ring-red-100",
  );
}

function AssistantField({
  label,
  id,
  children,
  error,
  required = false,
}: {
  label: string;
  id: string;
  children: ReactNode;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy"
      >
        {label}
        {required && <span className="text-medical"> *</span>}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
