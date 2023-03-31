import { MongodbTransactionAdapterImpl } from 'app/infra/db/adapters/mongodb-transaction-adapter-impl'
import { TransactionAdapter } from 'app/core/ports'
import { JobsOptions } from 'bullmq'

import { JobContract } from '@ioc:Rocketseat/Bull'

import {MessageBus} from 'app/modules/@shared/domain/ports/message-bus'
import {
  RabbitmqMessageBusServiceImpl,
} from 'app/modules/@shared/framework/infra/services/rabbitmq-message-bus-service-impl'
import {CoreOutboxMessageModel} from 'app/modules/@shared/framework/infra/db/models/core-outbox-message-model'

export default class CoreOutboxProcessorJob implements JobContract {
  public key = CoreOutboxProcessorJob.name

  constructor (
    private readonly messageBus: MessageBus = RabbitmqMessageBusServiceImpl.getInstance(),
    private readonly transactionAdapter: TransactionAdapter = new MongodbTransactionAdapterImpl()
  ) {
  }

  public options: JobsOptions = {
    removeOnComplete: true,
  }

  public async handle () {
    await this.transactionAdapter.useTransaction(async (session) => {
      const message = await CoreOutboxMessageModel
        .findOne({
          sentAt: null,
        }, { session })

      if (!message) {
        return
      }

      await this.messageBus.publish(
        message.routingKey,
        {
          type: message.type,
          payload: message.payload,
          $meta: {
            outboxId: message._id.toString(),
            userId: message.meta.userId,
          },
        }
      )

      await CoreOutboxMessageModel
        .findOneAndUpdate({
          _id: message._id,
        }, {
          $set: {
            sentAt: new Date(),
          },
        }, { session })
    })
  }
}
