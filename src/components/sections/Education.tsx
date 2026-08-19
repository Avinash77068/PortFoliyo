import { GraduationCap, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/data/education";

export function Education() {
  return (
    <Section id="education" bordered>
      <SectionHeading eyebrow="07 — Education" title="Education" />

      <ul className="mt-10 space-y-4">
        {education.map((item, index) => (
          <Reveal as="li" key={`${item.institution}-${item.year}`} delay={index * 0.06}>
            <div className="surface-panel flex flex-col gap-4 rounded-xl p-5 transition-colors duration-300 hover:border-accent/30 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-border bg-background-subtle text-accent">
                <GraduationCap aria-hidden className="h-5 w-5" />
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="text-[16.5px] font-semibold text-foreground">
                  {item.degree} <span className="text-muted">({item.field})</span>
                </h3>
                <p className="mt-1 text-sm text-muted">{item.institution}</p>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-[12.5px] text-subtle">
                  <MapPin aria-hidden className="h-3.5 w-3.5" />
                  {item.location}
                </p>
              </div>

              <Badge variant="accent" className="self-start sm:self-center">
                {item.year}
              </Badge>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
