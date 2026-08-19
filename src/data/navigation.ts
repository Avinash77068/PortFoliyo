import type { NavItem } from "@/types";

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

/** Section ids observed by the navbar to highlight the active link. */
export const sectionIds = navItems.map((item) => item.href.replace("#", ""));
