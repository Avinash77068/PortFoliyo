import { Braces, Layers, Rocket } from "lucide-react";

import type { ProfileHighlight } from "@/types";

export const profile = {
  name: "Avinash Shrivastav",
  firstName: "Avinash",
  /** Wordmark used in the navbar and footer. */
  logo: "Avinash.",
  role: "Frontend Developer",
  seniority: "SDE-1",
  experience: "1.4+ years",
  location: "Noida, Uttar Pradesh, India",
  availability: "Available for Frontend / Full Stack Opportunities",
  photo: "/profile.jpg",

  headline: {
    lead: "Frontend Developer building",
    /** Rendered with the accent gradient. */
    accent: "fast, scalable",
    trail: "and exceptional web experiences.",
  },

  summary:
    "Frontend Developer with 1.4+ years of experience building scalable, high-performance web applications using React.js, Next.js, TypeScript and modern JavaScript.",

  about: [
    "I am a Frontend Developer with 1.4+ years of experience building scalable, high-performance web applications. I specialize in React.js, Next.js, TypeScript and modern JavaScript.",
    "I have experience building production-ready applications, complex admin dashboards, reusable UI systems, SEO-optimized websites and full-stack features.",
  ],

  /** Short, factual answers to the questions a recruiter scans for. */
  facts: [
    { label: "Focus", value: "React · Next.js · TypeScript" },
    { label: "Also work with", value: "Node.js · Express.js · MongoDB" },
    { label: "Based in", value: "Noida, India" },
    { label: "Open to", value: "Frontend / Full Stack roles" },
  ],

  /** Not shown on the landing page — used on the print-ready resume only. */
  phone: "+91 77068 97675",
} as const;

export const profileHighlights: ProfileHighlight[] = [
  {
    label: "1.4+ Years Experience",
    detail: "Shipping production frontends since 2024.",
    icon: Rocket,
  },
  {
    label: "Production Applications",
    detail: "Live customer-facing websites and internal dashboards.",
    icon: Layers,
  },
  {
    label: "Frontend + Full Stack",
    detail: "Comfortable across the React and Node.js stack.",
    icon: Braces,
  },
];
