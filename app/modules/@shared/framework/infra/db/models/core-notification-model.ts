import { randomUUID } from 'node:crypto'
import { CoreNotificationUserModel } from './core-notification-user-model'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasMany, hasMany, manyToMany, ManyToMany }
  from '@ioc:Adonis/Lucid/Orm'

import CoreUserModel from './core-user-model'

export class CoreNotificationModel extends BaseModel {
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

  @manyToMany(() => CoreUserModel, {
    pivotTable: 'core_notifications_users',
    localKey: 'id',
    pivotForeignKey: 'notification_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
  })
  public users: ManyToMany<typeof CoreUserModel>

  @hasMany(() => CoreNotificationUserModel, {
    localKey: 'id',
    foreignKey: 'notificationId',
  })
  public platforms: HasMany<typeof CoreNotificationUserModel>

  @beforeCreate()
  public static async setId (notification: CoreNotificationModel) {
    notification.id = randomUUID()
  }
}
