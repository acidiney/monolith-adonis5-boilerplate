import { JobsOptions } from 'bullmq'

import { JobContract } from '@ioc:Rocketseat/Bull'
import {CoreOutboxMessageModel} from 'app/modules/@shared/framework/infra/db/models/core-outbox-message-model'
import Database from '@ioc:Adonis/Lucid/Database'
import {MessageBus} from 'app/modules/@shared/domain/ports/message-bus'
import {
  RabbitmqMessageBusServiceImpl,
} from 'app/modules/@shared/framework/infra/services/rabbitmq-message-bus-service-impl'

export default class OutboxProcessorJob implements JobContract {
  public key = OutboxProcessorJob.name

  constructor (
    private readonly messageBus: MessageBus = RabbitmqMessageBusServiceImpl.getInstance()
  ) {
  }

  public concurrency: number = 10

  public options: JobsOptions = {
    removeOnComplete: true,
  }

  public async handle () {
    const trx = await Database.transaction()

    try {
      const message = await CoreOutboxMessageModel
        .query({ client: trx })
        .andWhereNull('sentAt')
        .orderBy('created_at', 'desc')
        .first()

      if (!message) {
        await trx.commit()
        return
      }

      await CoreOutboxMessageModel
        .query({ client: trx })
        .where({ id: message.id })
        .update({
          sentAt: new Date(),
        })

      await trx.commit()
      this.messageBus.publish(message.type, JSON.stringify({ payload: message.payload, outboxId: message.id }))
    } catch (e) {
      await trx.rollback()
      throw e
    }
  }
}
