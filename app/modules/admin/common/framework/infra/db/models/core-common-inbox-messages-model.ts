import {BaseModel, beforeCreate, column} from '@ioc:Adonis/Lucid/Orm'
import {DateTime} from 'luxon'
import {cuid} from '@ioc:Adonis/Core/Helpers'

export class CoreCommonInboxMessagesModel extends BaseModel {
  public static table = 'core_common_inbox_messages'

  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public type: string

  @column()
  public payload: string

  @column()
  public outboxId: string

  @column()
  public complete: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async setId (commonInboxMessagesModel: CoreCommonInboxMessagesModel) {
    commonInboxMessagesModel.id = cuid()
  }
}
