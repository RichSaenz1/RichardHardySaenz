import { ShieldCheck } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";

export function TrustStrip() {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Áreas de atención">
      {siteConfig.trustStrip.map((item) => (
        <span
          key={item}
          className="inline-flex items-center gap-2 rounded-full border border-borderblue bg-white px-3 py-2 text-xs font-medium text-navy shadow-sm"
        >
          <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5 text-cyan" />
          {item}
        </span>
      ))}
    </div>
  );
}
