import type { LucideIcon } from "lucide-react";

import type { BrandIconName } from "@/lib/brand-icons";

export type NavItem = {
  label: string;
  href: string;
};

export type SocialPlatform = "github" | "linkedin" | "email";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
  /** Rendered by `BrandGlyph`; email falls back to a Lucide icon. */
  icon: BrandIconName | null;
};

export type Skill = {
  name: string;
  icon: BrandIconName;
};

export type SkillGroup = {
  title: string;
  description: string;
  skills: Skill[];
};

export type ExperienceItem = {
  company: string;
  companyUrl?: string;
  role: string;
  period: string;
  location: string;
  current: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
};

/** Selects which hand-built UI mockup `ProjectMockup` renders. */
export type ProjectPreview = "website" | "dashboard" | "wallet";

export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  highlights: string[];
  stack: string[];
  preview: ProjectPreview;
  featured: boolean;
  liveUrl?: string;
  repoUrl?: string;
  /** Shown instead of a "View Code" button when there is no public repo. */
  sourceNote?: string;
};

export type ExpertiseItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type EducationItem = {
  degree: string;
  field: string;
  institution: string;
  year: string;
  location: string;
};

export type ProfileHighlight = {
  label: string;
  detail: string;
  icon: LucideIcon;
};

/** Shape returned by `getGitHubProfile`; every field is optional-safe. */
export type GitHubProfile = {
  login: string;
  name: string;
  bio: string | null;
  location: string | null;
  avatarUrl: string;
  profileUrl: string;
  publicRepos: number;
  memberSince: string;
  languages: { name: string; count: number }[];
  /**
   * One entry per public source repo, newest first. `intensity` (0-1) encodes
   * how recently it was pushed and is computed at fetch time so that rendering
   * stays pure.
   */
  activity: { intensity: number }[];
  repositories: {
    name: string;
    url: string;
    description: string | null;
    language: string | null;
    /** Deployed URL when the repo declares one. */
    homepage: string | null;
    updatedAt: string;
    /** Pre-formatted "3 months ago", also computed at fetch time. */
    updatedLabel: string;
  }[];
};
