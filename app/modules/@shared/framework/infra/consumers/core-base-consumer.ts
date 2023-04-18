import { BaseModel } from '@ioc:Adonis/Lucid/Orm'

import { TransactionAdapter } from 'app/core/ports'
import {Message} from 'app/modules/@shared/domain/ports/message-bus'
import { RabbitmqMessageBusServiceImpl }
  from 'app/modules/@shared/framework/infra/services/rabbitmq-message-bus-service-impl'
import { TransactionAdapterImpl } from 'app/infra/db/adapters/transaction-adapter-impl'
import { CoreInboxMessagesModel } from '../db/models/core-inbox-messages-model'

export class CoreBaseConsumer {
  constructor (
    private readonly key: string,
    private readonly responsable: string,
    private readonly inboxModel: typeof BaseModel = CoreInboxMessagesModel,
    private readonly transactionAdapter: TransactionAdapter = new TransactionAdapterImpl(),
    private readonly messageBusService = RabbitmqMessageBusServiceImpl.getInstance(),
  ) {
    this.messageBusService.consume(this.key, this.handle.bind(this))
  }

  private async handle (message: Message, ack: () => void) : Promise<void> {
    await this.transactionAdapter.useTransaction(async (trx) => {
      const messageInbox = await this.inboxModel
        .query()
        .useTransaction(trx)
        .where({ metaOutboxId: message.$meta.outboxId })
        .first()

      if (messageInbox) {
        return
      }

      await this.inboxModel
        .create({
          responsable: this.responsable,
          type: message.type,
          payload: message.payload,
          metaUserId: message.$meta.userId,
          metaOutboxId: message.$meta.outboxId,
          complete: false,
          status: 'PENDING',
        }, trx)
    })

    await ack()
  }
}
