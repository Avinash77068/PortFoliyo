"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";

import { CodeCard } from "@/components/sections/CodeCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";
import { links } from "@/data/site";
import { socialLinks } from "@/data/social";
import { EASE_OUT, fadeUp, staggerContainer } from "@/lib/motion";

const textLinks = socialLinks.filter((link) => link.platform !== "email");

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const animate = shouldReduceMotion ? undefined : "visible";

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28"
    >
      {/* Background: grid, then a single accent bloom top-right. */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-grid mask-fade-b opacity-70" />
      <div
        aria-hidden
        className="absolute top-[-18%] right-[-10%] -z-10 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_65%)] blur-3xl"
      />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <motion.div
            variants={staggerContainer}
            initial={shouldReduceMotion ? undefined : "hidden"}
            animate={animate}
          >
            <motion.p variants={fadeUp}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent-tint px-3.5 py-1.5 text-[12.5px] font-medium text-accent">
                <span aria-hidden className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                {profile.availability}
              </span>
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-7 text-display font-semibold text-foreground"
            >
              {profile.headline.lead}{" "}
              <span className="text-gradient">{profile.headline.accent}</span>{" "}
              {profile.headline.trail}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted sm:text-[17px] sm:leading-[1.7]"
            >
              {profile.summary}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button
                href="#projects"
                size="lg"
                trailing={
                  <ArrowDown
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-y-0.5"
                  />
                }
              >
                View My Work
              </Button>

              <Button
                href={links.resume}
                variant="secondary"
                size="lg"
                leading={<FileText aria-hidden className="h-4 w-4" />}
              >
                Download Resume
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6"
            >
              {textLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                  <ArrowUpRight
                    aria-hidden
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                </a>
              ))}
              <span className="font-mono text-[11px] tracking-tight text-subtle">
                {profile.location}
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="lg:pl-4"
          >
            <CodeCard />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
