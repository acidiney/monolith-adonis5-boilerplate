import { JobsOptions } from 'bullmq'
import { everyMinute } from 'node-cron-expression'

import { JobContract } from '@ioc:Rocketseat/Bull'

export default class OutboxRelayJob implements JobContract {
  public key = OutboxRelayJob.name

  public options: JobsOptions = {
    removeOnComplete: true,
    repeat: {
      pattern: everyMinute(1).toString(),
    },
  }
  public async handle () {}
}
