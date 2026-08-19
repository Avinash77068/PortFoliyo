import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion vocabulary. One easing curve and one distance keeps every
 * entrance on the page feeling like part of the same system.
 */
export const EASE_OUT: Transition["ease"] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

/** Parent wrapper that walks its children in one after another. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Viewport config for scroll reveals: fire once, slightly before fully in view. */
export const revealViewport = { once: true, margin: "-80px" } as const;
