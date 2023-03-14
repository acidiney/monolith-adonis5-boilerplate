import {
  RabbitmqMessageBusServiceImpl,
} from 'app/modules/@shared/framework/infra/services/rabbitmq-message-bus-service-impl'
import {
  CoreCommonInboxMessagesModel,
} from 'app/modules/admin/common/framework/infra/db/models/core-common-inbox-messages-model'
import {Message} from 'app/modules/@shared/domain/ports/message-bus'

class CoreAdminCommonConsumer {
  public key = 'core.admin.common'

  constructor (
    private readonly messageBusService = RabbitmqMessageBusServiceImpl.getInstance()
  ) {
    void this.messageBusService.consume(this.key, this.handle)
  }

  public async handle (message: Message, ack: () => void) : Promise<void> {
    try {
      const { type, ...payloadObject } = message.payload

      const messageInbox = await CoreCommonInboxMessagesModel
        .findOne({ outboxId: message.$meta.outboxId })

      if (!messageInbox) {
        await ack()
        return
      }

      await CoreCommonInboxMessagesModel
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

export default new CoreAdminCommonConsumer()
