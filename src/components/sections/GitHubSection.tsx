import { ArrowUpRight, Code2, FolderGit2, MapPin } from "lucide-react";

import { BrandGlyph } from "@/components/ui/BrandGlyph";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GITHUB_USERNAME, links } from "@/data/site";
import { getGitHubProfile } from "@/lib/github";
import { formatMonthYear } from "@/lib/utils";
import type { GitHubProfile } from "@/types";

/**
 * Every number in this section comes from the public GitHub API at build /
 * revalidate time. If the request fails, `profile` is null and the static
 * fallback renders instead — nothing here is ever invented.
 */
export async function GitHubSection() {
  const profile = await getGitHubProfile();

  return (
    <Section id="github" bordered>
      <SectionHeading
        eyebrow="06 — Open Source"
        title="On GitHub"
        description="Where I experiment, break things and keep the muscle memory sharp."
      />

      <Reveal className="mt-14">
        {profile ? <ProfilePanel profile={profile} /> : <FallbackPanel />}
      </Reveal>
    </Section>
  );
}

function ProfilePanel({ profile }: { profile: GitHubProfile }) {
  const totalLanguageRepos = profile.languages.reduce(
    (sum, language) => sum + language.count,
    0,
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      {/* Identity + real counters */}
      <div className="surface-panel rounded-2xl p-6 sm:p-7">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-background-subtle text-foreground">
            <BrandGlyph name="github" className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[17px] font-semibold text-foreground">
              {profile.name}
            </p>
            <a
              href={profile.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12.5px] text-accent transition-colors hover:text-accent-hover"
            >
              @{profile.login}
            </a>
          </div>
        </div>

        {profile.location ? (
          <p className="mt-5 inline-flex items-center gap-1.5 text-[13px] text-subtle">
            <MapPin aria-hidden className="h-3.5 w-3.5" />
            {profile.location}
          </p>
        ) : null}

        <dl className="mt-6 grid grid-cols-2 gap-3">
          <Stat
            icon={<FolderGit2 aria-hidden className="h-4 w-4" />}
            label="Public repos"
            value={String(profile.publicRepos)}
          />
          <Stat
            icon={<Code2 aria-hidden className="h-4 w-4" />}
            label="On GitHub since"
            value={formatMonthYear(profile.memberSince)}
          />
        </dl>

        {profile.languages.length > 0 ? (
          <div className="mt-6 border-t border-border pt-6">
            <p className="font-mono text-[11px] tracking-[0.14em] text-subtle uppercase">
              Languages by repository
            </p>

            <div
              aria-hidden
              className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-border"
            >
              {profile.languages.map((language, index) => (
                <span
                  key={language.name}
                  style={{
                    width: `${(language.count / totalLanguageRepos) * 100}%`,
                    opacity: 1 - index * 0.17,
                  }}
                  className="block bg-accent"
                />
              ))}
            </div>

            <ul className="mt-3.5 flex flex-wrap gap-x-4 gap-y-2">
              {profile.languages.map((language, index) => (
                <li
                  key={language.name}
                  className="inline-flex items-center gap-1.5 text-[12.5px] text-muted"
                >
                  <span
                    aria-hidden
                    style={{ opacity: 1 - index * 0.17 }}
                    className="h-2 w-2 rounded-full bg-accent"
                  />
                  {language.name}
                  <span className="text-subtle">{language.count}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <Button
          href={profile.profileUrl}
          variant="secondary"
          className="mt-7 w-full"
          trailing={<ArrowUpRight aria-hidden className="h-4 w-4" />}
        >
          View GitHub Profile
        </Button>
      </div>

      {/* Activity grid + recent repositories */}
      <div className="surface-panel rounded-2xl p-6 sm:p-7">
        {profile.activity.length > 0 ? <ActivityGrid activity={profile.activity} /> : null}

        <p className="mt-7 font-mono text-[11px] tracking-[0.14em] text-subtle uppercase">
          Recently pushed
        </p>

        <ul className="mt-3 divide-y divide-border">
          {profile.repositories.map((repo) => (
            <li key={repo.name} className="py-3 first:pt-0 last:pb-0">
              <div className="flex items-baseline justify-between gap-3">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/repo inline-flex min-w-0 items-center gap-1.5 font-mono text-[13px] text-foreground transition-colors hover:text-accent"
                >
                  <span className="truncate">{repo.name}</span>
                  <ArrowUpRight
                    aria-hidden
                    className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover/repo:opacity-100"
                  />
                </a>
                <time
                  dateTime={repo.updatedAt}
                  className="shrink-0 text-[11.5px] text-subtle"
                >
                  {repo.updatedLabel}
                </time>
              </div>

              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                {repo.language ? (
                  <span className="inline-flex items-center gap-1.5 text-[11.5px] text-muted">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent/70" />
                    {repo.language}
                  </span>
                ) : null}
                {repo.homepage ? (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11.5px] text-subtle transition-colors hover:text-accent"
                  >
                    live demo
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * One square per public repository, shaded by how recently it was pushed.
 * The caption states exactly that, so it cannot be read as a commit graph.
 */
function ActivityGrid({ activity }: { activity: GitHubProfile["activity"] }) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.14em] text-subtle uppercase">
        Repository activity
      </p>

      <div aria-hidden className="mt-3 flex flex-wrap gap-1.5">
        {activity.map((cell, index) => (
          <span
            key={index}
            style={{ opacity: cell.intensity }}
            className="h-3.5 w-3.5 rounded-[3px] bg-accent"
          />
        ))}
      </div>

      <p className="mt-3 text-[11.5px] leading-relaxed text-subtle">
        One square per public repository, shaded by how recently it was pushed.
      </p>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background-subtle p-3.5">
      <dt className="inline-flex items-center gap-1.5 text-[11.5px] text-subtle">
        <span className="text-accent">{icon}</span>
        {label}
      </dt>
      <dd className="mt-1.5 text-[15px] font-semibold text-foreground">
        {value}
      </dd>
    </div>
  );
}

/** Rendered when the GitHub API is unreachable. No numbers, no guesses. */
function FallbackPanel() {
  return (
    <div className="surface-panel flex flex-col items-start gap-6 rounded-2xl p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div className="flex items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-background-subtle text-foreground">
          <BrandGlyph name="github" className="h-6 w-6" />
        </span>
        <div>
          <p className="text-[17px] font-semibold text-foreground">
            @{GITHUB_USERNAME}
          </p>
          <p className="mt-1 text-sm text-muted">
            Public repositories, experiments and side projects.
          </p>
        </div>
      </div>

      <Button
        href={links.github}
        variant="secondary"
        trailing={<ArrowUpRight aria-hidden className="h-4 w-4" />}
      >
        View GitHub Profile
      </Button>
    </div>
  );
}
