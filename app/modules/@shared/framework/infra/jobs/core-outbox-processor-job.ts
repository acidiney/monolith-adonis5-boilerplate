import { TransactionAdapter } from 'app/core/ports'
import { JobsOptions } from 'bullmq'

import { JobContract } from '@ioc:Rocketseat/Bull'

import {MessageBus} from 'app/modules/@shared/domain/ports/message-bus'
import {
  RabbitmqMessageBusServiceImpl,
} from 'app/modules/@shared/framework/infra/services/rabbitmq-message-bus-service-impl'
import {CoreOutboxMessageModel} from 'app/modules/@shared/framework/infra/db/models/core-outbox-message-model'
import { TransactionAdapterImpl } from 'app/infra/db/adapters/transaction-adapter-impl'

export default class CoreOutboxProcessorJob implements JobContract {
  public key = CoreOutboxProcessorJob.name

  constructor (
    private readonly messageBus: MessageBus = RabbitmqMessageBusServiceImpl.getInstance(),
    private readonly transactionAdapter: TransactionAdapter = new TransactionAdapterImpl()
  ) {
  }

  public options: JobsOptions = {
    removeOnComplete: true,
  }

  public async handle () {
    await this.transactionAdapter.useTransaction(async (trx) => {
      const message = await CoreOutboxMessageModel
        .query()
        .useTransaction(trx)
        .whereNull('sentAt')
        .orderBy('createdAt')
        .forUpdate()
        .skipLocked()
        .first()

      if (!message) {
        return
      }

      await this.messageBus.publish(
        message.routingKey,
        {
          type: message.type,
          payload: message.payload,
          $meta: {
            outboxId: message.id,
            userId: message.metaUserId,
          },
        }
      )

      await CoreOutboxMessageModel
        .query()
        .useTransaction(trx)
        .where({
          id: message.id,
        }).update({
          sentAt: new Date(),
        })
    })
  }
}
