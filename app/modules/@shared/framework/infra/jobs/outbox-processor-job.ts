import { JobsOptions } from 'bullmq'

import { JobContract } from '@ioc:Rocketseat/Bull'

export default class OutboxProcessorJob implements JobContract {
  public key = OutboxProcessorJob.name

  public options: JobsOptions = {
    removeOnComplete: true,
  }

  public async handle () {
  }
}
