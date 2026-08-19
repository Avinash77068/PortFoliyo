import { ArrowUpRight, Building2, Calendar, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <Section id="experience" bordered>
      <SectionHeading
        eyebrow="03 — Experience"
        title="Where I've Worked"
        description="1.4+ years building and owning production frontends."
      />

      <ol className="mt-14 space-y-10">
        {experience.map((item, index) => (
          <Reveal as="li" key={item.company} delay={index * 0.08}>
            <article className="relative grid gap-6 pl-9 sm:pl-12 lg:grid-cols-[minmax(0,200px)_minmax(0,1fr)] lg:gap-12 lg:pl-12">
              {/* Timeline rail — omitted on the final entry so it does not dangle. */}
              {index < experience.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute top-6 left-[7px] h-[calc(100%+1.75rem)] w-px bg-border sm:left-[8px]"
                />
              ) : null}
              <span
                aria-hidden
                className="absolute top-1.5 left-0 grid h-4 w-4 place-items-center rounded-full border border-border bg-surface sm:h-[18px] sm:w-[18px]"
              >
                <span
                  className={
                    item.current
                      ? "h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_3px_var(--accent-tint)]"
                      : "h-1.5 w-1.5 rounded-full bg-border-strong"
                  }
                />
              </span>

              <header className="lg:pt-0.5">
                <p className="inline-flex items-center gap-1.5 font-mono text-[11.5px] tracking-tight text-accent">
                  <Calendar aria-hidden className="h-3.5 w-3.5" />
                  {item.period}
                </p>
                {item.current ? (
                  <Badge variant="accent" className="mt-3 ml-0.5">
                    Current
                  </Badge>
                ) : null}
                <p className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] text-subtle lg:mt-4">
                  <MapPin aria-hidden className="h-3.5 w-3.5" />
                  {item.location}
                </p>
              </header>

              <div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-[22px]">
                  {item.role}
                </h3>

                <p className="mt-1.5 flex items-center gap-2 text-[15px] font-medium text-muted">
                  <Building2 aria-hidden className="h-4 w-4 text-subtle" />
                  {item.companyUrl ? (
                    <a
                      href={item.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/company inline-flex items-center gap-1 transition-colors hover:text-accent"
                    >
                      {item.company}
                      <ArrowUpRight
                        aria-hidden
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover/company:translate-x-0.5 group-hover/company:-translate-y-0.5"
                      />
                    </a>
                  ) : (
                    item.company
                  )}
                </p>

                <p className="mt-4 text-[14.5px] leading-relaxed text-muted">
                  {item.summary}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {item.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-[14.5px] leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent/70"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {item.stack.map((tech) => (
                    <li key={tech}>
                      <Badge>{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
