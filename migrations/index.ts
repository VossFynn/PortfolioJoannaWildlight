import * as migration_20260720_160913_initial_schema from './20260720_160913_initial_schema';
import * as migration_20260720_185846_media_blur_data_url from './20260720_185846_media_blur_data_url';
import * as migration_20260720_222202_legal_page_sections from './20260720_222202_legal_page_sections';
import * as migration_20260720_223835_add_contact_notification_email from './20260720_223835_add_contact_notification_email';

export const migrations = [
  {
    up: migration_20260720_160913_initial_schema.up,
    down: migration_20260720_160913_initial_schema.down,
    name: '20260720_160913_initial_schema',
  },
  {
    up: migration_20260720_185846_media_blur_data_url.up,
    down: migration_20260720_185846_media_blur_data_url.down,
    name: '20260720_185846_media_blur_data_url',
  },
  {
    up: migration_20260720_222202_legal_page_sections.up,
    down: migration_20260720_222202_legal_page_sections.down,
    name: '20260720_222202_legal_page_sections',
  },
  {
    up: migration_20260720_223835_add_contact_notification_email.up,
    down: migration_20260720_223835_add_contact_notification_email.down,
    name: '20260720_223835_add_contact_notification_email'
  },
];
