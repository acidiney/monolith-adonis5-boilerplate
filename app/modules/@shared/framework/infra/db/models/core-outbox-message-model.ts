import { randomUUID } from 'node:crypto'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { CoreBroadcastEnum } from 'app/modules/@shared/domain/types'
import { DateTime } from 'luxon'

export class CoreOutboxMessageModel extends BaseModel {
  public static table = 'core_outbox_messages'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public routingKey: string

  @column()
  public type: CoreBroadcastEnum

  @column()
  public payload: {
    [key: string]: any
  }

  @column()
  public metaUserId: string | null

  @column.dateTime()
  public sentAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async setId (outboxMessage: CoreOutboxMessageModel) {
    outboxMessage.id = outboxMessage.id || randomUUID()
  }
}
