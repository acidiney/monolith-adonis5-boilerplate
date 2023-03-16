
import { JobContract } from '@ioc:Rocketseat/Bull'
import {JobsOptions} from 'bullmq'
import { CoreSharedInboxMessagesModel } from '../db/models/core-shared-inbox-messages-model'

export default class CoreSharedInboxProcessor implements JobContract {
  public key: string = CoreSharedInboxProcessor.name

  public options: JobsOptions = {
    removeOnComplete: true,
  }

  public async handle () : Promise<void> {
    try {
      console.log(CoreSharedInboxProcessor.name)
      const message = await CoreSharedInboxMessagesModel
        .findOne({
          complete: false,
        })

      if (!message) {
        return
      }

      // Todo: implement stategy contract dispatcher

      // Todo: Delete from CoreSharedInboxMessagesModel and OutboxModel
    } catch (e) {
      throw e
    }
  }
}
