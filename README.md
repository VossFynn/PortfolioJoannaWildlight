# Joanna Wildlight — Portfolio (Test Website)

> **Note:** This is a **test/demo website** built for a family friend — Joanna, a family
> and couples photographer from Bremen, Germany. It is not her official site (yet);
> it serves as a preview to try out the design and content with real photos.

## What's inside

A five-page portfolio site (Startseite, Über mich, Fotografie, Q+A, Kontakt) with a
warm "golden hour" look: hero carousel, playful collage elements (polaroid, sticker
badges, marquee lines), testimonial carousel, FAQ and a contact form. Plus `/impressum`
and `/datenschutz` (legal text still needs to be filled in — see below).

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Payload CMS](https://payloadcms.com) (embedded, admin at `/admin`) — Postgres +
  Cloudflare R2 for media
- Tailwind CSS v4 (design tokens as CSS custom properties)
- Deployed to Netlify

## Getting started

```bash
docker compose up -d   # local Postgres
npm install
npm run dev             # development → http://localhost:3000 (admin: /admin)
npm run seed             # one-time: load existing copy + photos into Payload
npm run build            # production build
```

Full technical documentation (architecture, content editing, CMS internals,
seed script) lives in [PROJECT_README.md](PROJECT_README.md) (German).
Deployment/account setup: [DEPLOYMENT.md](DEPLOYMENT.md).

## Status / known gaps

- Contact form submissions are stored in Payload (`/admin` → Contact Submissions);
  no outbound email notification is wired up yet (optional add-on, see DEPLOYMENT.md)
- `/impressum` and `/datenschutz` exist as routes but have no legal text yet —
  needs to come from Joanna (e.g. via an e-recht24.de generator), entered directly
  in the admin panel
- 2 of 3 testimonials are still placeholders (now trivially editable in `/admin`
  under Testimonials, no code change needed)

All photos © Joanna — please don't reuse them.
