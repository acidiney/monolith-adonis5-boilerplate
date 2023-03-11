import Bull from '@ioc:Rocketseat/Bull'
import CoreCommonInboxMessagesJob from 'app/modules/admin/common/framework/infra/jobs/core-common-inbox-messages-job'
import {every} from 'node-cron-expression'

Bull.add(CoreCommonInboxMessagesJob.name, {}, {
  repeat: {
    cron: every(1).minutes().toString(),
  },
})
