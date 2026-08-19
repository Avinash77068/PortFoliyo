import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "revv",
    name: "Revv.co.in",
    category: "Production Website + Admin Dashboard",
    description:
      "Full-featured production website built with Next.js, React.js and TypeScript, along with a robust Admin Dashboard for business management. Revv is a self-drive car rental and subscription platform serving customers across India.",
    highlights: [
      "Production website",
      "Admin Dashboard",
      "Role-based authentication",
      "Real-time data visualization",
      "SEO optimization",
      "Performance optimization",
    ],
    stack: ["Next.js", "React.js", "TypeScript", "Node.js", "MongoDB"],
    preview: "website",
    featured: true,
    liveUrl: "https://www.revv.co.in",
    sourceNote: "Company codebase — private",
  },
  {
    slug: "agentyuga",
    name: "AgentYuga",
    category: "Admin Dashboard",
    description:
      "Secure and scalable Admin Dashboard focused on business operations and data management.",
    highlights: [
      "Role-Based Access Control",
      "CRUD operations",
      "Advanced analytics",
      "Secure authentication",
      "Responsive dashboard",
    ],
    stack: ["React.js", "TypeScript", "Node.js", "MongoDB"],
    preview: "dashboard",
    featured: false,
    liveUrl: "https://agentyuga.com",
    sourceNote: "Company codebase — private",
  },
  {
    slug: "crypto-wallet",
    name: "Crypto Wallet",
    category: "Web3 Interface",
    description:
      "Modern cryptocurrency wallet interface with blockchain API integration and MetaMask connectivity.",
    highlights: [
      "Ethereum integration",
      "BSC API integration",
      "MetaMask connectivity",
      "Wallet interface",
      "Transaction-related UI",
    ],
    stack: ["React.js", "Ethereum", "BSC API", "MetaMask"],
    preview: "wallet",
    featured: false,
    sourceNote: "Personal project — source not public",
  },
];

export const featuredProject = projects.find((project) => project.featured);
export const otherProjects = projects.filter((project) => !project.featured);
