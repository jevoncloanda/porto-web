# AGENTS.md

## Project

This repository contains my personal developer portfolio website.

The project is a content-driven portfolio built with Next.js. It should remain simple, maintainable, performant, and easy to extend as new projects and professional experience are added.

---

## Core Principles

### 1. Do not overengineer

This is a personal portfolio, not a SaaS application.

Prefer simple solutions over unnecessary infrastructure.

Do NOT introduce:

- A standalone backend
- Express or another backend server
- A database
- Authentication
- An admin dashboard
- Unnecessary API routes
- Microservices
- Complex state management

The portfolio should remain primarily a frontend/content-driven application.

---

### 2. Content and UI must be separated

Do not hardcode personal information or project content directly into UI components.

Personal information, experience, skills, and projects should have a clear content/data layer.

Components should focus on presentation and behavior.

For example:

```text
content/
components/
```

should have clearly separated responsibilities.

If changing my GitHub URL requires editing multiple components, the architecture is wrong.

---

### 3. Projects must be data-driven

Projects must NOT be manually hardcoded into the homepage or project listing.

Projects should be represented through the established content system, preferably MDX.

Adding a project should ideally require:

1. Creating the project content file
2. Adding its images
3. Setting its metadata

No component code should need to be modified.

---

## Technology Rules

Use the project's established stack:

- Next.js
- App Router
- TypeScript
- Tailwind CSS
- MDX
- Framer Motion
- next/image

Prefer modern Next.js patterns.

Use Server Components by default.

Only use Client Components when client-side interactivity is actually required.

Do not add a dependency unless it provides meaningful value.

Before adding a new package, consider whether the functionality can reasonably be implemented using the existing stack.

---

## TypeScript

Use TypeScript throughout the application.

Avoid:

```ts
any
```

unless there is a legitimate technical reason.

Prefer explicit types for:

- Project metadata
- Profile information
- Experience
- Skills
- Component props
- MDX frontmatter

Keep types reusable rather than duplicating them across components.

---

## Component Architecture

Build reusable components.

Avoid large monolithic components.

Prefer:

```text
components/
├── layout/
├── sections/
├── projects/
├── resume/
└── ui/
```

when appropriate.

Do not create a component abstraction simply for the sake of abstraction.

A component should generally exist because:

- It is reused
- It represents a meaningful UI element
- It has meaningful internal behavior
- It improves maintainability

---

## Styling

Use Tailwind CSS consistently.

Keep the visual system coherent.

Prefer centralized design tokens / CSS variables for values such as:

- Colors
- Typography
- Spacing
- Borders
- Radii
- Shadows
- Transitions

Do not randomly introduce slightly different values throughout the application.

Avoid excessive:

- Gradients
- Glassmorphism
- Shadows
- Neon effects
- Decorative elements

The design should feel premium, minimal, and intentional.

---

## Design Direction

The portfolio should have a modern editorial aesthetic.

Primary characteristics:

- Minimal
- Premium
- Dark-first
- Strong typography
- Generous whitespace
- Strong visual hierarchy
- Subtle accent color
- Professional
- Developer-oriented

The provided Dribbble reference is visual inspiration:

https://dribbble.com/shots/10724776-Carlos-Personal-Portfolio-Website

Do not copy the reference directly.

Create an original design influenced by its visual language.

---

## Responsive Design

Every feature must work properly on:

- Mobile
- Tablet
- Desktop
- Large desktop displays

Do not treat mobile as a scaled-down desktop design.

Reconsider layouts where necessary.

Pay particular attention to:

- Navigation
- Hero
- Typography
- Project cards
- Images
- Project galleries
- Resume layout

---

## Accessibility

Follow accessibility best practices.

Use:

- Semantic HTML
- Correct heading hierarchy
- Accessible buttons
- Keyboard navigation
- Visible focus states
- Meaningful alt text
- Sufficient color contrast
- Reduced-motion support

Do not sacrifice accessibility for visual effects.

---

## Images

Use `next/image` for local images whenever appropriate.

Do not stretch images.

Maintain correct aspect ratios.

Use appropriate:

- Width/height
- Aspect ratios
- Object positioning
- Loading behavior
- Responsive sizing

Optimize large images when practical.

Do not commit unnecessarily huge image files.

---

## Animation

Use Framer Motion only where it improves the experience.

Preferred animation characteristics:

- Subtle
- Fast
- Smooth
- Purposeful

Good examples:

- Section entrance
- Image reveal
- Project hover
- Navigation transitions
- Page transitions

Avoid:

- Excessive motion
- Constant movement
- Distracting effects
- Long animations

Respect:

```text
prefers-reduced-motion
```

---

## Personal Information

Never invent information about me.

This includes:

- Work experience
- Companies
- Clients
- Job titles
- Achievements
- Metrics
- Revenue
- User counts
- Awards
- Certifications
- Technologies
- Education
- Project results

If information has not been provided, use a clearly marked placeholder.

For example:

```text
[ADD EXPERIENCE]
```

Do not fabricate realistic-looking information simply to make the website appear complete.

---

## Professional / NDA Projects

Some of my professional projects may be confidential.

The architecture must support confidential projects.

A project may contain:

```yaml
confidential: true
```

When a project is confidential:

- Do not assume screenshots may be shown
- Do not expose proprietary information
- Do not expose real company data
- Do not expose private URLs
- Do not expose internal architecture unless explicitly provided for public use
- Do not invent sanitized screenshots from real systems

The UI may provide a generic/representative presentation.

For example:

> Selected details are omitted due to confidentiality.

Never automatically blur or manipulate confidential screenshots as a substitute for determining whether they are allowed to be published.

---

## Project Case Studies

Project pages should support structured case studies.

Potential sections include:

- Overview
- Problem
- Constraints
- Solution
- Architecture
- Key Features
- Technical Challenges
- Implementation
- Results
- Lessons Learned
- Gallery

Not every project needs every section.

If a section is missing from the project content, hide it gracefully.

Do not display empty headings.

---

## Resume / PDF

The portfolio contains a dedicated resume page.

The resume should be optimized for:

```text
A4
```

Use print CSS.

The browser version may contain interactive controls such as:

```text
Print / Download PDF
```

These controls must disappear when printed.

Do not create a separate manually maintained PDF design unless explicitly requested.

The goal is:

```text
Resume Page
    ↓
Browser Print
    ↓
Save as PDF
```

The resume should remain maintainable through the same content system where practical.

---

## SEO

Use Next.js metadata properly.

Every major page should have an appropriate:

- Title
- Description
- Open Graph metadata

Do not invent SEO information that contains false claims.

Use the provided personal information as the source of truth.

---

## Performance

Prioritize performance.

Prefer:

- Static generation
- Server Components
- Optimized images
- Minimal JavaScript
- Lazy loading where appropriate
- Lightweight dependencies

Do not add client-side JavaScript when server rendering or CSS can accomplish the same thing.

---

## Routing

Use Next.js App Router conventions.

Expected routes include:

```text
/
 /projects
 /projects/[slug]
 /resume
```

Additional routes may be introduced only when they provide clear value.

---

## Error Handling

The application should handle missing or invalid content gracefully.

Examples:

- Missing project image
- Missing optional project section
- Invalid project slug
- Missing optional metadata

Do not allow a missing optional field to break the entire page.

---

## Placeholder Content

During development, placeholder content is acceptable.

However:

- Clearly mark placeholders
- Keep them easy to replace
- Do not present them as real professional experience
- Do not build unnecessary fake content

A single representative placeholder project is enough to demonstrate the project system.

---

## Development Workflow

When implementing a feature:

1. Inspect the existing architecture
2. Reuse existing components where possible
3. Check whether the content model already supports the requirement
4. Implement the smallest clean solution
5. Test the feature
6. Check responsive behavior
7. Run lint/type checks
8. Run the production build when appropriate

Do not rewrite working parts of the application without a clear reason.

---

## Before Declaring Work Complete

Always verify the implementation.

At minimum, where applicable:

```bash
npm run lint
npm run build
```

Also verify:

- Routes work
- Images load
- MDX renders
- Navigation works
- Mobile layout works
- Desktop layout works
- Resume print layout works
- No obvious console errors
- No TypeScript errors

If browser/screenshot tooling is available, visually inspect important pages instead of relying only on code correctness.

---

## Visual QA

This project is design-focused.

Passing the build is NOT sufficient.

When browser inspection is available, check:

- Alignment
- Spacing
- Typography
- Image cropping
- Responsive behavior
- Hover states
- Animation behavior
- Navigation
- Mobile menu
- Project cards
- Resume page

Fix visual issues rather than simply reporting them.

---

## Git

Make focused changes.

Do not modify unrelated files.

Do not remove existing functionality without a reason.

Do not commit:

- Secrets
- API keys
- Credentials
- Environment files containing secrets
- Large unnecessary binaries

Keep the repository clean.

---

## Environment Variables

Never hardcode secrets.

If environment variables are required in the future:

- Use `.env.local`
- Provide `.env.example`
- Never commit actual secrets

The portfolio should require as few environment variables as possible.

---

## Documentation

Keep the README updated when architecture or developer workflow changes.

The README should explain:

- How to install
- How to run locally
- How to build
- How to add projects
- How to add images
- How to update personal information
- How to generate the resume PDF
- How to deploy

Documentation should be concise and practical.

---

## Agent Behavior

Before making architectural changes:

- Inspect the existing implementation
- Understand the current content model
- Reuse existing patterns
- Avoid unnecessary rewrites

When requirements are ambiguous:

- Prefer the simplest solution
- Preserve existing behavior
- Avoid inventing personal information
- Use placeholders when necessary

Do not stop at the first technically working implementation if the result obviously violates the established design direction.

---

## Priority Order

When making decisions, prioritize:

1. Correctness
2. Maintainability
3. User experience
4. Accessibility
5. Performance
6. Visual polish
7. Simplicity

Do not sacrifice architecture for visual effects.

Do not sacrifice accessibility for aesthetics.

Do not sacrifice maintainability for short-term speed.

---

## Current Project Phase

The current phase is:

**Phase 1 — Portfolio UI & Boilerplate**

The primary goal is to establish:

- Complete UI
- Design system
- Responsive layout
- Component architecture
- Project content architecture
- MDX support
- Confidential project support
- Resume layout
- Print-to-PDF support

Actual portfolio projects will be added later.

Do not block development waiting for project content.

Use placeholders where necessary and make them easy to replace.

---

## Important Distinction

`AGENTS.md` contains persistent engineering rules.

Detailed implementation requirements belong in project-specific specification files such as:

```text
PROJECT_SPEC.md
```

If both files exist:

- Follow `AGENTS.md` for persistent engineering principles.
- Follow `PROJECT_SPEC.md` for the current feature/phase requirements.
- If they conflict, preserve the principles in `AGENTS.md` unless the specification explicitly requires a different approach.

The objective is to create a portfolio that is **beautiful now, easy to maintain later, and easy to expand when real project information becomes available.**