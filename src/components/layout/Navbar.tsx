"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { SocialIconLink } from "@/components/ui/SocialIconLink";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { navItems, sectionIds } from "@/data/navigation";
import { profile } from "@/data/profile";
import { links } from "@/data/site";
import { socialLinks } from "@/data/social";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const iconLinks = socialLinks.filter((link) => link.platform !== "email");

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0]);
  const { scrollYProgress, scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12);
  });

  // Highlight the section currently occupying the upper half of the viewport.
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock the page behind the mobile sheet and allow Escape to dismiss it.
  useEffect(() => {
    if (!menuOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-border"
          : "border-b border-transparent bg-transparent",
      )}
    >
      {/* Reading progress: purely decorative, so it stays out of the a11y tree. */}
      <motion.div
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent/70"
      />

      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:h-18 sm:px-8"
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="text-[17px] font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
        >
          {profile.logo}
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");

            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-accent-tint ring-1 ring-accent/20 ring-inset"
                      transition={{ duration: 0.32, ease: EASE_OUT }}
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            {iconLinks.map((link) => (
              <SocialIconLink key={link.platform} link={link} />
            ))}
          </div>

          <ThemeToggle />

          <Button
            href={links.resume}
            size="sm"
            className="hidden sm:inline-flex"
          >
            Resume
          </Button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-accent/45 hover:text-accent lg:hidden"
          >
            {menuOpen ? (
              <X aria-hidden className="h-[18px] w-[18px]" />
            ) : (
              <Menu aria-hidden className="h-[18px] w-[18px]" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: EASE_OUT }}
            className="glass border-b border-border lg:hidden"
          >
            <ul className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 pt-2 pb-5 sm:px-8">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.28,
                    delay: 0.04 + index * 0.045,
                    ease: EASE_OUT,
                  }}
                >
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium text-muted transition-colors hover:bg-accent-tint hover:text-accent"
                  >
                    {item.label}
                    <span aria-hidden className="font-mono text-[11px] text-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </a>
                </motion.li>
              ))}

              <li className="mt-3 flex items-center gap-2 border-t border-border pt-4">
                {iconLinks.map((link) => (
                  <SocialIconLink key={link.platform} link={link} />
                ))}
                <Button
                  href={links.resume}
                  size="sm"
                  className="ml-auto"
                  onClick={closeMenu}
                >
                  Resume
                </Button>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
