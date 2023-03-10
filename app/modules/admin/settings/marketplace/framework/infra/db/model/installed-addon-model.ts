import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { CoreUserModel } from 'app/modules/@shared/framework/infra/db/models'
import { DateTime } from 'luxon'

export class InstalledAddonModel extends BaseModel {
  public static table = 'core_system_installed_addons'

  @column({ isPrimary: true })
  public id: number

  @column()
  public addonName: string

  @column()
  public version: number

  @column()
  public userId: string

  @hasOne(() => CoreUserModel)
  public user: HasOne<typeof CoreUserModel>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
