import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { UserModel } from 'app/modules/shared/framework/infra/db/models'
import { DateTime } from 'luxon'

export class InstalledAddonModel extends BaseModel {
  public static table = 'system_installed_addons'

  @column({ isPrimary: true })
  public id: number

  @column()
  public addonName: string

  @column()
  public version: number

  @column()
  public userId: string

  @hasOne(() => UserModel)
  public user: HasOne<typeof UserModel>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
