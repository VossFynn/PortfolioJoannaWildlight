/**
 * Runs automatically before `payload migrate` (via the npm "premigrate" hook).
 *
 * Payload's Postgres adapter writes a `batch = -1` sentinel row into
 * `payload_migrations` whenever it pushes schema changes directly (dev mode).
 * If that row is present, `payload migrate` opens an interactive confirmation
 * prompt with no flag to skip it — which hangs forever in a non-interactive
 * CI environment like a Netlify build (no TTY to answer it).
 *
 * Deleting the marker isn't enough on its own: dev-mode push already created
 * the real tables, so a plain `payload migrate` would then try to CREATE
 * TABLE on tables that already exist and fail. So if the marker is present
 * and the schema already looks fully pushed (a core Payload table exists),
 * every currently defined migration is recorded as already applied instead
 * of re-run.
 */
import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Client } from "pg";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.resolve(dirname, "../migrations");

const connectionString = process.env.DATABASE_URI ?? process.env.NETLIFY_DATABASE_URL;

if (!connectionString) {
  console.log("[clear-dev-migration-marker] No DATABASE_URI/NETLIFY_DATABASE_URL set, skipping.");
  process.exit(0);
}

const client = new Client({ connectionString });

try {
  await client.connect();

  const { rows: migTable } = await client.query(
    "SELECT to_regclass('public.payload_migrations') AS reg",
  );
  if (!migTable[0]?.reg) {
    console.log("[clear-dev-migration-marker] payload_migrations table does not exist yet, skipping.");
    process.exit(0);
  }

  const { rows: devMarkerRows } = await client.query(
    "SELECT 1 FROM payload_migrations WHERE batch = -1 LIMIT 1",
  );
  if (devMarkerRows.length === 0) {
    console.log("[clear-dev-migration-marker] No dev-mode marker found, nothing to do.");
    process.exit(0);
  }

  const { rows: usersTable } = await client.query("SELECT to_regclass('public.users') AS reg");
  const schemaAlreadyPushed = Boolean(usersTable[0]?.reg);

  if (schemaAlreadyPushed) {
    const migrationNames = readdirSync(migrationsDir)
      .filter((f) => f.endsWith(".ts") && f !== "index.ts")
      .map((f) => f.replace(/\.ts$/, ""))
      .sort();

    const { rows: existing } = await client.query(
      "SELECT name FROM payload_migrations WHERE batch != -1",
    );
    const alreadyRecorded = new Set(existing.map((r) => r.name));

    for (const name of migrationNames) {
      if (!alreadyRecorded.has(name)) {
        await client.query(
          "INSERT INTO payload_migrations (name, batch) VALUES ($1, 1)",
          [name],
        );
        console.log(`[clear-dev-migration-marker] Marked "${name}" as already applied (schema was dev-pushed).`);
      }
    }
  }

  const result = await client.query("DELETE FROM payload_migrations WHERE batch = -1");
  console.log(`[clear-dev-migration-marker] Removed ${result.rowCount} dev-mode marker row(s).`);
} finally {
  await client.end();
}
