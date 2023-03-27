import Env from '@ioc:Adonis/Core/Env'
import Event from '@ioc:Adonis/Core/Event'

import {UniqueEntityID} from 'app/core/domain'
import {HashAdapter} from 'app/modules/auth/usecases'
import {CoreUserModel, CoreNotificationEventModel} from 'app/modules/@shared/framework/infra/db'
import {InboxProcessorContract} from 'app/modules/@shared/domain/ports'
import {EventType} from 'app/modules/@shared/domain/entities/notification-entity'
import { HashDriverAdapterImpl } from 'app/modules/auth/framework/infra/adapters'

export interface SaveNotificationProps {
  title: string
  message: string
  routePath: string
  event: string
  eventType: EventType
}

interface NotificationProps extends SaveNotificationProps{
  userId: UniqueEntityID,
}
export class SaveNotificationProcessor implements InboxProcessorContract<NotificationProps> {
  constructor (private readonly hashDriver: HashAdapter = new HashDriverAdapterImpl()) {
  }

  public async perform (input: NotificationProps): Promise<void> {
    await CoreNotificationEventModel.insertOne({
      userId: input.userId.toString(),
      title: input.title,
      message: input.message ?? '',
      routePath: input.routePath,
      hash: await this.hashDriver.generate(Env.get('APP_KEY'), input.userId.toString()),
      readAt: null,
      event: input.event,
      eventType: input.eventType,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const user = await CoreUserModel.findOrFail(input.userId.toString())

    void Event.emit('alert:realtime:broadcast:only', {
      eventName: input.event,
      title: input.title,
      message: input.message,
      users: [
        user.slug,
      ],
      type: input.eventType ?? 'info',
    })
  }
}
