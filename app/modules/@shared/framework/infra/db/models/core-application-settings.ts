import { randomUUID } from 'node:crypto'
import { DateTime } from 'luxon'

import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

export class CoreApplicationSettings extends BaseModel {
  public static table = 'core_application_settings'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public appName: string

  @column()
  public appDesc: string

  @column()
  public appColorPrimary: string

  @column()
  public appColorSecondary: string

  @column()
  public appBackgroundPrimaryColor: string

  @column()
  public appBackgroundSecondaryColor: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async setId (applicationSettings: CoreApplicationSettings) {
    applicationSettings.id = applicationSettings.id || randomUUID()
  }
}
