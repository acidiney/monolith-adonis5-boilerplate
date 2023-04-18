import {BroadcastMessage, BroadcastMessageContract} from 'app/modules/@shared/domain/ports'
import {CoreOutboxMessageModel} from 'app/modules/@shared/framework/infra/db/models/core-outbox-message-model'

export class BroadcastMessageRepositoryImpl implements BroadcastMessageContract {
  public async publish (routeName: string, info: BroadcastMessage<any>): Promise<void> {
    await CoreOutboxMessageModel
      .create({
        routingKey: routeName,
        type: info.type,
        payload: info.message,
        metaUserId: info.meta.userId,
        sentAt: null,
      })
  }
}
