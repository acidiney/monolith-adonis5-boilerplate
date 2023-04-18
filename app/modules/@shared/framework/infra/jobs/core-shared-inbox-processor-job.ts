import { TransactionAdapter } from 'app/core/ports'

import {JobsOptions} from 'bullmq'
import { JobContract } from '@ioc:Rocketseat/Bull'

import { CoreOutboxMessageModel } from '../db'
import {
  SaveActivityProcessor,
  SaveNotificationProcessor,
  SendEmailProcessor,
} from 'app/modules/@shared/framework/infra/inbox-processor'
import { CoreBroadcastEnum } from 'app/modules/@shared/domain/types'
import { InboxProcessorContract } from 'app/modules/@shared/domain/ports'
import {HashDriverAdapterImpl} from 'app/modules/auth/framework/infra/adapters'
import { CoreInboxMessagesModel } from '../db/models/core-inbox-messages-model'
import { TransactionAdapterImpl } from 'app/infra/db/adapters/transaction-adapter-impl'

interface ProcessorContract {
  [key: string]: InboxProcessorContract<any>
}

export default class CoreSharedInboxProcessor implements JobContract {
  public key: string = CoreSharedInboxProcessor.name

  private readonly contracts: ProcessorContract = {
    [CoreBroadcastEnum.SEND_EMAIL]: new SendEmailProcessor(),
    [CoreBroadcastEnum.NOTIFY]: new SaveNotificationProcessor(),
    [CoreBroadcastEnum.TRACK_ACTIVITY]: new SaveActivityProcessor(new HashDriverAdapterImpl()),
  }

  public options: JobsOptions = {
    removeOnComplete: true,
  }

  constructor (
    private readonly transactionAdapter: TransactionAdapter = new TransactionAdapterImpl()
  ) {}

  public async handle () : Promise<void> {
    await this.transactionAdapter.useTransaction(async (trx) => {
      const message = await CoreInboxMessagesModel.query()
        .useTransaction(trx)
        .forUpdate()
        .skipLocked()
        .where({
          responsable: 'CORE_SHARED',
          complete: false,
          status: 'PENDING',
        }).first()

      if (!message) {
        return
      }

      const contract = this.contracts[message.type]

      if (!contract) {
        throw new Error(`Contract ${message.type} not implemented!`)
      }

      await contract.perform({ ...message.payload, userId: message.metaUserId })

      await CoreOutboxMessageModel
        .query()
        .useTransaction(trx)
        .where({
          id: message.metaOutboxId,
        })
        .delete()

      await CoreInboxMessagesModel
        .query()
        .useTransaction(trx)
        .where({
          id: message.id,
        })
        .delete()
    })
  }
}
