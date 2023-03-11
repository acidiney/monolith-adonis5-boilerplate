import OutboxProcessorJob from 'app/modules/@shared/framework/infra/jobs/outbox-processor-job'
import Bull from '@ioc:Rocketseat/Bull'
import {every} from 'node-cron-expression'

Bull.add(OutboxProcessorJob.name, {}, {
  repeat: {
    pattern: every(1).minutes().toString(),
  },
})
