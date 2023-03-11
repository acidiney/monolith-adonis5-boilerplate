
import { JobContract } from '@ioc:Rocketseat/Bull'
import {JobsOptions} from 'bullmq'

export default class CoreCommonInboxMessagesJob implements JobContract {
  public key: string = CoreCommonInboxMessagesJob.name

  public options: JobsOptions = {
    removeOnComplete: true,
  }

  public async handle () : Promise<void> {
    console.log(CoreCommonInboxMessagesJob.name, new Date())
  }
}
