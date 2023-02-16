import { DateTime } from 'luxon'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import { BaseModel, beforeCreate, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'

import UserModel from './user-model'

export class NotificationModel extends BaseModel {
  public static table = 'core_notifications'

  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'notification_key' })
  public notificationKey: string

  @column.dateTime()
  public deletedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => UserModel, {
    pivotTable: 'core_notifications_users',
    localKey: 'id',
    pivotForeignKey: 'notification_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
  })
  public users: ManyToMany<typeof UserModel>

  @beforeCreate()
  public static async setId (notification: NotificationModel) {
    notification.id = cuid()
  }
}
