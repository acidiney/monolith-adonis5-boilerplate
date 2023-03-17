import { Collection } from 'mongodb'

import { CoreInboxSchema } from '../db/models'
import {Message} from 'app/modules/@shared/domain/ports/message-bus'
import {
  RabbitmqMessageBusServiceImpl,
} from 'app/modules/@shared/framework/infra/services/rabbitmq-message-bus-service-impl'

export class CoreBaseConsumer {
  constructor (
    private readonly key: string,
    private readonly inboxModel: Collection<CoreInboxSchema>,
    private readonly messageBusService = RabbitmqMessageBusServiceImpl.getInstance()
  ) {
    this.messageBusService.consume(this.key, this.handle.bind(this))
  }

  private async handle (message: Message, ack: () => void) : Promise<void> {
    try {
      const { type, ...payloadObject } = message.payload

      const messageInbox = await this.inboxModel
        .findOne({ 'meta.outboxId': message.$meta.outboxId })

      if (messageInbox) {
        await ack()
        return
      }

      await this.inboxModel
        .insertOne({
          type: type,
          payload: payloadObject,
          meta: message.$meta,
          complete: false,
          createdAt: new Date(),
        })

      await ack()
    } catch (e) {
      throw e
    }
  }
}