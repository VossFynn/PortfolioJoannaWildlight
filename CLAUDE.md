# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Start here

Before making changes, read **`PROGRESS.md`** in the repo root (German). It's the running
session log for this project — what was done, why, and how, session by session, plus a
"Getroffene Entscheidungen" (decisions made) section at the bottom with rationale for
architectural choices. Treat it as the source of truth for recent history; `git log` alone
won't explain *why* something was built a certain way. After finishing a piece of work,
append a new entry to `PROGRESS.md` (new session or continuation of the current one)
describing what changed, why, and how it was verified — the next instance of Claude
depends on this.

`PROJECT_README.md` (German) has the architecture/folder-structure reference and CMS content
editing docs. `DEPLOYMENT.md` (German) covers Netlify/Neon/R2 account setup (not something
Claude can do from the CLI — needs the user's own account access).

## Commands

```bash
docker compose up -d                     # local Postgres (port 5433) — needed for npm run dev
npm run dev                              # dev server → http://localhost:3000, admin at /admin
npm run seed                             # one-time: load content/*.ts + public/images/ into Payload (local DB)

npm run build                            # production build (runs `next build`)
npm start                                # production server

npx eslint app components lib content collections globals scripts   # lint
npx tsc --noEmit                         # typecheck

npm run generate:types                   # regenerate payload-types.ts after a schema change
npm run migrate:create -- <name>         # create a new Postgres migration after a schema change
npm run migrate                          # apply pending migrations (also runs automatically on Netlify build)
```

There is no test suite in this repo (no test runner configured, no test files).

**Local content preview requires a seeded DB.** A fresh `docker compose up -d` starts an
empty Postgres — content pages (`/`, `/ueber-mich`, `/fotografie`, `/qa`, `/kontakt`) will
crash in `next dev` until `npm run seed` has been run against it.

## Architecture

Next.js App Router + TypeScript (strict) + Tailwind CSS v4, with **Payload CMS embedded
in the same Next.js app** (not a separate service) — Postgres for data, Cloudflare R2
(S3-compatible) for media. Deployed to Netlify; DB migrations run via `npm run migrate`
as part of the Netlify build command (`netlify.toml`), since Payload does not
auto-push schema changes in production.

### Two independent root layouts

`app/` has no top-level `layout.tsx`. It is split into two Next.js route groups that
**must stay siblings**, each with its own root `<html>`/`<body>`:

- `app/(frontend)/` — the public site (all pages, `layout.tsx`, `globals.css`)
- `app/(payload)/` — Payload's boilerplate (`/admin`, `/api`), wraps `@payloadcms/next`'s
  own `RootLayout`

Nesting one inside the other (e.g. reintroducing a true-root `app/layout.tsx` that wraps
`(payload)`) produces a doubled `<html>` and a client-side hydration crash on every
`/admin` route that looks like a server 500 but isn't (see `PROGRESS.md` Session 7 for the
full diagnosis). `icon.tsx`, `opengraph-image.tsx`, `robots.ts`, `sitemap.ts` stay at
true-root since they're metadata route handlers, not layouts.

### Content seam: everything goes through `ContentProvider`

Pages/components never query Payload directly. They call the interface in
`lib/content/provider.ts`:

```ts
getSiteContent() · getHeroImages() · getTestimonials() · getFaqItems()
getPhotoCategories() · getPageContent(page) · getLegalPage(slug)
```

`PayloadContentProvider` implements this via Payload's **Local API** (no HTTP round-trip,
runs directly in RSCs). `getContentProvider()` is the single swap point if the backend
ever changes. `content/*.ts` is seed-only source data now (read by `scripts/seed.ts`,
not the frontend).

### CMS modeling

- **Globals** (`globals/`): one per page — `SiteSettings`, `HomePage`, `AboutPage`,
  `PhotographyPage`, `FaqPage`, `ContactPage`, `ImpressumPage`, `DatenschutzPage`.
- **Collections** (`collections/`): `Media`, `Users`, `Testimonials`, `FaqItems`,
  `PhotoCategories` (ordered via an `order` field), `ContactSubmissions` (public `create`,
  `read` restricted to logged-in admins — contact form posts to
  `/api/contact-submissions`, see `lib/contact/submit.ts`).
- Content changes in `/admin` go live within ~60s via ISR (`export const revalidate = 60`
  in every `page.tsx`), no redeploy needed.

### Images

`components/primitives/PlaceholderImage.tsx` renders Payload media via `next/image`
(remote pattern configured off `R2_PUBLIC_URL` in `next.config.ts`), or a striped
design-fallback placeholder when no image is set — never an error. `Media.ts` has a
`beforeChange` hook that generates a 20px blurred JPEG data URI (`sharp`) on upload,
stored in `blurDataURL` and passed through as `next/image`'s `placeholder="blur"`.
Lightbox zoom is on by default for all content images (`expandable={false}` opts out).

**Never put `absolute` in a `className` passed to `PlaceholderImage`/`ArchImage`** — it
conflicts with their internal `relative` positioning and silently collapses the image to
0px. Use a wrapper div instead.

### Design tokens

All colors, radii, shadows, and sizes live exclusively in `app/globals.css` as `--jw-*`
custom properties on `:root`, mapped into the Tailwind theme via `@theme inline`
(Tailwind v4 — there is no `tailwind.config`). Components reference only token classes
(`bg-ivory`, `text-gold-dark`, …) or `var(--jw-*)`, never raw hex values.

### Copy convention

`AccentedText` fields: exactly one `*asterisk-wrapped*` span renders as an italic gold
accent (`<Accent>`), `\n` forces a line break (used for mobile headlines).

## Known environment quirks (macOS dev machine)

- `npx next build` crashes locally and reproducibly with `TypeError: Cannot read
  properties of undefined (reading 'split')` during parallel prerendering — caused by two
  different sharp/libvips versions loaded in the same process
  (`node_modules/@img/sharp-libvips-darwin-arm64` vs. `node_modules/next/node_modules/@img/...`).
  Does not occur on Netlify's Linux build. Not a code bug; not a blocker.
- `rtk next build` has been seen reporting a stale false-positive success. Use
  `npx next build` directly when actually verifying a build, and check the emitted route list.
