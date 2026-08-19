import type { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    company: "PromptHire.ai",
    companyUrl: "https://prompthire.ai",
    role: "SDE-1 (Frontend Developer)",
    period: "Feb 2025 – Present",
    location: "Noida, India",
    current: true,
    summary:
      "Own the frontend of a production car-rental platform and its internal admin tooling, end to end.",
    highlights: [
      "Developed and launched the complete Revv.co.in website using Next.js, React.js and TypeScript.",
      "Architected and managed a comprehensive Admin Dashboard for Revv.co.in.",
      "Implemented role-based authentication and real-time data visualization.",
      "Improved SEO performance and page rendering speed by migrating legacy components to Next.js.",
      "Collaborated on full-stack features using Node.js, Express.js and MongoDB.",
    ],
    stack: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
  },
  {
    company: "Ubiqc Innovation Software Pvt. Ltd.",
    role: "Frontend Developer Intern",
    period: "Jun 2024 – Feb 2025",
    location: "India",
    current: false,
    summary:
      "Built the component foundations behind several client-facing React applications.",
    highlights: [
      "Engineered responsive web applications using React.js and modern JavaScript.",
      "Built modular and reusable UI components.",
      "Improved development velocity and code consistency through reusable components.",
    ],
    stack: ["React.js", "JavaScript", "SCSS", "Bootstrap", "Git"],
  },
];
