import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages & Frameworks",
    description: "What I build product surfaces and APIs with.",
    skills: [
      { name: "React.js", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Express.js", icon: "express" },
    ],
  },
  {
    title: "Styling",
    description: "Design systems, layout and responsive UI.",
    skills: [
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "SCSS", icon: "sass" },
      { name: "Bootstrap", icon: "bootstrap" },
    ],
  },
  {
    title: "Database & Tools",
    description: "Data, version control and day-to-day workflow.",
    skills: [
      { name: "MongoDB", icon: "mongodb" },
      { name: "MySQL", icon: "mysql" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Bitbucket", icon: "bitbucket" },
      { name: "Swagger", icon: "swagger" },
      { name: "Postman", icon: "postman" },
    ],
  },
];

/** Flat list used by the hero marquee and the resume page. */
export const allSkills = skillGroups.flatMap((group) => group.skills);
