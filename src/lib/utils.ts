import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatLocation(city?: string | null, country?: string | null) {
  const parts = [city, country].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "Location not set";
}
