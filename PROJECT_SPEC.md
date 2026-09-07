# Personal Developer Portfolio — Phase 1: UI & Boilerplate

You are a senior Next.js engineer and UI/UX designer.

Your task is to build **Phase 1 of my personal developer portfolio**.

The goal of this phase is NOT to populate all of my projects.

The goal is to create a **production-quality UI, design system, responsive layout, content architecture, and project framework** so that I can easily add my projects later without needing to redesign or restructure the application.

---

# 1. Design Reference

Use this Dribbble design as the primary visual inspiration:

https://dribbble.com/shots/10724776-Carlos-Personal-Portfolio-Website

IMPORTANT:

- Take inspiration from the visual language, layout, typography, spacing, hierarchy, and overall feel.
- Do NOT copy the design pixel-for-pixel.
- Do NOT reproduce proprietary artwork or branding.
- Create an original portfolio inspired by the reference.

Desired overall feeling:

- Premium
- Minimal
- Modern
- Editorial
- Confident
- Developer-focused
- Dark-first
- Strong typography
- Generous whitespace
- Subtle orange accent
- High-quality interactions
- Professional rather than flashy

Think:

**Vercel + Linear + modern editorial portfolio**

Avoid:

- Excessive gradients
- Excessive glassmorphism
- Neon cyberpunk aesthetics
- Excessive animations
- Generic SaaS dashboard styling
- Template-looking UI

---

# 2. Tech Stack

Use:

- Next.js
- App Router
- TypeScript
- Tailwind CSS
- MDX
- Framer Motion
- next/image

Use modern Next.js conventions.

Do NOT create:

- A standalone backend
- Express server
- Separate API server
- Database
- Authentication system
- Admin dashboard

This is a content-driven portfolio.

---

# 3. Architecture Philosophy

The portfolio must have **one source of truth for content**.

I want to be able to add a project later by creating an MDX file and adding its images.

For example:

content/projects/my-new-project.mdx

and:

public/projects/my-new-project/

The UI should automatically consume the project.

Do NOT hardcode individual projects directly inside page components.

---

# 4. Pages

Create the following routes:

## `/`

Main portfolio homepage.

Sections:

1. Navigation
2. Hero
3. About
4. Featured Projects
5. Skills / Tech Stack
6. Experience
7. Contact
8. Footer

---

## `/projects`

Project listing page.

Create a polished project grid.

The page must support:

- Featured projects
- Professional projects
- Personal projects
- Confidential/NDA projects
- Project categories
- Technology tags

For now, use **placeholder project data** only.

Clearly mark placeholder content so I can replace it later.

Do not invent fake professional achievements or fake metrics.

---

## `/projects/[slug]`

Dynamic project case-study page.

This must be generated from MDX.

The template should support:

- Project title
- Subtitle
- Year
- Role
- Project type
- Technologies
- Hero image
- Overview
- Problem
- Solution
- Architecture
- Features
- Challenges
- Results
- Lessons learned
- Image gallery
- External links
- GitHub
- Live demo

Not every project will necessarily use every section.

The template must gracefully hide sections that are not provided.

---

## `/resume`

Create a dedicated printable resume page.

This is NOT simply the homepage with a print button.

It should have a clean A4 document layout.

Requirements:

- A4 dimensions
- Print-friendly
- Proper page breaks
- Correct typography
- No navigation when printed
- No unnecessary UI elements
- Links remain usable
- Optimized for "Save as PDF"

Include a visible:

**Download / Print Resume**

button in normal browser view.

When printing, hide the button.

Use `@media print`.

---

# 5. Homepage Design

## Hero

Create a strong visual hero inspired by the provided reference.

Include:

- My name
- Professional title
- Short bio
- Profile photo
- Location if provided
- GitHub
- LinkedIn
- Resume CTA
- Scroll indicator

The hero should feel editorial rather than like a standard developer template.

Use large typography.

The layout should transition beautifully from desktop to mobile.

---

# 6. About Section

Create a concise About section.

Use the bio I provide.

Do NOT rewrite the bio into something exaggerated.

The design should allow the content to be replaced easily.

---

# 7. Projects Section

This is one of the most important parts of the architecture.

Create a reusable `ProjectCard` component.

A project card should support:

- Cover image
- Project title
- Short description
- Technologies
- Year
- Project type
- Confidential indicator
- Hover interaction
- Link to case study

Example project metadata:

```yaml
title: Example Project
slug: example-project
year: 2026
type: personal
featured: true
confidential: false
stack:
  - Next.js
  - TypeScript
cover: /projects/example/cover.webp
```

The actual project content must NOT be embedded inside the React component.

---

# 8. Confidential / NDA Projects

The content architecture must support confidential projects.

Example:

```yaml
confidential: true
```

When true:

- Show a subtle lock/confidential indicator
- Do not assume screenshots can be displayed
- Allow a generic representative image
- Provide a dedicated confidential-project presentation style

Example text:

"Selected details are omitted due to confidentiality."

Do NOT blur screenshots automatically.

The portfolio owner will decide what can legally be shown.

---

# 9. Project Content Architecture

Use MDX.

Example:

```text
content/
└── projects/
    ├── example-project.mdx
    └── another-project.mdx
```

Images:

```text
public/
└── projects/
    ├── example-project/
    │   ├── cover.webp
    │   ├── dashboard.webp
    │   └── architecture.webp
    │
    └── another-project/
        └── cover.webp
```

Create one example MDX project demonstrating every supported section.

Clearly label it as:

**PLACEHOLDER — REPLACE WITH REAL PROJECT**

Do not present the placeholder project as real work.

---

# 10. Design System

Create a consistent design system.

Define:

- Typography scale
- Spacing
- Border radius
- Shadows
- Backgrounds
- Text colors
- Accent color
- Container widths
- Breakpoints
- Animation timings

Use CSS variables where appropriate.

Do not scatter arbitrary values throughout components.

---

# 11. Typography

Typography is extremely important.

Use a high-quality modern sans-serif font.

Prioritize:

- Strong display typography
- Excellent readability
- Good hierarchy
- Proper line-height
- Responsive font sizing

Large headings should use responsive typography such as `clamp()` where appropriate.

---

# 12. Navigation

Desktop:

- Logo/name
- About
- Projects
- Experience
- Resume
- Contact

Mobile:

- Clean hamburger/menu interaction
- Smooth open/close animation

Navigation should remain minimal.

---

# 13. Animations

Use Framer Motion.

Animations should be subtle and intentional.

Implement:

- Page entrance
- Section reveal
- Project card hover
- Image reveal
- Navigation transitions
- Mobile menu transition

Do NOT animate everything.

Performance is more important than animation.

Respect:

`prefers-reduced-motion`

---

# 14. Responsive Design

Design mobile-first.

Explicitly test:

- 375px
- 390px
- 430px
- 768px
- 1024px
- 1440px
- 1920px

The desktop design must not simply shrink on mobile.

Reconsider layouts where necessary.

---

# 15. Accessibility

Implement:

- Semantic HTML
- Proper heading hierarchy
- Keyboard navigation
- Visible focus states
- Alt text
- Accessible buttons
- Accessible navigation
- Good contrast
- Reduced-motion support

---

# 16. SEO

Implement proper Next.js metadata.

Include:

- Page titles
- Descriptions
- Open Graph metadata
- Twitter/X metadata
- Canonical URL structure

Create reusable metadata utilities where appropriate.

Do not invent personal information.

Use placeholders where information is not yet provided.

---

# 17. Images

Use `next/image`.

Do not use regular `<img>` unless there is a specific technical reason.

Create reusable image components if useful.

Support:

- Project covers
- Project galleries
- Profile photo
- Responsive images
- Proper aspect ratios
- Loading states

Do not stretch images.

---

# 18. Content Configuration

Create a central personal profile configuration.

For example:

```text
content/
├── profile.ts
├── experience.ts
├── skills.ts
└── projects/
```

Profile configuration should contain:

- Name
- Title
- Bio
- Profile image
- GitHub
- LinkedIn
- Email
- Resume information

Do not hardcode these values in multiple components.

I should be able to change my GitHub URL once and have the entire website update.

---

# 19. Experience

Create a reusable timeline component.

For now, use placeholder entries if I have not provided all experience information.

Structure:

```text
Company
Role
Period
Description
Achievements
Technologies
```

Make achievements optional.

Do not invent achievements.

---

# 20. Skills

Create a flexible skills section.

Support categories such as:

- Frontend
- Backend
- Database
- DevOps
- Tools

Do not display technologies merely because they are popular.

Only display technologies provided in my content configuration.

---

# 21. Contact

Create a simple premium contact section.

Include:

- Email
- GitHub
- LinkedIn

Do NOT create a database-backed contact form.

A mailto link is acceptable.

---

# 22. PDF Strategy

The website and resume must share the same underlying information where practical.

However, the resume should have its own layout optimized for A4.

The goal is:

```text
Website Content
      ↓
Next.js Components
      ↓
┌───────────────┐
│   Website     │
│   /resume     │
└───────────────┘
      ↓
Browser Print
      ↓
PDF
```

Do not introduce Puppeteer or a PDF backend unless there is a compelling reason.

Start with print CSS.

---

# 23. Component Architecture

Create reusable components.

Suggested structure:

```text
components/
├── layout/
│   ├── Navbar
│   └── Footer
│
├── sections/
│   ├── Hero
│   ├── About
│   ├── FeaturedProjects
│   ├── Skills
│   ├── Experience
│   └── Contact
│
├── projects/
│   ├── ProjectCard
│   ├── ProjectGrid
│   ├── ProjectHeader
│   ├── ProjectGallery
│   ├── ProjectMeta
│   └── ConfidentialBadge
│
├── resume/
│   └── ResumeLayout
│
└── ui/
    ├── Button
    ├── Badge
    ├── SectionHeading
    └── Container
```

You may adjust this structure if you have a better architecture.

Avoid overengineering.

---

# 24. Placeholder Strategy

I currently have:

- Profile photo
- Short bio
- GitHub URL
- LinkedIn URL
- Resume

I am still gathering my project information.

Therefore:

**DO NOT wait for project information.**

Build the complete project system now.

Use one clearly marked placeholder project to prove the system works.

The placeholder must be easy to delete.

---

# 25. Important: Do Not Invent My Portfolio

Never invent:

- Work experience
- Companies
- Clients
- Project achievements
- Performance numbers
- Revenue
- User counts
- Awards
- Certifications
- Technologies I don't use

If information is missing:

Use a placeholder.

Example:

```text
[ADD EXPERIENCE HERE]
```

rather than inventing content.

---

# 26. Developer Experience

The repository should be easy for me to maintain.

Provide:

```text
README.md
```

Explain:

1. How to run the project
2. How to change personal information
3. How to add a project
4. How to add project images
5. How to mark a project confidential
6. How to make a project featured
7. How to generate the resume PDF
8. How to deploy

Adding a project later should require **minimal code changes**.

Ideally:

```text
1. Add MDX file
2. Add images
3. Done
```

---

# 27. Quality Requirements

Before considering Phase 1 complete:

- Run the production build
- Run lint
- Fix TypeScript errors
- Fix responsive layout issues
- Check all routes
- Check broken images
- Check navigation
- Check mobile menu
- Check project dynamic routing
- Check MDX rendering
- Check resume print layout
- Check dark/light mode if implemented
- Check accessibility basics

Do not simply tell me the application works.

Actually verify it.

---

# 28. Phase 1 Definition of Done

Phase 1 is complete when:

### UI

- Homepage looks production-ready
- Projects page looks production-ready
- Project detail template looks production-ready
- Resume page looks production-ready
- Mobile layout is polished
- Desktop layout is polished

### Architecture

- Content is separated from presentation
- Projects are MDX-driven
- Components are reusable
- Personal information has a central source
- NDA projects are supported
- Featured projects are supported

### PDF

- `/resume` prints correctly to A4
- Browser-only controls disappear when printing
- Page breaks are controlled

### Engineering

- TypeScript passes
- Lint passes
- Production build passes
- No unnecessary backend
- No database
- No fake portfolio information

---

# 29. Development Process

Work in this order:

1. Initialize Next.js project
2. Establish design tokens
3. Build typography system
4. Build global layout
5. Build Navbar/Footer
6. Build Hero
7. Build About
8. Build project architecture
9. Build ProjectCard
10. Build Projects page
11. Build MDX project detail page
12. Build Skills
13. Build Experience
14. Build Contact
15. Build Resume page
16. Implement print CSS
17. Add animations
18. Responsive refinement
19. Accessibility pass
20. SEO pass
21. Production build
22. Final QA

Do not rush into project content.

The primary goal is a **beautiful and extensible portfolio foundation**.

---

# Final Instruction

Start by inspecting the repository and existing files.

If this is a new project, initialize it cleanly.

Use the provided design reference as inspiration.

Build the application completely for Phase 1.

At the end, report:

- What was built
- Important architectural decisions
- Files/folders created
- How I can add projects later
- Any information still required from me
- QA/build results

Do not stop after creating a basic skeleton.

I want the UI to already look like a finished premium portfolio even though the real project content will be added later.