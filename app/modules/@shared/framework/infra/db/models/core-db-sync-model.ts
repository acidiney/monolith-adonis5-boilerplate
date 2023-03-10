import { DateTime } from 'luxon'

import { cuid } from '@ioc:Adonis/Core/Helpers'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

export class CoreDbSyncModel extends BaseModel {
  public static table = 'core_internal_db_sync'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public seedName: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async setId (dbSyncModel: CoreDbSyncModel) {
    dbSyncModel.id = dbSyncModel.id || cuid()
  }
}
