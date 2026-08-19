# Avinash Shrivastav — Portfolio

Personal portfolio for a Frontend Developer / SDE-1, built with Next.js 16
(App Router), TypeScript, Tailwind CSS v4 and Framer Motion.

Dark-first design with a teal accent, a light theme, and a print-ready resume
route generated from the same data as the site.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

## Editing content

**All copy, links and data live in `src/data/` — no content is hard-coded in
components.**

| File | What it holds |
| --- | --- |
| `src/data/site.ts` | GitHub username, social URLs, email, resume link, canonical origin |
| `src/data/profile.ts` | Name, role, headline, summary, About copy, highlights, phone (resume only) |
| `src/data/navigation.ts` | Navbar / footer links and the observed section ids |
| `src/data/skills.ts` | Tech stack, grouped by category |
| `src/data/experience.ts` | Roles, dates, responsibilities, stack per role |
| `src/data/projects.ts` | Projects, highlights, stack, live/repo URLs, preview variant |
| `src/data/expertise.ts` | The four "What I Do" cards |
| `src/data/education.ts` | Degree entries |
| `src/data/social.ts` | Social links assembled from `site.ts` |

Add a technology by adding a `{ name, icon }` entry to `skills.ts`; `icon` must
be a key of `brandIcons` in `src/lib/brand-icons.ts` (brand SVG paths are
inlined there, so no icon package is shipped).

## Environment

Copy `.env.example` to `.env.local`:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_WEB3FORMS_KEY=
```

- `NEXT_PUBLIC_SITE_URL` drives canonical URLs, Open Graph, `sitemap.xml` and
  `robots.txt`. Set it to the real deployment origin before going live.
- `NEXT_PUBLIC_WEB3FORMS_KEY` is optional. With a key
  ([web3forms.com](https://web3forms.com), free, no backend) the contact form
  POSTs the message. Without one it composes the message in the visitor's mail
  client instead — the button is never a no-op.

## Resume

`/resume` renders a print-optimised sheet from `src/data/`, with a
**Download PDF** button that opens the browser print dialog. To serve a real PDF
instead, drop `public/resume.pdf` in place and change one line:

```ts
// src/data/site.ts
resume: "/resume.pdf",
```

## GitHub section

`src/lib/github.ts` reads the **public** GitHub API at build / revalidate time
(6 hour ISR) — repository count, member-since date, language mix, recently
pushed repos. Nothing is invented: if the request fails, the section falls back
to a static card with a link to the profile. Repository `homepage` URLs are
HEAD-checked so dead deployments are never linked.

## Structure

```
src/
├── app/               layout, page, resume/, sitemap, robots, icon, OG image, 404
├── components/
│   ├── layout/        Navbar, Footer
│   ├── providers/     ThemeProvider (class on <html>, no-flash init script)
│   ├── sections/      Hero, About, Skills, Experience, Projects, Expertise,
│   │                  GitHubSection, Education, Contact (+ CodeCard,
│   │                  ProjectMockup, ContactForm)
│   └── ui/            Button, Badge, Container, Section, SectionHeading,
│                      Reveal, TechChip, BrandGlyph, ThemeToggle, SocialIconLink
├── data/              all content (see table above)
├── lib/               utils, motion variants, GitHub client, brand icon paths
└── types/             shared types
```

## Notes on the design

- **Theming** — semantic CSS variables in `src/app/globals.css`, exposed to
  Tailwind through `@theme inline`. `@custom-variant dark` points `dark:` at the
  `.dark` class so the toggle works; an inline head script applies the stored
  theme before first paint.
- **Motion** — one easing curve and one travel distance
  (`src/lib/motion.ts`). Every entrance goes through `<Reveal>`, which renders
  the final state with no animation under `prefers-reduced-motion`, backed by a
  global CSS reduced-motion block.
- **Imagery** — no stock photography. The hero is a tokenised code card and the
  project previews are hand-built UI mockups (`ProjectMockup`), marked
  `aria-hidden` since every fact sits in the adjacent text.
- **Client JavaScript** — only the Navbar, theme toggle, hero card, reveals and
  contact form are client components. Skills, projects, experience, expertise,
  education and the GitHub section render on the server.
