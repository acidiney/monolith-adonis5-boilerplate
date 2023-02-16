import { cuid } from '@ioc:Adonis/Core/Helpers'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, BelongsTo, beforeSave, belongsTo, column, computed, HasOne, hasOne, ManyToMany, manyToMany }
  from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { RoleModel } from './role-model'
import { StatusModel } from './status-model-model'
import {slugify} from '@ioc:Adonis/Addons/LucidSlugify'
import {StatusType} from 'app/modules/@shared/domain/types'
import { NotificationModel } from './notification-model'

export class UserModel extends BaseModel {
  public static table = 'core_users'
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

  @column({ columnName: 'avatar_url' })
  public avatar: string

  @column({ columnName: 'role_id' })
  public roleId: string

  @column()
  public forceChangePassword?: boolean

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column({ columnName: 'status_id' })
  public statusId: StatusType

  @hasOne(() => StatusModel)
  public status: HasOne<typeof StatusModel>

  @column.dateTime({ columnName: 'last_login' })
  public lastLoginAt?: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => RoleModel, {
    foreignKey: 'roleId',
  })
  public role: BelongsTo<typeof RoleModel>

  @manyToMany(() => NotificationModel, {
    pivotTable: 'core_notifications_users',
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'notification_id',
  })
  public notifications: ManyToMany<typeof NotificationModel>

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
