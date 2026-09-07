# Project Case Study Extraction Prompt

Use this prompt inside the source repository of a project that should become a
case study for my portfolio.

---

You are preparing verified portfolio content from this project repository.

Your task is to inspect the project, run it when practical, gather safe and
representative screenshots, and produce a case-study MDX file plus its image
assets. Do not redesign, refactor, or modify the project itself unless a small
temporary change is strictly necessary to run it. Do not commit changes.

## Destination portfolio

The final case study will be added to a separate Next.js portfolio using:

- `content/projects/<slug>.mdx`
- `public/projects/<slug>/`

If the portfolio repository is available, place finished files there. Otherwise,
create an export folder named `portfolio-case-study-export/<slug>/` containing:

- `<slug>.mdx`
- an `images/` directory
- `extraction-notes.md`

## Non-negotiable accuracy and privacy rules

1. Use only facts supported by the repository, its documentation, its visible
   running behavior, or information I explicitly provide.
2. Never invent users, clients, responsibilities, outcomes, metrics, dates,
   architecture decisions, business impact, or technical challenges.
3. Clearly distinguish repository evidence from reasonable technical inference.
   Do not include an inference in the published MDX unless it is safe and useful.
4. Never expose secrets, credentials, environment values, private URLs, personal
   data, customer data, internal identifiers, production records, access tokens,
   or proprietary information.
5. Do not use real production data in screenshots. Use existing demo/seed data
   only when it is clearly safe; otherwise use an empty state or locally created
   generic sample data.
6. If this is confidential or NDA-covered work, set `confidential: true`. Do not
   capture restricted screens or disclose internal architecture. Describe only
   facts that are already public or that I explicitly approve for publication.
7. Do not blur confidential information as a substitute for deciding whether it
   may be published. Omit unsafe screenshots entirely.
8. Do not claim that I personally built something merely because it exists in the
   repository. If my role or contribution cannot be verified, leave `role` out
   and flag it in `extraction-notes.md`.

## Step 1 — Understand the project

Inspect the repository before writing:

- README and other project documentation
- package/dependency manifests
- application routes and major user flows
- source structure and architectural boundaries
- database schema or migrations, if present and safe to inspect
- tests, CI configuration, container/deployment configuration, and public API docs
- Git history only when it is available and useful for verifying my contribution

Determine, when evidence exists:

- what the project is and who it serves
- the problem it addresses
- the main user workflow
- project type and category
- technology stack
- architecture at a publishable level
- notable features
- meaningful constraints
- implementation or technical challenges
- solution decisions and trade-offs
- results or current status
- lessons learned
- public GitHub, live-demo, or article links

Anything not supported by evidence is unknown. Do not fill gaps with plausible
marketing copy.

## Step 2 — Run and inspect the application

Follow the repository's documented setup. Prefer existing scripts and sample
configuration. Do not connect to production services or use real credentials.

If the project runs successfully:

1. Inspect the important flows at desktop and mobile sizes.
2. Capture only screens that materially help explain the project.
3. Prefer 3–6 strong screenshots over documenting every page.
4. Include useful states where available, such as a primary workflow, responsive
   view, empty state, result view, or publicly safe administration view.
5. Use PNG or WebP and descriptive lowercase filenames, for example:
   `dashboard-overview.webp` or `mobile-checkout.png`.
6. Record concise, factual alt text and an optional explanatory caption for every
   image.

Do not manufacture UI screenshots. If the app cannot run, explain why in
`extraction-notes.md` and continue using repository evidence. Screenshots are
optional.

## Step 3 — Produce the MDX case study

Choose a stable lowercase kebab-case slug. Use this exact frontmatter shape:

```yaml
---
title: "Required project title"
subtitle: "Optional supporting line"
summary: "Required concise, factual summary"
year: 2025
type: personal # professional | client | open-source | personal
category: "Optional category"
role: "Optional—include only when verified or explicitly supplied"
period: "Optional project period"
featured: false
confidential: false
placeholder: false
order: 0
stack:
  - "Verified technology"
cover: /projects/<slug>/cover.webp
coverAlt: "Factual description of the cover image"
gallery:
  - src: /projects/<slug>/feature-name.webp
    alt: "Factual alternative text"
    caption: "Optional context that is not already obvious"
links:
  live: "Optional public URL"
  github: "Optional public repository URL"
  article: "Optional public article URL"
---
```

Required frontmatter fields are `title`, `summary`, `year`, and `type`.
Everything else is optional. Omit unknown optional fields instead of leaving empty
strings or inventing values. If the year cannot be verified, ask me for it before
calling the export complete.

After the frontmatter, use only the sections supported by evidence. Available
sections include:

```mdx
## Overview

## Problem

## Constraints

## Solution

## Architecture

## Key Features

## Technical Challenges

## Implementation

## Results

## Lessons Learned
```

`Overview` should normally be included. Every other section is optional. Omit a
section completely when the information is unavailable, too sensitive, repetitive,
or not meaningful for this project. Never render an empty heading.

Writing requirements:

- Use clear first-person portfolio language only when my contribution is known.
- Otherwise describe the project neutrally.
- Explain decisions and trade-offs rather than listing libraries without context.
- Keep paragraphs concise and avoid exaggerated language.
- Include metrics only when the repository or I provide a verifiable source.
- Mention uncertainty in `extraction-notes.md`, not as vague published copy.
- Keep code excerpts short, relevant, and free of secrets or proprietary logic.

## Step 4 — Create extraction notes

Create `extraction-notes.md` alongside the export. This file is for review and is
not published. Include:

1. Evidence used: relevant files, routes, and visible application flows.
2. Inferences made: each inference and why it appears reasonable.
3. Missing information: questions that only I can answer, especially my role,
   dates, constraints, results, and lessons learned.
4. Privacy review: what you deliberately omitted and why.
5. Screenshot manifest: filename, source screen/route, viewport, alt text, and
   whether it contains generated demo data.
6. Run status: commands used and any setup or runtime failures.

## Completion criteria

Before finishing:

- Confirm the MDX frontmatter matches the schema above.
- Confirm every image path resolves to an exported image.
- Confirm screenshots contain no secrets or private/production data.
- Confirm optional unknown sections and fields were omitted.
- Confirm no claim about my work, impact, or results was invented.
- If the portfolio repository is available, run its lint/type checks and production
  build after adding the files.

Finish with a short summary of what was extracted, which files were created, and
the exact questions I still need to answer before publication.

