/**
 * Single source of truth for identity, links and canonical origin.
 * Everything user-facing that could ever change lives in `src/data`.
 */

export const GITHUB_USERNAME = "Avinash77068";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aviportfoliyo.netlify.app"
).replace(/\/$/, "");

export const links = {
  github: `https://github.com/${GITHUB_USERNAME}`,
  linkedin: "https://linkedin.com/in/avinash-shrivastav-029183275/",
  email: "avinashshrivastav77068@gmail.com",
  /**
   * Points at the print-ready resume route. Swap in "/resume.pdf" (and drop the
   * file into `public/`) to serve a real PDF instead — nothing else changes.
   */
  resume: "/resume",
} as const;

export const mailto = `mailto:${links.email}`;
