# Deployment — Netlify + Payload CMS

Diese App ist kein statischer Export mehr (kein GitHub Pages). Sie läuft als
echte Next.js-App mit eingebettetem Payload CMS (`/admin`), Postgres-Datenbank
und Cloudflare R2 für Medien. Alles im Code ist fertig — die folgenden
Schritte brauchen deinen eigenen Account/Zugriff und lassen sich nicht von
hier aus erledigen.

## 1. Repo mit Netlify verbinden

1. [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project** → GitHub-Repo auswählen.
2. Build-Einstellungen übernimmt Netlify aus `netlify.toml` automatisch (Build-Command `npm run migrate && next build`, Next.js-Plugin).
3. Noch **nicht** deployen — erst die Umgebungsvariablen unten setzen, sonst schlägt der erste Build fehl (keine Datenbank).

## 2. Datenbank — Netlify DB (Neon), ohne separaten Account

Netlify hat eine eingebaute Postgres-Datenbank (auf Basis von Neon), die sich
direkt aus dem Netlify-Dashboard/CLI provisionieren lässt — kein extra
Neon-Signup nötig:

```bash
netlify link          # falls lokal noch nicht mit der Site verknüpft
netlify db init
```

Das legt eine Postgres-Datenbank an und setzt automatisch die Env-Var
`NETLIFY_DATABASE_URL` auf der Site — genau das, was `payload.config.ts`
erwartet (`DATABASE_URI` als Fallback für lokale Overrides).

Alternativ manuell im Dashboard: **Site → Extensions → Neon** hinzufügen.

## 3. Cloudflare R2 (Medien-Speicher)

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **R2** → Bucket anlegen (z. B. `joanna-wildlight-media`).
2. **R2 → Manage API Tokens** → Token mit Read+Write auf den Bucket erstellen → Access Key ID + Secret Access Key notieren.
3. Bucket → **Settings → Public Access** aktivieren (oder einen eigenen Domain-Connect einrichten) → die öffentliche URL (z. B. `https://pub-xxxx.r2.dev` oder eine eigene Subdomain) notieren.
4. In Netlify → **Site configuration → Environment variables** setzen:

   | Variable | Wert |
   |---|---|
   | `R2_BUCKET` | Bucket-Name |
   | `R2_ACCESS_KEY_ID` | aus Schritt 2 |
   | `R2_SECRET_ACCESS_KEY` | aus Schritt 2 |
   | `R2_ENDPOINT` | `https://<account-id>.r2.cloudflarestorage.com` |
   | `R2_PUBLIC_URL` | öffentliche Bucket-URL aus Schritt 3 (ohne trailing slash) |

## 4. Weitere Umgebungsvariablen

| Variable | Wert |
|---|---|
| `PAYLOAD_SECRET` | zufälliger String, z. B. `openssl rand -base64 32` |
| `NEXT_PUBLIC_SITE_URL` | die finale Domain, z. B. `https://joanna-wildlight.netlify.app` (nach dem ersten Deploy bekannt, danach nachtragen und neu deployen) |

`DATABASE_URI` **nicht** setzen, wenn Netlify DB verwendet wird — Payload
fällt automatisch auf `NETLIFY_DATABASE_URL` zurück.

## 5. Deploy auslösen

Jetzt in Netlify **Deploy site** klicken (oder `git push`). Der Build läuft
`payload migrate` (wendet `migrations/` an) und danach `next build`.

## 6. Ersten Admin-User anlegen

Nach dem ersten erfolgreichen Deploy: `https://<deine-domain>/admin`
aufrufen — Payload zeigt automatisch ein Formular zum Anlegen des ersten
Admin-Accounts (E-Mail + Passwort), sobald noch kein User existiert.

## 7. Inhalte übertragen (einmalig)

Die Datenbank ist nach dem ersten Deploy leer (Schema ja, Inhalte nein).
Zwei Optionen:

- **Empfohlen:** lokal gegen die Produktions-DB seeden — `DATABASE_URI`
  lokal auf die Netlify-DB-Connection-String setzen (`netlify env:get
  NETLIFY_DATABASE_URL`) und die R2-Variablen aus Schritt 3 in `.env.local`
  eintragen, dann `npm run seed` laufen lassen. Landet direkt in der echten
  Datenbank/im echten Bucket.
- **Manuell:** alle Texte/Fotos direkt im Admin-Panel eintragen (mehr
  Aufwand, aber kein Terminal-Zugriff nötig).

## 8. Rechtstexte ergänzen

`/impressum` und `/datenschutz` existieren als Seiten, sind aber inhaltlich
leer (siehe TODO-Hinweise in den jeweiligen Payload-Globals). Rechtstext
z. B. über [e-recht24.de](https://www.e-recht24.de) generieren (Angaben zu
Hosting bei Netlify, Datenbank bei Neon/Netlify, Medien bei Cloudflare R2
nicht vergessen) und im Admin-Panel unter „Impressum“ / „Datenschutz“
eintragen.

## Optional: E-Mail-Benachrichtigung bei Kontaktanfragen

Aktuell landen Kontaktanfragen nur in `/admin` unter „Contact Submissions“
(kein Mail-Versand). Für eine Benachrichtigungsmail: `@payloadcms/email-resend`
installieren, `email: resendAdapter({ apiKey: process.env.RESEND_API_KEY,
defaultFromAddress, defaultFromName })` in `payload.config.ts` ergänzen und
in einem `afterChange`-Hook auf der `ContactSubmissions`-Collection eine Mail
verschicken. Ohne `RESEND_API_KEY` läuft alles wie gehabt, nur ohne Mail.
