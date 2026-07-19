# Joanna Wildlight — Portfolio (Test Website)

> **Note:** This is a **test/demo website** built for a family friend — Joanna, a family
> and couples photographer from Bremen, Germany. It is not her official site (yet);
> it serves as a preview to try out the design and content with real photos.

**Live preview:** https://vossfynn.github.io/PortfolioJoannaWildlight/

## What's inside

A five-page portfolio site (Startseite, Über mich, Fotografie, Q+A, Kontakt) with a
warm "golden hour" look: hero carousel, playful collage elements (polaroid, sticker
badges, marquee lines), testimonial carousel, FAQ and a contact form.

## Tech stack

- [Next.js](https://nextjs.org) (App Router, static export) + TypeScript
- Tailwind CSS v4 (design tokens as CSS custom properties)
- Deployed to GitHub Pages via GitHub Actions on every push to `main`

## Getting started

```bash
npm install
npm run dev    # development → http://localhost:3000
npm run build  # static export → out/
```

Full technical documentation (architecture, content editing, image manifest,
CMS seam, deployment) lives in [PROJECT_README.md](PROJECT_README.md) (German).

## Status / known gaps

- Contact form is a client-side stub — no mail service connected yet
- 2 of 3 testimonials are placeholders
- Datenschutz / Impressum / Cookies links are not wired up

All photos © Joanna — please don't reuse them.
