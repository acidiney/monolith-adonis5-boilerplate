import Bull from '@ioc:Rocketseat/Bull'
import {every} from 'node-cron-expression'
import CoreSharedInboxProcessor from '../jobs/core-shared-inbox-processor-job'

Bull.add(CoreSharedInboxProcessor.name, {}, {
  repeat: {
    pattern: every(1).minutes().toString(),
  },
})
