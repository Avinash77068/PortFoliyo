import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile, profileHighlights } from "@/data/profile";

export function About() {
  return (
    <Section id="about" bordered>
      <SectionHeading
        eyebrow="01 — About"
        title="About Me"
        description="A quick read on how I work and what I have shipped."
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-16">
        <Reveal className="mx-auto w-full max-w-[320px] lg:mx-0">
          <figure className="relative">
            <div
              aria-hidden
              className="absolute -inset-3 -z-10 rounded-3xl bg-[radial-gradient(70%_70%_at_50%_20%,var(--glow),transparent_70%)] blur-xl"
            />
            <div className="surface-panel overflow-hidden rounded-2xl p-2">
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                width={720}
                height={722}
                sizes="(max-width: 1024px) 300px, 320px"
                className="aspect-square w-full rounded-xl bg-background-subtle object-cover"
              />
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-3 font-mono text-[11px] tracking-tight text-subtle">
              <span>{profile.name}</span>
              <span className="text-accent">{profile.seniority}</span>
            </figcaption>
          </figure>
        </Reveal>

        <div>
          <div className="space-y-5">
            {profile.about.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index * 0.06}>
                <p className="text-[15px] leading-[1.75] text-muted sm:text-base">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.18}>
            <dl className="mt-9 grid gap-x-8 gap-y-5 border-t border-border pt-7 sm:grid-cols-2">
              {profile.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-mono text-[11px] tracking-[0.14em] text-subtle uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium text-foreground">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      <ul className="mt-14 grid gap-4 sm:grid-cols-3">
        {profileHighlights.map((highlight, index) => (
          <Reveal as="li" key={highlight.label} delay={index * 0.08}>
            <div className="surface-panel group h-full rounded-xl p-5 transition-colors duration-300 hover:border-accent/35">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background-subtle text-accent transition-colors duration-300 group-hover:border-accent/35 group-hover:bg-accent-tint">
                <highlight.icon aria-hidden className="h-[18px] w-[18px]" />
              </span>
              <p className="mt-4 text-[15px] font-semibold text-foreground">
                {highlight.label}
              </p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
                {highlight.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
