import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import type { BreadcrumbItem } from "../../seo/schema";

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length <= 1) {
    return null;
  }

  return (
    <nav
      className="border-b border-borderblue bg-white/72 px-4 py-3 text-xs font-medium text-muted backdrop-blur sm:px-6 lg:px-8"
      aria-label="Breadcrumb"
    >
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={`${item.href}-${item.label}`} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-borderblue"
                />
              )}
              {isCurrent ? (
                <span className="text-navy" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="inline-flex items-center gap-1.5 transition hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                >
                  {index === 0 && <Home aria-hidden="true" className="h-3.5 w-3.5" />}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
