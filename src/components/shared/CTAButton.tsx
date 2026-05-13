import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/cn";
import {
  trackEvent,
  type AnalyticsEventName,
  type AnalyticsPayload,
} from "../../utils/analytics";

type CTAButtonProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "light";
  icon?: ReactNode;
  className?: string;
  ariaLabel?: string;
  analyticsEvent?: AnalyticsEventName;
  analyticsPayload?: AnalyticsPayload;
};

const variants = {
  primary:
    "bg-navy text-white hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(13,43,69,0.12)]",
  secondary:
    "border border-navy bg-transparent text-navy hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(13,43,69,0.12)]",
  ghost:
    "border border-navy bg-transparent text-navy hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(13,43,69,0.12)]",
  light:
    "bg-white text-navy hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(13,43,69,0.12)]",
};

export function CTAButton({
  children,
  to,
  href,
  variant = "primary",
  icon,
  className,
  ariaLabel,
  analyticsEvent,
  analyticsPayload,
}: CTAButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      {icon ?? <ArrowRight aria-hidden="true" className="h-4 w-4" />}
    </>
  );
  const classes = cn(
    "inline-flex h-11 items-center justify-center gap-2 rounded-pill px-5 text-button transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
    variants[variant],
    className,
  );
  const eventName =
    analyticsEvent ??
    (href?.includes("wa.me")
      ? "whatsapp_click"
      : (to ?? "/agendar-cita") === "/agendar-cita"
        ? "booking_cta_click"
        : undefined);

  function handleClick() {
    if (eventName) {
      trackEvent(eventName, {
        href,
        to: to ?? (!href ? "/agendar-cita" : undefined),
        ...analyticsPayload,
      });
    }
  }

  if (href) {
    return (
      <a className={classes} href={href} aria-label={ariaLabel} onClick={handleClick}>
        {content}
      </a>
    );
  }

  return (
    <Link
      className={classes}
      to={to ?? "/agendar-cita"}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {content}
    </Link>
  );
}
