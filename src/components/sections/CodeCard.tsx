"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GitBranch, ShieldCheck } from "lucide-react";

import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Tone =
  | "keyword"
  | "type"
  | "property"
  | "string"
  | "number"
  | "comment"
  | "punct"
  | "plain";

type Token = { text: string; tone?: Tone };

const toneClass: Record<Tone, string> = {
  keyword: "text-code-keyword",
  type: "text-code-type",
  property: "text-code-property",
  string: "text-code-string",
  number: "text-code-number",
  comment: "text-code-comment italic",
  punct: "text-code-punct",
  plain: "text-foreground",
};

/**
 * Hand-tokenised so the card ships no syntax-highlighting runtime. The snippet
 * mirrors the real profile data, which keeps it honest rather than filler.
 */
const lines: Token[][] = [
  [
    { text: "const", tone: "keyword" },
    { text: " avinash", tone: "plain" },
    { text: ":", tone: "punct" },
    { text: " Developer", tone: "type" },
    { text: " = {", tone: "punct" },
  ],
  [
    { text: "  role", tone: "property" },
    { text: ": ", tone: "punct" },
    { text: '"Frontend Developer"', tone: "string" },
    { text: ",", tone: "punct" },
  ],
  [
    { text: "  level", tone: "property" },
    { text: ": ", tone: "punct" },
    { text: '"SDE-1"', tone: "string" },
    { text: ",", tone: "punct" },
  ],
  [
    { text: "  experience", tone: "property" },
    { text: ": ", tone: "punct" },
    { text: "1.4", tone: "number" },
    { text: ",", tone: "punct" },
    { text: " // years, and counting", tone: "comment" },
  ],
  [
    { text: "  stack", tone: "property" },
    { text: ": [", tone: "punct" },
    { text: '"React"', tone: "string" },
    { text: ", ", tone: "punct" },
    { text: '"Next.js"', tone: "string" },
    { text: ", ", tone: "punct" },
    { text: '"TS"', tone: "string" },
    { text: "],", tone: "punct" },
  ],
  [
    { text: "  alsoWrites", tone: "property" },
    { text: ": [", tone: "punct" },
    { text: '"Node"', tone: "string" },
    { text: ", ", tone: "punct" },
    { text: '"Express"', tone: "string" },
    { text: ", ", tone: "punct" },
    { text: '"Mongo"', tone: "string" },
    { text: "],", tone: "punct" },
  ],
  [
    { text: "  caresAbout", tone: "property" },
    { text: ": [", tone: "punct" },
    { text: '"performance"', tone: "string" },
    { text: ", ", tone: "punct" },
    { text: '"a11y"', tone: "string" },
    { text: ", ", tone: "punct" },
    { text: '"SEO"', tone: "string" },
    { text: "],", tone: "punct" },
  ],
  [
    { text: "  openToWork", tone: "property" },
    { text: ": ", tone: "punct" },
    { text: "true", tone: "keyword" },
    { text: ",", tone: "punct" },
  ],
  [{ text: "};", tone: "punct" }],
];

export function CodeCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative">
      {/* Soft accent bloom behind the card. */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(60%_60%_at_60%_35%,var(--glow),transparent_70%)] blur-2xl"
      />

      <motion.div
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24, rotateX: 6 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.75, delay: 0.15, ease: EASE_OUT }}
        className="surface-panel overflow-hidden rounded-2xl"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-border bg-background-subtle px-4 py-3">
          <div aria-hidden className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="ml-1 rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-muted">
            avinash.ts
          </span>
          <span className="ml-auto font-mono text-[11px] text-subtle">
            TypeScript
          </span>
        </div>

        {/* Code body */}
        <div className="overflow-x-auto px-4 py-5 sm:px-5">
          <pre className="font-mono text-[12.5px] leading-[1.85] sm:text-[13px]">
            <code>
              {lines.map((tokens, lineIndex) => (
                <motion.span
                  key={lineIndex}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, x: -6 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.32,
                    delay: 0.45 + lineIndex * 0.07,
                    ease: EASE_OUT,
                  }}
                  className="flex gap-4"
                >
                  <span
                    aria-hidden
                    className="w-4 shrink-0 text-right text-code-comment select-none"
                  >
                    {lineIndex + 1}
                  </span>
                  <span className="whitespace-pre">
                    {tokens.map((token, tokenIndex) => (
                      <span
                        key={tokenIndex}
                        className={toneClass[token.tone ?? "plain"]}
                      >
                        {token.text}
                      </span>
                    ))}
                  </span>
                </motion.span>
              ))}
            </code>
          </pre>
        </div>

        {/* Status bar */}
        <div className="flex items-center gap-4 border-t border-border bg-background-subtle px-4 py-2.5 font-mono text-[11px] text-subtle">
          <span className="inline-flex items-center gap-1.5">
            <GitBranch aria-hidden className="h-3 w-3" />
            main
          </span>
          <span className="inline-flex items-center gap-1.5 text-accent">
            <ShieldCheck aria-hidden className="h-3 w-3" />
            0 errors
          </span>
          <span className="ml-auto hidden sm:inline">UTF-8 · LF</span>
        </div>
      </motion.div>

      <FloatingChip
        className="-top-5 -right-2 sm:-right-6"
        delay={1.1}
        reduceMotion={shouldReduceMotion ?? false}
      >
        Lighthouse 90+
      </FloatingChip>

      <FloatingChip
        className="-bottom-7 -left-2 sm:-left-6"
        delay={1.3}
        reduceMotion={shouldReduceMotion ?? false}
      >
        Reusable UI systems
      </FloatingChip>
    </div>
  );
}

type FloatingChipProps = {
  children: React.ReactNode;
  className?: string;
  delay: number;
  reduceMotion: boolean;
};

function FloatingChip({
  children,
  className,
  delay,
  reduceMotion,
}: FloatingChipProps) {
  return (
    <motion.span
      aria-hidden
      initial={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
      animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: EASE_OUT }}
      className={cn(
        "surface-panel absolute hidden rounded-full px-3 py-1.5 font-mono text-[11px] text-muted md:block",
        className,
      )}
    >
      {children}
    </motion.span>
  );
}
