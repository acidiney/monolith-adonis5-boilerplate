
import { DateTime } from 'luxon'
import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export class AppSettingModel extends BaseModel {
  public static table = 'core_application_settings'

  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'app_name' })
  public appName: string

  @column({ columnName: 'app_desc' })
  public appDesc: string

  @column({ columnName: 'app_color_primary' })
  public appColorPrimary: string

  @column({ columnName: 'app_color_secondary' })
  public appColorSecondary: string

  @column({ columnName: 'app_background-primary_color' })
  public appBackgroundPrimaryColor: string

  @column({ columnName: 'app_background-secondary_color' })
  public appBackgroundSecondaryColor: string

  @column.dateTime()
  public deletedAt?: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
