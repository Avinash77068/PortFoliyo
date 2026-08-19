import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { PrintButton } from "@/app/resume/PrintButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { links } from "@/data/site";
import { skillGroups } from "@/data/skills";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${profile.name} — ${profile.role} with ${profile.experience} of experience in React.js, Next.js and TypeScript.`,
  alternates: { canonical: "/resume" },
};

const contactRows = [
  { label: "Email", value: links.email, href: `mailto:${links.email}` },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { label: "GitHub", value: links.github.replace(/^https?:\/\//, ""), href: links.github },
  {
    label: "LinkedIn",
    value: links.linkedin.replace(/^https?:\/\//, ""),
    href: links.linkedin,
  },
];

export default function ResumePage() {
  return (
    <main className="py-10 sm:py-14">
      <Container className="max-w-4xl">
        <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft aria-hidden className="h-4 w-4" />
            Back to portfolio
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <PrintButton />
            <Button href={`mailto:${links.email}`} variant="secondary">
              Get in touch
            </Button>
          </div>
        </div>

        <article className="print-sheet surface-panel rounded-2xl p-6 sm:p-10">
          <header className="border-b border-border pb-6">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {profile.name}
            </h1>
            <p className="print-accent mt-1.5 text-[15px] font-medium text-accent">
              {profile.role} · {profile.seniority}
            </p>

            <dl className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              <div className="flex gap-2 text-[13px]">
                <dt className="text-subtle">Location</dt>
                <dd className="text-muted">{profile.location}</dd>
              </div>
              {contactRows.map((row) => (
                <div key={row.label} className="flex gap-2 text-[13px]">
                  <dt className="text-subtle">{row.label}</dt>
                  <dd>
                    <a
                      href={row.href}
                      className="text-muted transition-colors hover:text-accent"
                    >
                      {row.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </header>

          <ResumeSection title="Summary">
            <p className="text-[14px] leading-relaxed text-muted">
              {profile.summary}
            </p>
          </ResumeSection>

          <ResumeSection title="Skills">
            <dl className="space-y-3">
              {skillGroups.map((group) => (
                <div key={group.title} className="sm:flex sm:gap-4">
                  <dt className="text-[13px] font-semibold text-foreground sm:w-52 sm:shrink-0">
                    {group.title}
                  </dt>
                  <dd className="text-[13.5px] text-muted">
                    {group.skills.map((skill) => skill.name).join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </ResumeSection>

          <ResumeSection title="Experience">
            <ol className="space-y-6">
              {experience.map((item) => (
                <li key={item.company}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-[15px] font-semibold text-foreground">
                      {item.role}{" "}
                      <span className="font-normal text-muted">
                        — {item.company}
                      </span>
                    </h3>
                    <p className="text-[12.5px] text-subtle">
                      {item.period} · {item.location}
                    </p>
                  </div>

                  <ul className="mt-2.5 space-y-1.5">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted"
                      >
                        <span aria-hidden className="text-subtle">
                          •
                        </span>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-2.5 text-[12.5px] text-subtle">
                    <span className="font-medium">Stack:</span>{" "}
                    {item.stack.join(", ")}
                  </p>
                </li>
              ))}
            </ol>
          </ResumeSection>

          <ResumeSection title="Selected Projects">
            <ol className="space-y-4">
              {projects.map((project) => (
                <li key={project.slug}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-[14.5px] font-semibold text-foreground">
                      {project.name}
                    </h3>
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        className="print-accent text-[12.5px] text-accent"
                      >
                        {project.liveUrl.replace(/^https?:\/\//, "")}
                      </a>
                    ) : null}
                  </div>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <p className="mt-1.5 text-[12.5px] text-subtle">
                    <span className="font-medium">Stack:</span>{" "}
                    {project.stack.join(", ")}
                  </p>
                </li>
              ))}
            </ol>
          </ResumeSection>

          <ResumeSection title="Education">
            <ol className="space-y-2">
              {education.map((item) => (
                <li
                  key={item.institution}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
                >
                  <p className="text-[14px] text-foreground">
                    {item.degree} ({item.field}){" "}
                    <span className="text-muted">— {item.institution}</span>
                  </p>
                  <p className="text-[12.5px] text-subtle">
                    {item.year} · {item.location}
                  </p>
                </li>
              ))}
            </ol>
          </ResumeSection>
        </article>
      </Container>
    </main>
  );
}

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-7 border-t border-border pt-6 first:border-t-0">
      <h2 className="mb-3.5 font-mono text-[11px] tracking-[0.16em] text-subtle uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}
