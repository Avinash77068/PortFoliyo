/**
 * Minimal class-name joiner. Keeps the dependency list short — `clsx` and
 * `tailwind-merge` would earn their place only once conditional class
 * *conflicts* appear, which they do not here.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/** True for anything that should open in a new tab. */
export function isExternalHref(href: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(href);
}

const RELATIVE_UNITS: Array<[Intl.RelativeTimeFormatUnit, number]> = [
  ["year", 365 * 24 * 60 * 60 * 1000],
  ["month", 30 * 24 * 60 * 60 * 1000],
  ["week", 7 * 24 * 60 * 60 * 1000],
  ["day", 24 * 60 * 60 * 1000],
  ["hour", 60 * 60 * 1000],
];

/**
 * "3 months ago" style label. Formatted on the server with an explicit locale
 * so the server and client agree and no hydration mismatch is possible.
 */
export function formatRelativeTime(
  isoDate: string,
  now: number = Date.now(),
): string {
  const elapsed = new Date(isoDate).getTime() - now;
  const formatter = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });

  for (const [unit, ms] of RELATIVE_UNITS) {
    if (Math.abs(elapsed) >= ms) {
      return formatter.format(Math.round(elapsed / ms), unit);
    }
  }

  return "just now";
}

/** "October 2023" from an ISO timestamp, locale-pinned for the same reason. */
export function formatMonthYear(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}
