import Env from '@ioc:Adonis/Core/Env'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'

Sentry.init({
  dsn: Env.get('SENTRY_DNS'),
  environment: Env.get('NODE_ENV'),
  tracesSampleRate: 1.0,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Mongo({
      useMongoose: true,
    }),
  ],
})
