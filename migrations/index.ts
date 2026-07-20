import * as migration_20260720_160913_initial_schema from './20260720_160913_initial_schema';
import * as migration_20260720_185846_media_blur_data_url from './20260720_185846_media_blur_data_url';

export const migrations = [
  {
    up: migration_20260720_160913_initial_schema.up,
    down: migration_20260720_160913_initial_schema.down,
    name: '20260720_160913_initial_schema',
  },
  {
    up: migration_20260720_185846_media_blur_data_url.up,
    down: migration_20260720_185846_media_blur_data_url.down,
    name: '20260720_185846_media_blur_data_url'
  },
];
