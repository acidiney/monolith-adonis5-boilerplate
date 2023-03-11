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

  public options: JobsOptions = {
    removeOnComplete: true,
  }

  public async handle () {
    const trx = await Database.transaction()

    try {
      const messages = await CoreOutboxMessageModel
        .query({ client: trx })
        .where('sent', false)
        .andWhereNull('sentAt')
        .limit(100)

      for (const message of messages) {
        this.messageBus.publish(message.route, JSON.stringify(message.payload))
        await CoreOutboxMessageModel
          .query({ client: trx })
          .where({ id: message.id })
          .update({
            sent: true,
            sentAt: new Date(),
          })
      }

      await trx.commit()
    } catch (e) {
      await trx.rollback()
      throw e
    }
  }
}
