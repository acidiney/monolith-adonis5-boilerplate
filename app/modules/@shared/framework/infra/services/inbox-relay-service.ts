import Bull from '@ioc:Rocketseat/Bull'
import CoreSharedInboxProcessor from '../jobs/core-shared-inbox-processor-job'

Bull.add(CoreSharedInboxProcessor.name, {}, {
  repeat: {
    immediately: true,
    every: 3_000,
  },
})
