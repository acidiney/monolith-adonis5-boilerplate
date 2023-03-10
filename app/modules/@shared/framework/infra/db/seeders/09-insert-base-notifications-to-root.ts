import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UniqueEntityID } from 'app/core/domain'
import { CoreUserModel } from '../models'
import { CoreNotificationModel } from '../models/core-notification-model'

export default class InsertBaseNotifications extends BaseSeeder {
  public async run () {
    const notifications = (await CoreNotificationModel.all()).map(n => n.id)
    const rootUser = await CoreUserModel.findBy('email', 'root@itgest.co.ao')

    if (!rootUser) {
      throw new Error('"RootUser" doesn\'t exists!')
    }

    const notificationRootUser = notifications.map((n) => ({
      id: new UniqueEntityID().toString(),
      notification_id: n,
      user_id: rootUser.id,
      type: 'platform',
    }))

    await Database
      .insertQuery()
      .table('core_notifications_users')
      .insert(notificationRootUser)
  }
}
