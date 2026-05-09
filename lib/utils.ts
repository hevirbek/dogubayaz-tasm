import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path = "") {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  return new URL(path, baseUrl).toString();
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(date));
}
