
import { JobContract } from '@ioc:Rocketseat/Bull'
import {JobsOptions} from 'bullmq'

export default class CoreCommonInboxMessagesJob implements JobContract {
  public key: string = CoreCommonInboxMessagesJob.name

  public options: JobsOptions = {
    removeOnComplete: true,
  }

  public async handle () : Promise<void> {
    // Todo: need to implement a strategy to do processing and after that notify both
    //  commonInboxMessage and broker that was delivered
  }
}
