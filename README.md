# Personal Developer Portfolio

A content-driven portfolio built with Next.js (App Router), TypeScript, Tailwind CSS v4,
MDX and Framer Motion.

Everything you will normally change lives in `content/`. UI components read from that
layer and never hardcode personal information, so changing a value in one place updates
the whole site — homepage, project pages, resume and SEO metadata alike.

> **Phase 1 status:** the UI and content architecture are complete. All personal
> information and projects are clearly marked `[PLACEHOLDER]` content — see
> [Replace the placeholders](#replace-the-placeholders).

---

## Requirements

- Node.js 20.9 or newer
- npm

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Script              | What it does                                 |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Development server                            |
| `npm run build`     | Production build (also type-checks)           |
| `npm run start`     | Serve the production build                    |
| `npm run lint`      | ESLint                                        |
| `npm run typecheck` | TypeScript, no emit                           |

---

## Project structure

```
content/                  ← everything you edit day to day
├── profile.ts            name, title, bio, photo, links, site URL
├── experience.ts         work history
├── skills.ts             skill categories
├── resume.ts             education + certifications (resume only)
└── projects/*.mdx        one file per project, frontmatter + case study

public/
├── profile/portrait.png  your photo
└── projects/<slug>/      images for each project

src/
├── app/                  routes: /, /projects, /projects/[slug], /resume
├── components/
│   ├── layout/           Navbar, Footer
│   ├── sections/         Hero, About, FeaturedProjects, Skills, Experience, Contact
│   ├── projects/         ProjectCard, ProjectGrid, ProjectHeader, ProjectGallery, …
│   ├── resume/           A4 resume document + print button
│   ├── mdx/              MDX component map
│   └── ui/               Button, Container, Section, Eyebrow, Reveal, Notice, …
└── lib/
    ├── types.ts          the content model — one source of truth for shapes
    ├── projects.ts       reads content/projects/*.mdx at build time
    ├── placeholder.ts    detects `[BRACKETED]` placeholders
    ├── social.ts         contact channels derived from the profile
    └── seo.ts            metadata helpers
```

---

## Replace the placeholders

Any value wrapped in square brackets — `[YOUR NAME]`, `[ADD EMAIL]` — is a placeholder.
The UI detects them and renders an inert, clearly-marked element rather than a broken
link, so you can replace them at your own pace.

Search the repo for `[` inside `content/` to find everything that still needs your input:

```bash
grep -rn "\[ADD\|\[YOUR" content/
```

### Personal information

Edit `content/profile.ts` — name, title, location, email, bio, photo, GitHub and
LinkedIn URLs. This is the only place these values are defined.

Replace `public/profile/portrait.png` with your own photo and update `photo.width` /
`photo.height` to match its real dimensions.

### Experience, skills, education

`content/experience.ts`, `content/skills.ts` and `content/resume.ts`. Optional fields
(`achievements`, `technologies`, `description`, …) can be deleted entirely — the UI
hides anything that is missing rather than rendering an empty heading. An empty array
hides its whole section.

---

## Add a project

1. **Create the MDX file** at `content/projects/my-project.mdx`. The file name becomes
   the URL: `/projects/my-project`.

2. **Add images** to `public/projects/my-project/`.

3. That's it. The homepage, the projects index, the filters, the sitemap and the
   case-study route pick it up automatically. No component code changes.

### Frontmatter

```yaml
---
title: My Project # required
summary: One or two sentences for cards and SEO. # required
year: 2026 # required
type: professional # required: professional | client | open-source | personal
subtitle: An optional one-line subtitle
category: Web App # free-form, becomes a label on the card
role: Lead Engineer
period: Jan – Jun 2026
featured: true # show on the homepage
confidential: false # see below
placeholder: false # marks demo content; leave false for real work
order: 1 # tie-breaker within the same year (lower first)
stack:
  - Next.js
  - PostgreSQL
cover: /projects/my-project/cover.webp
coverAlt: Description of the cover image
gallery:
  - src: /projects/my-project/dashboard.webp
    alt: Description of the screenshot
    caption: Optional caption
links:
  live: https://example.com
  github: https://github.com/you/my-project
  article: https://example.com/write-up
---
```

Only `title`, `summary`, `year` and `type` are required. A project with invalid or
missing required frontmatter is skipped with a warning naming the file, so one bad file
can never break the build.

### Case-study body

Write plain Markdown. Use `##` headings for the sections you actually have — Overview,
Problem, Constraints, Solution, Architecture, Key Features, Technical Challenges,
Results, Lessons Learned. **A section you do not write simply does not appear.**

Two extra components are available inside MDX:

```mdx
<Figure src="/projects/my-project/flow.webp" alt="Request flow" caption="Optional" />

<Callout>Something worth pulling out of the flow of the text.</Callout>
```

### Featured projects

Set `featured: true`. The homepage shows up to four featured projects, newest first, and
falls back to the most recent work if nothing is marked featured.

### Confidential / NDA projects

Set `confidential: true`. The card and the case-study page then show a lock marker and
the notice *"Selected details are omitted due to confidentiality."*

The architecture supports confidential work, but it does **not** decide what is safe to
publish. You choose what goes in the file. Use a generic, representative `cover` image —
never a screenshot of the real system — and keep internal URLs, client names and
architecture out of the body unless you have written permission.

---

## Resume and PDF

`/resume` renders a real A4 document (210 × 297 mm) from the same content as the rest of
the site, plus `content/resume.ts` for education and certifications.

To produce a PDF: open `/resume` → **Print / Save as PDF** → choose *Save as PDF*.
Navigation, footer and the buttons are removed from the printed output by
`@media print` rules in `src/app/resume/resume.css`; that file also holds the `@page`
size and margins and the page-break rules. There is no headless browser or PDF service.

To force a page break at a specific point, add `className="resume-page-break"` to an
element in `src/components/resume/ResumeDocument.tsx`.

---

## Design system

All design tokens live in the `@theme` block at the top of `src/app/globals.css`:
colours, the type scale, container widths, section rhythm, radii and motion timings.
Change them there rather than introducing one-off values in components.

The layout uses alternating background bands (`<Section tone="alt">`) and hairline rules
instead of nested cards, to keep the page quiet.

### Animation

- `.rise` — a mount entrance used above the fold.
- `.reveal` — a scroll-driven entrance (CSS `animation-timeline: view()`).

Both are pure CSS, so content is never left invisible when scripting or the animation
frame loop is unavailable; browsers without support simply render the final state.
Framer Motion drives the interactive pieces — the mobile menu and the project filter
transition. Everything respects `prefers-reduced-motion`.

### Placeholder images

`public/` ships with abstract, generated gradients — never screenshots of real systems.
Regenerate them with:

```bash
node scripts/generate-placeholder-images.mjs
```

Delete the script once you have real artwork.

---

## Environment variables

One optional variable, used for canonical URLs and Open Graph metadata:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

It falls back to `http://localhost:3000` when unset. See `.env.example`.

---

## Deploy

The site is fully static — every route is prerendered at build time.

**Vercel:** import the repository, set `NEXT_PUBLIC_SITE_URL` in the project's
environment variables, and deploy. No other configuration is needed.

**Anywhere else:** `npm run build` then `npm run start` behind your process manager, or
host the build output on any Node-capable platform.
