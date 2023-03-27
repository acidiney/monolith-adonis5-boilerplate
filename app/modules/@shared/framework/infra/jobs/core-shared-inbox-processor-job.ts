
import {JobsOptions} from 'bullmq'
import { JobContract } from '@ioc:Rocketseat/Bull'
import { CoreSharedInboxMessagesModel } from '../db/models/core-shared-inbox-messages-model'
import { SendEmailProcessor } from '../inbox-processor/send-email-processor'
import { InboxProcessorContract } from 'app/modules/@shared/domain/ports'
import { CoreOutboxMessageModel } from '../db'
import { ObjectId } from 'mongodb'
import { CoreBroadcastEnum } from 'app/modules/@shared/domain/types'
import {
  SaveNotificationProcessor,
} from 'app/modules/@shared/framework/infra/inbox-processor/save-notification-processor'

interface ProcessorContract {
  [key: string]: InboxProcessorContract<any>
}

export default class CoreSharedInboxProcessor implements JobContract {
  public key: string = CoreSharedInboxProcessor.name

  private readonly contracts: ProcessorContract = {
    [CoreBroadcastEnum.SEND_EMAIL]: new SendEmailProcessor(),
    [CoreBroadcastEnum.NOTIFY]: new SaveNotificationProcessor(),
  }

  public options: JobsOptions = {
    removeOnComplete: true,
  }

  public async handle () : Promise<void> {
    const message =
      await CoreSharedInboxMessagesModel.findOneAndUpdate({
        complete: false,
        status: 'PENDING',
      }, { $set: { status: 'STARTED' } })

    if (!message.value) {
      return
    }

    try {
      const contract = this.contracts[message.value.type]

      if (!contract) {
        throw new Error(`Contract ${message.value.type} not implemented!`)
      }

      await contract.perform({ ...message.value.payload, userId: message.value.meta.userId })

      await CoreOutboxMessageModel
        .findOneAndDelete({ _id: new ObjectId(message.value.meta.outboxId) }),

      await CoreSharedInboxMessagesModel
        .findOneAndDelete({
          _id: message.value._id,
        })
    } catch (e) {
      await CoreSharedInboxMessagesModel.findOneAndUpdate({ _id: message.value._id }, { $set: { status: 'PENDING' } })
      throw e
    }
  }
}
