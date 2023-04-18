import { randomUUID } from 'node:crypto'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export class CoreInboxMessagesModel extends BaseModel {
  public static table = 'core_inbox_messages'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public responsable: string

  @column()
  public type: string

  @column()
  public payload: any

  @column()
  public metaUserId: string | null

  @column()
  public metaOutboxId: string

  @column()
  public status: 'PENDING' | 'STARTED'

  @column()
  public complete: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async setId (inboxMessage: CoreInboxMessagesModel) {
    inboxMessage.id = inboxMessage.id || randomUUID()
  }
}
