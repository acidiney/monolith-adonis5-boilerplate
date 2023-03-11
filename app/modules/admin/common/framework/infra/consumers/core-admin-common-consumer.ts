import {
  RabbitmqMessageBusServiceImpl,
} from 'app/modules/@shared/framework/infra/services/rabbitmq-message-bus-service-impl'
import Database from '@ioc:Adonis/Lucid/Database'
import {
  CoreCommonInboxMessagesModel,
} from 'app/modules/admin/common/framework/infra/db/models/core-common-inbox-messages-model'

class CoreAdminCommonConsumer {
  public key = 'core.admin.common'

  constructor (
    private readonly messageBusService = RabbitmqMessageBusServiceImpl.getInstance()
  ) {
    void this.messageBusService.consume(this.key, this.handle)
  }

  public async handle (message: string, ack: () => void) : Promise<void> {
    const trx = await Database.transaction()

    try {
      const messageObject = JSON.parse(message) as {
        payload: {
          userId: string[],
          type: string
        }
        outboxId: string
      }

      const { type, ...payloadObject } = messageObject.payload

      await CoreCommonInboxMessagesModel
        .firstOrCreate({ outboxId: messageObject.outboxId }, {
          type: type,
          payload: JSON.stringify(payloadObject),
        })

      await trx.commit()

      await ack()
    } catch (e) {
      await trx.rollback()
      throw e
    }
  }
}

export default new CoreAdminCommonConsumer()
