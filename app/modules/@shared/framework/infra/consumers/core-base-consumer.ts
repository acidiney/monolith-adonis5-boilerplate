import { Collection } from 'mongodb'

import { CoreInboxSchema } from '../db/models'
import {Message} from 'app/modules/@shared/domain/ports/message-bus'
import {
  RabbitmqMessageBusServiceImpl,
} from 'app/modules/@shared/framework/infra/services/rabbitmq-message-bus-service-impl'

export class CoreBaseConsumer {
  constructor (
    private readonly key: string,
    private readonly inboxModel: Collection<CoreInboxSchema<any>>,
    private readonly messageBusService = RabbitmqMessageBusServiceImpl.getInstance()
  ) {
    this.messageBusService.consume(this.key, this.handle.bind(this))
  }

  private async handle (message: Message, ack: () => void) : Promise<void> {
    try {
      const messageInbox = await this.inboxModel
        .findOne({ 'meta.outboxId': message.$meta.outboxId })

      if (messageInbox) {
        await ack()
        return
      }

      await this.inboxModel
        .insertOne({
          type: message.type,
          payload: message.payload,
          meta: message.$meta,
          complete: false,
          createdAt: new Date(),
          status: 'PENDING',
        })

      await ack()
    } catch (e) {
      throw e
    }
  }
}
