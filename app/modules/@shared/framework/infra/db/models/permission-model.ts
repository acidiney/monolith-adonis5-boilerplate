import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export class PermissionModel extends BaseModel {
  public static table = 'permissions'

  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'name' })
  public display: string

  @column()
  public description: string

  @column()
  public group: string

  @column()
  public internal: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
