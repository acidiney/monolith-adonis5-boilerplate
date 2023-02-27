import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { NotificationModel } from '../models/notification-model'

export default class InsertBaseNotifications extends BaseSeeder {
  public async run () {
    await NotificationModel.createMany([
      {
        notificationKey: 'notifications.core.auth.login',
      },
      {
        notificationKey: 'notifications.core.user.updated',
      },
      {
        notificationKey: 'notifications.core.user.password_changed',
      },
      {
        notificationKey: 'notifications.core.auth.sent_reset_password_link',
      },
      {
        notificationKey: 'notifications.core.user.deactived',
      },
      {
        notificationKey: 'notifications.core.user.reactivated',
      },
    ])
  }
}
