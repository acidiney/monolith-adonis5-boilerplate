import { cuid } from '@ioc:Adonis/Core/Helpers'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export class PermissionModel extends BaseModel {
  public static table = 'permissions'

  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'name' })
  public display: string

  @column()
  public slug: string

  @column()
  public description: string

  @column()
  public groupPermissions: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async setId (permission: PermissionModel) {
    permission.id = cuid()
  }
}
