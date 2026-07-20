import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "impressum_page_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "impressum_page_sections_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "impressum_page_sections_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "impressum_page_sections_pills" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "impressum_page_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "datenschutz_page_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "datenschutz_page_sections_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "datenschutz_page_sections_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "datenschutz_page_sections_pills" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "datenschutz_page_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"title" varchar NOT NULL
  );
  
  ALTER TABLE "impressum_page" ALTER COLUMN "headline" DROP DEFAULT;
  ALTER TABLE "datenschutz_page" ALTER COLUMN "headline" DROP DEFAULT;
  ALTER TABLE "impressum_page" ADD COLUMN "kicker" varchar DEFAULT 'RECHTLICHES · § 5 DDG' NOT NULL;
  ALTER TABLE "impressum_page" ADD COLUMN "subtitle" varchar NOT NULL;
  ALTER TABLE "impressum_page" ADD COLUMN "badge_label" varchar NOT NULL;
  ALTER TABLE "impressum_page" ADD COLUMN "note_title" varchar NOT NULL;
  ALTER TABLE "impressum_page" ADD COLUMN "note_body" varchar NOT NULL;
  ALTER TABLE "datenschutz_page" ADD COLUMN "kicker" varchar DEFAULT 'RECHTLICHES · DSGVO' NOT NULL;
  ALTER TABLE "datenschutz_page" ADD COLUMN "subtitle" varchar NOT NULL;
  ALTER TABLE "datenschutz_page" ADD COLUMN "badge_label" varchar NOT NULL;
  ALTER TABLE "datenschutz_page" ADD COLUMN "note_title" varchar NOT NULL;
  ALTER TABLE "datenschutz_page" ADD COLUMN "note_body" varchar NOT NULL;
  ALTER TABLE "impressum_page_marquee_items" ADD CONSTRAINT "impressum_page_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impressum_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impressum_page_sections_paragraphs" ADD CONSTRAINT "impressum_page_sections_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impressum_page_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impressum_page_sections_list" ADD CONSTRAINT "impressum_page_sections_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impressum_page_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impressum_page_sections_pills" ADD CONSTRAINT "impressum_page_sections_pills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impressum_page_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impressum_page_sections" ADD CONSTRAINT "impressum_page_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impressum_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "datenschutz_page_marquee_items" ADD CONSTRAINT "datenschutz_page_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."datenschutz_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "datenschutz_page_sections_paragraphs" ADD CONSTRAINT "datenschutz_page_sections_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."datenschutz_page_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "datenschutz_page_sections_list" ADD CONSTRAINT "datenschutz_page_sections_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."datenschutz_page_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "datenschutz_page_sections_pills" ADD CONSTRAINT "datenschutz_page_sections_pills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."datenschutz_page_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "datenschutz_page_sections" ADD CONSTRAINT "datenschutz_page_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."datenschutz_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "impressum_page_marquee_items_order_idx" ON "impressum_page_marquee_items" USING btree ("_order");
  CREATE INDEX "impressum_page_marquee_items_parent_id_idx" ON "impressum_page_marquee_items" USING btree ("_parent_id");
  CREATE INDEX "impressum_page_sections_paragraphs_order_idx" ON "impressum_page_sections_paragraphs" USING btree ("_order");
  CREATE INDEX "impressum_page_sections_paragraphs_parent_id_idx" ON "impressum_page_sections_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "impressum_page_sections_list_order_idx" ON "impressum_page_sections_list" USING btree ("_order");
  CREATE INDEX "impressum_page_sections_list_parent_id_idx" ON "impressum_page_sections_list" USING btree ("_parent_id");
  CREATE INDEX "impressum_page_sections_pills_order_idx" ON "impressum_page_sections_pills" USING btree ("_order");
  CREATE INDEX "impressum_page_sections_pills_parent_id_idx" ON "impressum_page_sections_pills" USING btree ("_parent_id");
  CREATE INDEX "impressum_page_sections_order_idx" ON "impressum_page_sections" USING btree ("_order");
  CREATE INDEX "impressum_page_sections_parent_id_idx" ON "impressum_page_sections" USING btree ("_parent_id");
  CREATE INDEX "datenschutz_page_marquee_items_order_idx" ON "datenschutz_page_marquee_items" USING btree ("_order");
  CREATE INDEX "datenschutz_page_marquee_items_parent_id_idx" ON "datenschutz_page_marquee_items" USING btree ("_parent_id");
  CREATE INDEX "datenschutz_page_sections_paragraphs_order_idx" ON "datenschutz_page_sections_paragraphs" USING btree ("_order");
  CREATE INDEX "datenschutz_page_sections_paragraphs_parent_id_idx" ON "datenschutz_page_sections_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "datenschutz_page_sections_list_order_idx" ON "datenschutz_page_sections_list" USING btree ("_order");
  CREATE INDEX "datenschutz_page_sections_list_parent_id_idx" ON "datenschutz_page_sections_list" USING btree ("_parent_id");
  CREATE INDEX "datenschutz_page_sections_pills_order_idx" ON "datenschutz_page_sections_pills" USING btree ("_order");
  CREATE INDEX "datenschutz_page_sections_pills_parent_id_idx" ON "datenschutz_page_sections_pills" USING btree ("_parent_id");
  CREATE INDEX "datenschutz_page_sections_order_idx" ON "datenschutz_page_sections" USING btree ("_order");
  CREATE INDEX "datenschutz_page_sections_parent_id_idx" ON "datenschutz_page_sections" USING btree ("_parent_id");
  ALTER TABLE "impressum_page" DROP COLUMN "body";
  ALTER TABLE "datenschutz_page" DROP COLUMN "body";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "impressum_page_marquee_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "impressum_page_sections_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "impressum_page_sections_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "impressum_page_sections_pills" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "impressum_page_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "datenschutz_page_marquee_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "datenschutz_page_sections_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "datenschutz_page_sections_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "datenschutz_page_sections_pills" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "datenschutz_page_sections" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "impressum_page_marquee_items" CASCADE;
  DROP TABLE "impressum_page_sections_paragraphs" CASCADE;
  DROP TABLE "impressum_page_sections_list" CASCADE;
  DROP TABLE "impressum_page_sections_pills" CASCADE;
  DROP TABLE "impressum_page_sections" CASCADE;
  DROP TABLE "datenschutz_page_marquee_items" CASCADE;
  DROP TABLE "datenschutz_page_sections_paragraphs" CASCADE;
  DROP TABLE "datenschutz_page_sections_list" CASCADE;
  DROP TABLE "datenschutz_page_sections_pills" CASCADE;
  DROP TABLE "datenschutz_page_sections" CASCADE;
  ALTER TABLE "impressum_page" ALTER COLUMN "headline" SET DEFAULT 'Impressum';
  ALTER TABLE "datenschutz_page" ALTER COLUMN "headline" SET DEFAULT 'Datenschutzerklärung';
  ALTER TABLE "impressum_page" ADD COLUMN "body" jsonb;
  ALTER TABLE "datenschutz_page" ADD COLUMN "body" jsonb;
  ALTER TABLE "impressum_page" DROP COLUMN "kicker";
  ALTER TABLE "impressum_page" DROP COLUMN "subtitle";
  ALTER TABLE "impressum_page" DROP COLUMN "badge_label";
  ALTER TABLE "impressum_page" DROP COLUMN "note_title";
  ALTER TABLE "impressum_page" DROP COLUMN "note_body";
  ALTER TABLE "datenschutz_page" DROP COLUMN "kicker";
  ALTER TABLE "datenschutz_page" DROP COLUMN "subtitle";
  ALTER TABLE "datenschutz_page" DROP COLUMN "badge_label";
  ALTER TABLE "datenschutz_page" DROP COLUMN "note_title";
  ALTER TABLE "datenschutz_page" DROP COLUMN "note_body";`)
}
