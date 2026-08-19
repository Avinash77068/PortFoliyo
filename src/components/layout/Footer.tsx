import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SocialIconLink } from "@/components/ui/SocialIconLink";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/social";

const YEAR = 2026;

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-subtle">
      <Container className="py-12 sm:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="text-[17px] font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
            >
              {profile.logo}
            </Link>
            <p className="mt-3 text-sm text-muted">
              Frontend Developer • React • Next.js • TypeScript
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map((link) => (
                <SocialIconLink key={link.platform} link={link} />
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="lg:pt-1">
            <h2 className="font-mono text-[11px] tracking-[0.16em] text-subtle uppercase">
              Navigate
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-subtle">
            © {YEAR} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] tracking-tight text-subtle">
            Built with Next.js, TypeScript &amp; Tailwind CSS
          </p>
        </div>
      </Container>
    </footer>
  );
}
