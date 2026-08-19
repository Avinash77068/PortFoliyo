import type { SocialLink } from "@/types";

import { links, mailto } from "./site";

export const socialLinks: SocialLink[] = [
  {
    platform: "github",
    label: "GitHub",
    href: links.github,
    icon: "github",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: links.linkedin,
    icon: "linkedin",
  },
  {
    platform: "email",
    label: "Email",
    href: mailto,
    icon: null,
  },
];
