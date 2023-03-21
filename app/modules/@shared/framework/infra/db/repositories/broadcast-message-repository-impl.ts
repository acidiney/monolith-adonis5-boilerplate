import {BroadcastMessage, BroadcastMessageContract} from 'app/modules/@shared/domain/ports'
import {CoreOutboxMessageModel} from 'app/modules/@shared/framework/infra/db/models/core-outbox-message-model'

export class BroadcastMessageRepositoryImpl implements BroadcastMessageContract {
  public async publish (routeName: string, info: BroadcastMessage<any>): Promise<void> {
    await CoreOutboxMessageModel
      .insertOne({
        routingKey: routeName,
        type: info.type,
        payload: info.message,
        meta: info.meta,
        createdAt: new Date(),
        sentAt: null,
      })
  }
}
