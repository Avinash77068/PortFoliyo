import { ArrowUpRight, Check, ExternalLink, Lock } from "lucide-react";

import { ProjectMockup } from "@/components/sections/ProjectMockup";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredProject, otherProjects } from "@/data/projects";
import type { Project } from "@/types";

/** Strips the protocol so the fake address bar reads like a real one. */
function displayHost(project: Project): string {
  if (!project.liveUrl) return project.name.toLowerCase();
  return project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function Projects() {
  return (
    <Section id="projects" bordered>
      <SectionHeading
        eyebrow="04 — Work"
        title="Featured Projects"
        description="Production applications I have designed, built and shipped."
      />

      {featuredProject ? (
        <FeaturedCard project={featuredProject} />
      ) : null}

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {otherProjects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.08}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <Reveal className="mt-14">
      <article className="surface-panel group relative overflow-hidden rounded-2xl transition-colors duration-300 hover:border-accent/30">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_65%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10 lg:p-8">
          <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1 lg:order-1">
            <ProjectMockup
              preview={project.preview}
              label={displayHost(project)}
              className="shadow-card"
            />
          </div>

          <div className="flex flex-col lg:order-2">
            <Badge variant="accent" className="self-start">
              Featured Project
            </Badge>

            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-[28px]">
              {project.name}
            </h3>
            <p className="mt-1 font-mono text-[11.5px] tracking-tight text-subtle">
              {project.category}
            </p>

            <p className="mt-4 text-[14.5px] leading-relaxed text-muted">
              {project.description}
            </p>

            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2 text-[13.5px] text-muted"
                >
                  <Check
                    aria-hidden
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                  />
                  {highlight}
                </li>
              ))}
            </ul>

            <ul className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </ul>

            <ProjectActions project={project} className="mt-7" />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="surface-panel group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/30">
      <div className="overflow-hidden border-b border-border bg-background-subtle p-4">
        <div className="transition-transform duration-500 ease-out group-hover:scale-[1.02]">
          <ProjectMockup
            preview={project.preview}
            label={displayHost(project)}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {project.name}
        </h3>
        <p className="mt-0.5 font-mono text-[11px] tracking-tight text-subtle">
          {project.category}
        </p>

        <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight}>
              <Badge variant="outline">{highlight}</Badge>
            </li>
          ))}
        </ul>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>

        <ProjectActions project={project} className="mt-6 pt-1" compact />
      </div>
    </article>
  );
}

function ProjectActions({
  project,
  className,
  compact = false,
}: {
  project: Project;
  className?: string;
  compact?: boolean;
}) {
  const size = compact ? "sm" : "md";

  return (
    <div className={`mt-auto flex flex-wrap items-center gap-3 ${className ?? ""}`}>
      {project.liveUrl ? (
        <Button
          href={project.liveUrl}
          size={size}
          leading={<ExternalLink aria-hidden className="h-4 w-4" />}
          aria-label={`Open the live ${project.name} site`}
        >
          Live Demo
        </Button>
      ) : null}

      {project.repoUrl ? (
        <Button
          href={project.repoUrl}
          variant="secondary"
          size={size}
          trailing={<ArrowUpRight aria-hidden className="h-4 w-4" />}
          aria-label={`View the ${project.name} source on GitHub`}
        >
          View Code
        </Button>
      ) : project.sourceNote ? (
        // No dead "View Code" button — say why the source is unavailable instead.
        <p className="inline-flex items-center gap-1.5 font-mono text-[11px] text-subtle">
          <Lock aria-hidden className="h-3.5 w-3.5" />
          {project.sourceNote}
        </p>
      ) : null}
    </div>
  );
}
