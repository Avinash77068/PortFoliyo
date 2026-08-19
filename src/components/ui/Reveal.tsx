"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EASE_OUT, revealViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  /** Seconds of delay, for hand-tuned sequences. */
  delay?: number;
  /** Travel distance in px; 0 gives a plain fade. */
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "span";
};

/**
 * Scroll-triggered entrance. Under `prefers-reduced-motion` the element renders
 * in its final state with no animation at all.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: 0.55, delay, ease: EASE_OUT }}
    >
      {children}
    </MotionTag>
  );
}
