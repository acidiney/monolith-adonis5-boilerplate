import Env from '@ioc:Adonis/Core/Env'
import I18n from '@ioc:Adonis/Addons/I18n'
import Event from '@ioc:Adonis/Core/Event'

import {UniqueEntityID} from 'app/core/domain'
import {HashAdapter} from 'app/modules/auth/usecases'
import { SendEmailProcessor } from './send-email-processor'
import {InboxProcessorContract} from 'app/modules/@shared/domain/ports'
import { HashDriverAdapterImpl } from 'app/modules/auth/framework/infra/adapters'
import {EventType} from 'app/modules/@shared/domain/entities/notification-entity'
import {CoreUserModel, CoreNotificationEventModel} from 'app/modules/@shared/framework/infra/db'

export interface SaveNotificationProps {
  title: string
  message: string
  content: string
  routePath: string
  event: string
  eventType: EventType,
  notificationType: string
}

interface NotificationProps extends SaveNotificationProps{
  userId: UniqueEntityID,
}
export class SaveNotificationProcessor implements InboxProcessorContract<NotificationProps> {
  constructor (
    private readonly hashDriver: HashAdapter = new HashDriverAdapterImpl(),
    private readonly sendEmailProcessor: SendEmailProcessor = new SendEmailProcessor()
  ) {
  }

  private readonly contract = {
    email: this.notifyViaEmail.bind(this),
    platform: this.notifyViaPlatform.bind(this),
  }

  private async notifyViaPlatform (input: NotificationProps, user: CoreUserModel): Promise<void> {
    await CoreNotificationEventModel.insertOne({
      userId: user.id,
      title: input.title,
      message: input.message ?? '',
      routePath: input.routePath,
      hash: await this.hashDriver.generate(Env.get('APP_KEY'), user.id),
      readAt: null,
      event: input.event,
      eventType: input.eventType,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

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

  private async notifyViaEmail (input: NotificationProps, user: CoreUserModel): Promise<void> {
    const i18n = I18n.locale(user.defaultLang)

    void this.sendEmailProcessor.perform({
      subject: i18n.formatMessage(input.title),
      to: user.email,
      content: input.content,
      lang: user.defaultLang,
    })
  }

  public async perform (input: NotificationProps): Promise<void> {
    const user = await CoreUserModel.findOrFail(input.userId)

    await user.load('notifications')

    const notifyViaPlatform = await user.notifications.find((n) => n.notificationKey === input.notificationType)

    if (!notifyViaPlatform) {
      return
    }

    for(const { type } of notifyViaPlatform.platforms) {
      const contract = this.contract[type]

      if (contract) {
        await contract(input, user)
      }
    }
  }
}
