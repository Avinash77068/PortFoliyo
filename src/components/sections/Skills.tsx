import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechChip } from "@/components/ui/TechChip";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <Section id="skills" bordered>
      <SectionHeading
        eyebrow="02 — Stack"
        title="Skills & Tech Stack"
        description="The tools I reach for day to day, grouped by what they actually do."
      />

      <div className="mt-14 space-y-10">
        {skillGroups.map((group, groupIndex) => (
          <Reveal key={group.title} delay={groupIndex * 0.06}>
            <div className="grid gap-6 border-t border-border pt-8 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:gap-12">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {group.title}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
                  {group.description}
                </p>
              </div>

              <ul className="flex flex-wrap gap-2.5 content-start">
                {group.skills.map((skill) => (
                  <TechChip key={skill.name} name={skill.name} icon={skill.icon} />
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
