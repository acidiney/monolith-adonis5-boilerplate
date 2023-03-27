import { cuid } from '@ioc:Adonis/Core/Helpers'
import { BaseModel, beforeCreate, column} from '@ioc:Adonis/Lucid/Orm'

export class CoreNotificationUserModel extends BaseModel {
  public static table = 'core_notifications_users'

  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'type' })
  public type: 'plataform' | 'email'

  @column()
  public userId: string

  @column()
  public notificationId: string

  @beforeCreate()
  public static async setId (notification: CoreNotificationUserModel) {
    notification.id = cuid()
  }
}
