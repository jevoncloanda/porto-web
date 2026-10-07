# TAYO extraction notes

Review-only evidence. This file is outside the project manifest and public assets.

## Rules and portfolio conventions

Read `AGENTS.md`, `PROJECT_SPEC.md`, and `PROJECT_CASE_STUDY_AGENT_PROMPT.md`.
The requested `PROJECT_CASE STUDY PROMPT.md` does not exist; the repository's
`PROJECT_CASE_STUDY_AGENT_PROMPT.md` contains the canonical extraction standard.
Also read the user-supplied TAYO extraction brief and RTK instructions.
Used caveman for chat only, jevon-ui for visual judgment, and the Playwright skill
for browser workflow. The CLI package was unavailable in npm's offline cache;
the built-in browser's documented Playwright surface supplied capture and QA.

Inspected the existing project loader, frontmatter types, manifest generator,
MDX component map, project header/cover/card/listing/gallery, dynamic project
route, CSS tokens, and existing professional and personal case-study conventions.
Read the installed Next.js MDX and image guides. No parallel content system,
dependency, routing, listing redesign, or client-side diagram code was added.

## Evidence and published claims

Source checkouts: `tayo-booking` and `tayo-frontend`.
Both had substantial pre-existing uncommitted changes. Extraction reviewed the
current working implementation, not only committed history. No TAYO source edits
were made; generated frontend build output is the only runtime write there.

- Stack: backend `go.mod`; frontend `package.json`. Go/Gin, pgx/PostgreSQL,
  Next.js, React, and TypeScript are materially used.
- Year: backend Git history includes booking work dated 2026-09-24; migration
  filenames and current source also establish 2026. This is not a claimed start
  or completion date.
- Layering and routes: `cmd/api/main.go`, `internal/routes/routes.go`, services,
  repositories, models, domain errors, and frontend `lib/api/*`.
- Segment rules, shared transaction-scoped advisory locking, database-time hold
  filtering: `internal/repository/seat_occupancy.go`,
  `internal/repository/trip_repository.go`.
- Booking transaction and replay mapping: `internal/repository/booking_repository.go`,
  `internal/service/booking_service.go`, migration `20260922_booking_idempotency.sql`.
  Lock order is user/key then trip/seat. Admin status updates take the seat lock
  and recheck occupancy before reconfirming.
- Hold creation, ownership, release, conversion, and expiry:
  `internal/repository/seat_hold_repository.go`, `internal/service/seat_hold_service.go`,
  `internal/models/seat_hold.go`, migration `20260930_seat_holds.sql`.
  A confirmed *hold* creates a pending *booking*: no payment or admin approval implied.
- Frontend selection, stable retry key, server-time countdown, 409/410 recovery:
  `app/(passenger)/trips/[id]/seats/page.tsx`, `lib/api/seatHolds.ts`.
- Search, ordered boarding/destination selection, receipt, history, and operations:
  passenger routes, seat-map components, and `app/panel/*`.
- Sessions: `internal/handlers/auth_handler.go`,
  `internal/service/auth_service.go`, `internal/repository/refresh_token_repository.go`,
  frontend `hooks/useAuth.tsx` and `lib/api/client.ts`. HttpOnly cookie sessions,
  JWT validation, digest-based refresh token storage, transactional rotation,
  and shared in-flight frontend refresh are implemented.
- Runtime: readiness pings PostgreSQL with a timeout; health is separate.
  `internal/routes/routes.go` emits request IDs and structured request logs.
- Tests: booking and seat-hold repository integration tests assert adjacent
  reuse, overlap rejection, concurrency outcomes, replay, changed-payload
  conflicts, expiry boundaries, ownership, release, and admin reconfirmation.
  Handler/config/routes tests cover auth algorithms, missing/expired claims,
  authorization, validation, error contracts, origin checks, request IDs, and health.
- CI: backend workflow provisions PostgreSQL 17 and runs formatting/tests/vet;
  frontend workflow runs install/lint/typecheck/build. No hosted CI status verified.

## Attribution, inferences, and omitted claims

Published copy uses neutral project language. `role`, `period`, and external links
are omitted. The supplied brief permits describing the implementation, but does
not establish exact personal contribution or public repository/deployment URLs.
Human review should confirm role before adding first-person ownership.

The lock's serialization trade-off follows directly from the (trip, seat) scope;
it is not a performance measurement. The diagrams explain verified source behavior
using the existing demo route and illustrative competing requests.

No claims about independently inventing advisory locks, unaided development,
production users, revenue, commercial deployment, throughput, zero downtime,
enterprise scale, or hosted CI passing. No invented lessons or quantified impact.
Supabase is documented as the managed development PostgreSQL environment, but
captures used local PostgreSQL and the public stack does not imply Supabase was
used during this extraction. Payment and resale are explicitly out of scope.

## Runtime and demo data

Installed PostgreSQL 18.6 ran as an isolated loopback-only cluster on port 55439.
No existing database, Supabase instance, or real credentials were used.
The empty disposable database received the repository's existing migrations in
filename order, with `pgcrypto` and the minimal `auth.users` prerequisite used
by the application's documented SQL authentication. No source schema changes.

Existing `cmd/demo` tooling: `inspect` confirmed all eight application tables
empty, then `seed --confirm-development` created 4 fictional accounts, 10 stops,
6 routes, 21 route stops, 6 buses, 192 seats, 18 trips, and 14 bookings. Seed dates
were October 6–8, 2026 in Jakarta. A random demo-only password and random JWT secret
were generated locally and never published. No demo reset or production mutation.

The seeded first Jakarta–Bandung–Cirebon–Semarang trip reuses A1 for Passenger A's
Jakarta–Bandung booking and Passenger B's Bandung–Semarang booking. A1 is unavailable
for Jakarta–Semarang; database integration tests independently exercised valid
adjacent writes and rejected overlapping writes. B1 is pending; cancelled A2 is free.
Browser capture created a hold for C2 and converted it to one pending booking.
A second hold for D2 naturally expired after five minutes; the real UI cleared
selection, restored availability, and displayed the recovery alert.

Backend: `go run ./cmd/api`, explicit development variables overriding dotenv,
local database, default 300-second holds, API on 8080, allowed frontend origin 3002.
Frontend: existing `npm run build`, then `npm run start -- --port 3002`.
Development mode was stopped before final capture to remove Next.js debug controls.
Portfolio: `npm run build`, then `npm run start -- --port 3000` for review.
No global package installation. Windows `pg_ctl start` could not create a restricted
token; launching the installed `postgres.exe` directly worked. Go telemetry could
not write its upload-token cache in the sandbox; tests and vet still exited zero.

## Screenshot manifest and curation

Real browser captures, JPEG intermediates converted to WebP quality 90 using
installed Sharp. No fake interface, code screenshot, database-console capture,
redaction, blur, or generated replacement. Browser content only, no address bar.
Requested desktop viewport 1440 × 900. Built-in screenshot paths yielded either
1440 × 900 or 1425 × 891 content images; these are the nearest stable equivalents.
All visible operational data is the existing fictional seed or local demo actions.

| Final file | Screen | Size | Alt/context | Use |
| --- | --- | --- | --- | --- |
| `search.webp` | `/` | 1425 × 891 | TAYO search and populated upcoming fictional trips | Retained context candidate |
| `segment-selection.webp` | `/trips/[id]` | 1440 × 900 | Boarding in Jakarta; downstream Bandung/Cirebon/Semarang choices | Embedded figure |
| `seat-hold.webp` | `/trips/[id]/seats` | 1425 × 891 | C2 selected, route segment, five-minute countdown, confirmation | Cover and embedded figure |
| `booking-detail.webp` | `/bookings/[id]?booked=true` | 1440 × 900 | Successful C2 booking, pending state, route, dates, price | Embedded figure |
| `expiry.webp` | `/trips/[id]/seats` | 1425 × 891 | Expired-hold alert; D2 available again | Retained recovery candidate |

Six candidate screens captured: search, segment selection, active hold, receipt,
history, expiry. History was rejected because it repeats receipt information and
adds little to the engineering story. Search and segment selection were retaken
after the initial 1280 × 720 browser viewport; final captures contain no dev overlay.
No generic admin capture: CRUD tables would not clarify the reservation problem.
Five final files only are retained in `public/projects/tayo/`. No manual retake required.

## Content and visuals

Created `content/projects/tayo.mdx`. Frontmatter: factual title/subtitle/summary,
2026, personal, Reservation Systems, unfeatured, non-confidential, non-placeholder,
order 3, six verified technologies, active-hold cover and descriptive alt text.
Ordering follows existing year/order rules; listing automatically discovers TAYO.
No duplicate gallery metadata; the three figures appear within the narrative.

Structure: Overview; A Seat Belongs to a Segment; The Database Makes the Decision;
A Hold Is Temporary, a Booking Is Durable; Proof & Current Scope.

Added `SegmentOccupancy` and `ReservationFlow` to existing `CaseStudyVisuals.tsx`
and registered them in the existing MDX map. They reuse VisualFrame, StepCard,
FlowArrow, colors, type, and borders. Stop names, journeys, outcomes, and transaction
step text live in MDX props, not components. Both are server-rendered with no new
animation or interactivity. README documents props and private extraction placement.

## Validation and privacy review

- Backend `go test ./...`: passed, with `TEST_DATABASE_URL` set to the isolated
  local database, so database integration tests ran rather than skipped.
- Backend `go vet ./...`: passed.
- TAYO frontend production build: passed, including its type/lint build checks.
- Porto-web `npm run lint`: passed.
- Porto-web `npm run typecheck`: passed.
- Porto-web `npm run build`: passed; TAYO statically generated. First attempt was
  blocked fetching the existing Google Poppins font; network-enabled rerun passed.
- `git diff --check`: passed.
- Browser QA: desktop 1440 × 900, tablet 768 × 1024, mobile 390 × 844.
  No horizontal overflow; all four rendered images loaded. Diagram text/intervals,
  caption wrapping, screenshot aspect ratios, and project cover inspected visually.
  Mobile menu opens/closes via Escape; keyboard focus on All projects has a visible
  solid outline. Project index link returns to TAYO; adjacent-project links resolve.
  No portfolio console warnings/errors captured. Source search, ordered-stop
  selection, and seat map also inspected at mobile width without overflow.
- Accessible h1/h2 structure, alt text, semantic figure captions, textual interval
  outcomes independent of color, and inherited reduced-motion/focus rules preserved.
  No full automated accessibility audit claimed.
- All asset URLs resolve; extraction-note URL probes return 404. Rendered HTML
  contains no local source paths, credentials, database URLs, or demo passwords.
  Notes are not imported by the manifest or client components and are not public.

## Human review

Ready for human review. Confirm personal role/contribution and optional public links
before adding them. Review the neutral narrative and active-hold thumbnail. No commit,
push, deployment, or other-project extraction was performed. Temporary raw captures,
QA panels, runtime helper scripts, and disposable database credentials are removed
after validation; generated build caches remain as normal local development output.
