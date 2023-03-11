import {BaseModel, beforeCreate, column} from '@ioc:Adonis/Lucid/Orm'
import {DateTime} from 'luxon'
import {cuid} from '@ioc:Adonis/Core/Helpers'

export class CoreOutboxMessageModel extends BaseModel {
  public static table = 'core_outbox_messages'

  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public type: string

  @column()
  public payload: string

  @column()
  public sent: boolean

  @column()
  public sentAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async setId (outboxMessageModel: CoreOutboxMessageModel) {
    outboxMessageModel.id = cuid()
  }
}
