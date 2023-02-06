import { cuid } from '@ioc:Adonis/Core/Helpers'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, beforeSave, column, computed, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { RoleModel } from './role-model'
import { StatusModel } from './status-model-model'
import {slugify} from '@ioc:Adonis/Addons/LucidSlugify'

export class UserModel extends BaseModel {
  public static table = 'users'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['firstName', 'lastName'],
  })
  public slug: string

  @column()
  public email: string

  @column({ columnName: 'role_id' })
  public roleId: string

  @column()
  public forceChangePassword?: boolean

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column({ columnName: 'status_id' })
  public statusId: string

  @hasOne(() => StatusModel)
  public status: HasOne<typeof StatusModel>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => RoleModel)
  public role: HasOne<typeof RoleModel>

  @computed()
  public get fullName () {
    return `${this.firstName} ${this.lastName ?? ''}`
  }

  @beforeSave()
  public static async setId (user: UserModel) {
    user.id = user.id || cuid()
  }

  @beforeSave()
  public static async hashPassword (user: UserModel) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}

export default UserModel
