import {ClearMessageContract} from 'app/modules/@shared/domain/ports'
import {CoreOutboxMessageModel} from 'app/modules/@shared/framework/infra/db/models/core-outbox-message-model'

export class ClearMessageRepositoryImpl implements ClearMessageContract {
  public async clear (messageId: string): Promise<void> {
    await CoreOutboxMessageModel
      .query()
      .where('id', messageId)
      .delete()
  }
}
