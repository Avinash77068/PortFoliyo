import { ArrowUpRight, Mail, MapPin } from "lucide-react";

import { ContactForm } from "@/components/sections/ContactForm";
import { BrandGlyph } from "@/components/ui/BrandGlyph";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";
import { links, mailto } from "@/data/site";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate overflow-hidden border-t border-border py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden className="absolute inset-0 -z-20 bg-grid opacity-60" />
      <div
        aria-hidden
        className="absolute bottom-[-30%] left-1/2 -z-10 h-[32rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_65%)] blur-3xl"
      />

      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <Reveal y={12}>
              <span className="inline-flex items-center gap-2.5 font-mono text-xs tracking-[0.16em] text-accent uppercase">
                <span aria-hidden className="h-px w-6 bg-accent/60" />
                08 — Contact
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h2
                id="contact-heading"
                className="mt-4 text-heading font-semibold text-foreground"
              >
                Let&apos;s build something great together.
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
                Have a project, opportunity, or collaboration in mind? I&apos;d
                love to hear from you.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <a
                href={mailto}
                className="group/mail mt-8 inline-flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3.5 transition-colors hover:border-accent/40 hover:bg-accent-tint"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background-subtle text-accent">
                  <Mail aria-hidden className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[10.5px] tracking-[0.14em] text-subtle uppercase">
                    Email
                  </span>
                  <span className="block truncate text-[14px] font-medium text-foreground transition-colors group-hover/mail:text-accent">
                    {links.email}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="ml-auto h-4 w-4 shrink-0 text-subtle transition-transform duration-200 group-hover/mail:translate-x-0.5 group-hover/mail:-translate-y-0.5"
                />
              </a>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={mailto} leading={<Mail aria-hidden className="h-4 w-4" />}>
                  Send Email
                </Button>
                <Button
                  href={links.linkedin}
                  variant="secondary"
                  leading={<BrandGlyph name="linkedin" className="h-4 w-4" />}
                >
                  LinkedIn
                </Button>
                <Button
                  href={links.github}
                  variant="secondary"
                  leading={<BrandGlyph name="github" className="h-4 w-4" />}
                >
                  GitHub
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-8 inline-flex items-center gap-1.5 border-t border-border pt-6 text-[12.5px] text-subtle">
                <MapPin aria-hidden className="h-3.5 w-3.5" />
                Based in {profile.location} — open to remote and hybrid roles.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="surface-panel rounded-2xl p-6 sm:p-7">
              <h3 className="text-lg font-semibold text-foreground">
                Send a message
              </h3>
              <p className="mt-1.5 text-[13.5px] text-muted">
                I read everything that lands here and reply to anything relevant.
              </p>

              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
