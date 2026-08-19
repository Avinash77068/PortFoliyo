import { Mail } from "lucide-react";

import { BrandGlyph } from "@/components/ui/BrandGlyph";
import type { SocialLink } from "@/types";
import { cn } from "@/lib/utils";

type SocialIconLinkProps = {
  link: SocialLink;
  className?: string;
};

/** Icon-only social link with an accessible name. */
export function SocialIconLink({ link, className }: SocialIconLinkProps) {
  const isMail = link.href.startsWith("mailto:");

  return (
    <a
      href={link.href}
      target={isMail ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-label={link.label}
      title={link.label}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent/45 hover:bg-accent-tint hover:text-accent",
        className,
      )}
    >
      {link.icon ? (
        <BrandGlyph name={link.icon} className="h-[17px] w-[17px]" />
      ) : (
        <Mail aria-hidden className="h-[17px] w-[17px]" />
      )}
    </a>
  );
}
