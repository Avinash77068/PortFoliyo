import { Gauge, LayoutTemplate, Layers3, Server } from "lucide-react";

import type { ExpertiseItem } from "@/types";

export const expertise: ExpertiseItem[] = [
  {
    title: "Frontend Development",
    description:
      "Building scalable React and Next.js applications with reusable architecture.",
    icon: Layers3,
  },
  {
    title: "UI Engineering",
    description:
      "Creating responsive, accessible and pixel-perfect interfaces.",
    icon: LayoutTemplate,
  },
  {
    title: "Performance & SEO",
    description:
      "Optimizing rendering performance, Core Web Vitals and search visibility.",
    icon: Gauge,
  },
  {
    title: "Full Stack Development",
    description:
      "Building complete features using Node.js, Express.js and MongoDB.",
    icon: Server,
  },
];
