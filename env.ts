/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),
  APP_INTERNAL_URL: Env.schema.string(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  CACHE_VIEWS: Env.schema.boolean(),
  SESSION_DRIVER: Env.schema.string(),
  DRIVE_DISK: Env.schema.enum(['local'] as const),
  NODE_ENV: Env.schema.enum(['development', 'production', 'test', 'seeding'] as const),
  MYSQL_HOST: Env.schema.string({ format: 'host' }),
  SENTRY_DNS: Env.schema.string(),
  MYSQL_PORT: Env.schema.number(),
  MYSQL_USER: Env.schema.string(),
  MYSQL_PASSWORD: Env.schema.string.optional(),
  MYSQL_DB_NAME: Env.schema.string(),
  BULL_REDIS_HOST: Env.schema.string({ format: 'host' }),
  BULL_REDIS_PORT: Env.schema.number.optional(),
  BULL_REDIS_PASSWORD: Env.schema.string.optional(),
  GITLAB_URL: Env.schema.string({ format: 'url' }),
  SMTP_HOST: Env.schema.string({ format: 'host' }),
  SMTP_PORT: Env.schema.number(),
  SMTP_USERNAME: Env.schema.string(),
  SMTP_PASSWORD: Env.schema.string(),
  MAIL_FROM: Env.schema.string(),
  DB_CONNECTION: Env.schema.string(),
  IN_STAGGING: Env.schema.boolean.optional(),
  MESSAGE_BUS_URL: Env.schema.string(),
})
