import { GITHUB_USERNAME } from "@/data/site";
import { formatRelativeTime } from "@/lib/utils";
import type { GitHubProfile } from "@/types";

/** Cache the public GitHub response for six hours. */
const REVALIDATE_SECONDS = 60 * 60 * 6;
const API = "https://api.github.com";

type GitHubUserResponse = {
  login: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  created_at: string;
};

type GitHubRepoResponse = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  homepage: string | null;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`GitHub API ${response.status} for ${path}`);
  }

  return (await response.json()) as T;
}

/** Counts the primary language of each source repository. */
function summariseLanguages(
  repos: GitHubRepoResponse[],
): GitHubProfile["languages"] {
  const counts = new Map<string, number>();

  for (const repo of repos) {
    if (!repo.language) continue;
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 5);
}

const MONTH_MS = 30 * 24 * 60 * 60 * 1000;

/** Buckets a push date into four visual weights, newest being strongest. */
function pushIntensity(pushedAt: string, now: number): number {
  const monthsAgo = (now - new Date(pushedAt).getTime()) / MONTH_MS;

  if (monthsAgo < 1) return 1;
  if (monthsAgo < 3) return 0.7;
  if (monthsAgo < 6) return 0.45;
  return 0.25;
}

/**
 * GitHub happily reports a `homepage` long after the deployment behind it has
 * gone. Probe each one so the section never renders a dead "live demo" link.
 * Any failure — 404, timeout, DNS — simply drops the link.
 */
async function resolveHomepage(homepage: string | null): Promise<string | null> {
  if (!homepage) return null;

  try {
    const response = await fetch(homepage, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(5000),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    return response.ok ? homepage : null;
  } catch {
    return null;
  }
}

/**
 * Reads the real public profile. Returns `null` on any failure (rate limit,
 * offline build, renamed account) so the section can degrade to a static card
 * rather than showing invented numbers.
 */
export async function getGitHubProfile(): Promise<GitHubProfile | null> {
  try {
    const [user, repos] = await Promise.all([
      fetchJson<GitHubUserResponse>(`/users/${GITHUB_USERNAME}`),
      fetchJson<GitHubRepoResponse[]>(
        `/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100`,
      ),
    ]);

    const sourceRepos = repos.filter((repo) => !repo.fork && !repo.archived);
    // Stamped once here rather than during render, which must stay pure.
    const now = Date.now();

    return {
      login: user.login,
      name: user.name ?? user.login,
      bio: user.bio,
      location: user.location,
      avatarUrl: user.avatar_url,
      profileUrl: user.html_url,
      publicRepos: user.public_repos,
      memberSince: user.created_at,
      languages: summariseLanguages(sourceRepos),
      activity: sourceRepos.slice(0, 48).map((repo) => ({
        intensity: pushIntensity(repo.pushed_at, now),
      })),
      repositories: await Promise.all(
        sourceRepos.slice(0, 4).map(async (repo) => ({
          name: repo.name,
          url: repo.html_url,
          description: repo.description,
          language: repo.language,
          homepage: await resolveHomepage(repo.homepage),
          updatedAt: repo.pushed_at,
          updatedLabel: formatRelativeTime(repo.pushed_at, now),
        })),
      ),
    };
  } catch {
    // Intentionally quiet: the caller renders a fallback.
    return null;
  }
}
