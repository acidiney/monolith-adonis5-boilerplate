import CoreOutboxProcessorJob from 'app/modules/@shared/framework/infra/jobs/core-outbox-processor-job'
import Bull from '@ioc:Rocketseat/Bull'

Bull.add(CoreOutboxProcessorJob.name, {}, {
  repeat: {
    immediately: true,
    every: 10_000,
  },
})
