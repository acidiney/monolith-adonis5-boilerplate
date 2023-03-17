import CoreOutboxProcessorJob from 'app/modules/@shared/framework/infra/jobs/core-outbox-processor-job'
import Bull from '@ioc:Rocketseat/Bull'
import {every} from 'node-cron-expression'

Bull.add(CoreOutboxProcessorJob.name, {}, {
  repeat: {
    pattern: every(1).minutes().toString(),
  },
})
