import { cuid } from '@ioc:Adonis/Core/Helpers'
import { BaseModel, beforeCreate, beforeFetch, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export class MenuModel extends BaseModel {
  public static table = 'menus'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'name' })
  public display: string

  @column({ columnName: 'slug' })
  public slug: string

  @column()
  public url: string

  @column()
  public icon?: string

  @column()
  public order: number

  @column()
  public groupName?: string

  @column()
  public isGroup?: boolean

  @column()
  public belongsTo: string | null

  @column({ columnName: 'permission_id' })
  public permissionId?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async assignNanoId (menu: MenuModel) {
    menu.id = menu.id || cuid()
  }

  @beforeFetch()
  public static applyOrderBy (query) {
    query.orderBy('order', 'asc')
  }
}
