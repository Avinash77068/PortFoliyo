import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { expertise } from "@/data/expertise";

export function Expertise() {
  return (
    <Section id="expertise" bordered>
      <SectionHeading
        eyebrow="05 — Expertise"
        title="What I Do"
        description="Four areas I am consistently trusted with on a product team."
      />

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {expertise.map((item, index) => (
          <Reveal as="li" key={item.title} delay={index * 0.07}>
            <div className="surface-panel group relative h-full overflow-hidden rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/35">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -top-16 h-32 bg-[radial-gradient(60%_100%_at_50%_100%,var(--glow),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <span className="relative grid h-10 w-10 place-items-center rounded-lg border border-border bg-background-subtle text-accent transition-colors duration-300 group-hover:border-accent/35 group-hover:bg-accent-tint">
                <item.icon aria-hidden className="h-5 w-5" />
              </span>

              <h3 className="relative mt-5 text-[15px] font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="relative mt-2 text-[13.5px] leading-relaxed text-muted">
                {item.description}
              </p>

              <span
                aria-hidden
                className="relative mt-5 block font-mono text-[11px] text-subtle"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
