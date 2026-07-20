import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"author" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faq_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "photo_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"headline" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "photo_categories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "contact_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"occasion" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"source" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"testimonials_id" integer,
  	"faq_items_id" integer,
  	"photo_categories_id" integer,
  	"contact_submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_top" varchar NOT NULL,
  	"logo_bottom" varchar NOT NULL,
  	"logo_image_id" integer,
  	"footer_name" varchar NOT NULL,
  	"footer_tagline" varchar NOT NULL,
  	"footer_quote" varchar NOT NULL,
  	"footer_copyright" varchar NOT NULL,
  	"instagram_handle" varchar NOT NULL,
  	"instagram_url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "home_page_intro_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_services_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_title" varchar NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"hero_subtitle" varchar NOT NULL,
  	"intro_headline" varchar NOT NULL,
  	"intro_headline_mobile" varchar NOT NULL,
  	"intro_button_label" varchar NOT NULL,
  	"intro_button_href" varchar NOT NULL,
  	"intro_portrait_image_id" integer NOT NULL,
  	"intro_polaroid_image_id" integer NOT NULL,
  	"intro_sticker_label" varchar NOT NULL,
  	"services_headline" varchar NOT NULL,
  	"services_subline" varchar NOT NULL,
  	"services_button_label" varchar NOT NULL,
  	"services_button_href" varchar NOT NULL,
  	"works_headline" varchar NOT NULL,
  	"works_text" varchar NOT NULL,
  	"works_button_label" varchar NOT NULL,
  	"works_button_href" varchar NOT NULL,
  	"testimonials_headline" varchar NOT NULL,
  	"trust_instagram_text_before" varchar NOT NULL,
  	"trust_google_stars_line" varchar NOT NULL,
  	"trust_review_button_label" varchar NOT NULL,
  	"trust_review_url" varchar NOT NULL,
  	"cta_headline" varchar NOT NULL,
  	"cta_text" varchar,
  	"cta_button_label" varchar NOT NULL,
  	"cta_button_href" varchar NOT NULL,
  	"cta_quote" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "about_page_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_intro_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_passion_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_facts_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_title" varchar NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"headline" varchar NOT NULL,
  	"intro_portrait_image_id" integer NOT NULL,
  	"intro_headline" varchar NOT NULL,
  	"passion_headline" varchar NOT NULL,
  	"passion_image_id" integer NOT NULL,
  	"facts_headline" varchar NOT NULL,
  	"cta_headline" varchar NOT NULL,
  	"cta_text" varchar,
  	"cta_button_label" varchar NOT NULL,
  	"cta_button_href" varchar NOT NULL,
  	"cta_quote" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "photography_page_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "photography_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_title" varchar NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"headline" varchar NOT NULL,
  	"cta_headline" varchar NOT NULL,
  	"cta_text" varchar,
  	"cta_button_label" varchar NOT NULL,
  	"cta_button_href" varchar NOT NULL,
  	"cta_quote" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "faq_page_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "faq_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_title" varchar NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"headline" varchar NOT NULL,
  	"cta_headline" varchar NOT NULL,
  	"cta_text" varchar,
  	"cta_button_label" varchar NOT NULL,
  	"cta_button_href" varchar NOT NULL,
  	"cta_quote" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_form_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_title" varchar NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"headline" varchar NOT NULL,
  	"intro" varchar NOT NULL,
  	"form_name_label" varchar NOT NULL,
  	"form_email_label" varchar NOT NULL,
  	"form_phone_label" varchar NOT NULL,
  	"form_occasion_label" varchar NOT NULL,
  	"form_message_label" varchar NOT NULL,
  	"form_source_question" varchar NOT NULL,
  	"form_consent_text" varchar NOT NULL,
  	"form_submit_label" varchar NOT NULL,
  	"side_portrait_image_id" integer NOT NULL,
  	"side_sticker_label" varchar NOT NULL,
  	"side_headline" varchar NOT NULL,
  	"side_instagram_text_before" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "impressum_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_title" varchar NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"headline" varchar DEFAULT 'Impressum' NOT NULL,
  	"body" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "datenschutz_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_title" varchar NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"headline" varchar DEFAULT 'Datenschutzerklärung' NOT NULL,
  	"body" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "photo_categories_rels" ADD CONSTRAINT "photo_categories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."photo_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "photo_categories_rels" ADD CONSTRAINT "photo_categories_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_items_fk" FOREIGN KEY ("faq_items_id") REFERENCES "public"."faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_photo_categories_fk" FOREIGN KEY ("photo_categories_id") REFERENCES "public"."photo_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk" FOREIGN KEY ("contact_submissions_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_nav" ADD CONSTRAINT "site_settings_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_links" ADD CONSTRAINT "site_settings_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_image_id_media_id_fk" FOREIGN KEY ("logo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_hero_slides" ADD CONSTRAINT "home_page_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_hero_slides" ADD CONSTRAINT "home_page_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_intro_paragraphs" ADD CONSTRAINT "home_page_intro_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_marquee_items" ADD CONSTRAINT "home_page_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_services_cards" ADD CONSTRAINT "home_page_services_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_services_cards" ADD CONSTRAINT "home_page_services_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_intro_portrait_image_id_media_id_fk" FOREIGN KEY ("intro_portrait_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_intro_polaroid_image_id_media_id_fk" FOREIGN KEY ("intro_polaroid_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_marquee_items" ADD CONSTRAINT "about_page_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_intro_paragraphs" ADD CONSTRAINT "about_page_intro_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_passion_paragraphs" ADD CONSTRAINT "about_page_passion_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_facts_items" ADD CONSTRAINT "about_page_facts_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_intro_portrait_image_id_media_id_fk" FOREIGN KEY ("intro_portrait_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_passion_image_id_media_id_fk" FOREIGN KEY ("passion_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "photography_page_marquee_items" ADD CONSTRAINT "photography_page_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."photography_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_page_marquee_items" ADD CONSTRAINT "faq_page_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_form_sources" ADD CONSTRAINT "contact_page_form_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_side_portrait_image_id_media_id_fk" FOREIGN KEY ("side_portrait_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "faq_items_updated_at_idx" ON "faq_items" USING btree ("updated_at");
  CREATE INDEX "faq_items_created_at_idx" ON "faq_items" USING btree ("created_at");
  CREATE UNIQUE INDEX "photo_categories_slug_idx" ON "photo_categories" USING btree ("slug");
  CREATE INDEX "photo_categories_updated_at_idx" ON "photo_categories" USING btree ("updated_at");
  CREATE INDEX "photo_categories_created_at_idx" ON "photo_categories" USING btree ("created_at");
  CREATE INDEX "photo_categories_rels_order_idx" ON "photo_categories_rels" USING btree ("order");
  CREATE INDEX "photo_categories_rels_parent_idx" ON "photo_categories_rels" USING btree ("parent_id");
  CREATE INDEX "photo_categories_rels_path_idx" ON "photo_categories_rels" USING btree ("path");
  CREATE INDEX "photo_categories_rels_media_id_idx" ON "photo_categories_rels" USING btree ("media_id");
  CREATE INDEX "contact_submissions_updated_at_idx" ON "contact_submissions" USING btree ("updated_at");
  CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_faq_items_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_items_id");
  CREATE INDEX "payload_locked_documents_rels_photo_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("photo_categories_id");
  CREATE INDEX "payload_locked_documents_rels_contact_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_nav_order_idx" ON "site_settings_nav" USING btree ("_order");
  CREATE INDEX "site_settings_nav_parent_id_idx" ON "site_settings_nav" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_links_order_idx" ON "site_settings_footer_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_links_parent_id_idx" ON "site_settings_footer_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_logo_image_idx" ON "site_settings" USING btree ("logo_image_id");
  CREATE INDEX "home_page_hero_slides_order_idx" ON "home_page_hero_slides" USING btree ("_order");
  CREATE INDEX "home_page_hero_slides_parent_id_idx" ON "home_page_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "home_page_hero_slides_image_idx" ON "home_page_hero_slides" USING btree ("image_id");
  CREATE INDEX "home_page_intro_paragraphs_order_idx" ON "home_page_intro_paragraphs" USING btree ("_order");
  CREATE INDEX "home_page_intro_paragraphs_parent_id_idx" ON "home_page_intro_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "home_page_marquee_items_order_idx" ON "home_page_marquee_items" USING btree ("_order");
  CREATE INDEX "home_page_marquee_items_parent_id_idx" ON "home_page_marquee_items" USING btree ("_parent_id");
  CREATE INDEX "home_page_services_cards_order_idx" ON "home_page_services_cards" USING btree ("_order");
  CREATE INDEX "home_page_services_cards_parent_id_idx" ON "home_page_services_cards" USING btree ("_parent_id");
  CREATE INDEX "home_page_services_cards_image_idx" ON "home_page_services_cards" USING btree ("image_id");
  CREATE INDEX "home_page_intro_intro_portrait_image_idx" ON "home_page" USING btree ("intro_portrait_image_id");
  CREATE INDEX "home_page_intro_intro_polaroid_image_idx" ON "home_page" USING btree ("intro_polaroid_image_id");
  CREATE INDEX "home_page_rels_order_idx" ON "home_page_rels" USING btree ("order");
  CREATE INDEX "home_page_rels_parent_idx" ON "home_page_rels" USING btree ("parent_id");
  CREATE INDEX "home_page_rels_path_idx" ON "home_page_rels" USING btree ("path");
  CREATE INDEX "home_page_rels_media_id_idx" ON "home_page_rels" USING btree ("media_id");
  CREATE INDEX "about_page_marquee_items_order_idx" ON "about_page_marquee_items" USING btree ("_order");
  CREATE INDEX "about_page_marquee_items_parent_id_idx" ON "about_page_marquee_items" USING btree ("_parent_id");
  CREATE INDEX "about_page_intro_paragraphs_order_idx" ON "about_page_intro_paragraphs" USING btree ("_order");
  CREATE INDEX "about_page_intro_paragraphs_parent_id_idx" ON "about_page_intro_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "about_page_passion_paragraphs_order_idx" ON "about_page_passion_paragraphs" USING btree ("_order");
  CREATE INDEX "about_page_passion_paragraphs_parent_id_idx" ON "about_page_passion_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "about_page_facts_items_order_idx" ON "about_page_facts_items" USING btree ("_order");
  CREATE INDEX "about_page_facts_items_parent_id_idx" ON "about_page_facts_items" USING btree ("_parent_id");
  CREATE INDEX "about_page_intro_intro_portrait_image_idx" ON "about_page" USING btree ("intro_portrait_image_id");
  CREATE INDEX "about_page_passion_passion_image_idx" ON "about_page" USING btree ("passion_image_id");
  CREATE INDEX "photography_page_marquee_items_order_idx" ON "photography_page_marquee_items" USING btree ("_order");
  CREATE INDEX "photography_page_marquee_items_parent_id_idx" ON "photography_page_marquee_items" USING btree ("_parent_id");
  CREATE INDEX "faq_page_marquee_items_order_idx" ON "faq_page_marquee_items" USING btree ("_order");
  CREATE INDEX "faq_page_marquee_items_parent_id_idx" ON "faq_page_marquee_items" USING btree ("_parent_id");
  CREATE INDEX "contact_page_form_sources_order_idx" ON "contact_page_form_sources" USING btree ("_order");
  CREATE INDEX "contact_page_form_sources_parent_id_idx" ON "contact_page_form_sources" USING btree ("_parent_id");
  CREATE INDEX "contact_page_side_side_portrait_image_idx" ON "contact_page" USING btree ("side_portrait_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "faq_items" CASCADE;
  DROP TABLE "photo_categories" CASCADE;
  DROP TABLE "photo_categories_rels" CASCADE;
  DROP TABLE "contact_submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_nav" CASCADE;
  DROP TABLE "site_settings_footer_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "home_page_hero_slides" CASCADE;
  DROP TABLE "home_page_intro_paragraphs" CASCADE;
  DROP TABLE "home_page_marquee_items" CASCADE;
  DROP TABLE "home_page_services_cards" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_rels" CASCADE;
  DROP TABLE "about_page_marquee_items" CASCADE;
  DROP TABLE "about_page_intro_paragraphs" CASCADE;
  DROP TABLE "about_page_passion_paragraphs" CASCADE;
  DROP TABLE "about_page_facts_items" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "photography_page_marquee_items" CASCADE;
  DROP TABLE "photography_page" CASCADE;
  DROP TABLE "faq_page_marquee_items" CASCADE;
  DROP TABLE "faq_page" CASCADE;
  DROP TABLE "contact_page_form_sources" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "impressum_page" CASCADE;
  DROP TABLE "datenschutz_page" CASCADE;`)
}
