import { cuid } from '@ioc:Adonis/Core/Helpers'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import {BaseModel, beforeSave, column, computed, manyToMany, ManyToMany, hasOne, HasOne} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { UserModel } from './user-model'
import { PermissionModel } from './permission-model'

export class RoleModel extends BaseModel {
  public static table = 'roles'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['name'],
  })
  public slug?: string

  @column()
  public description: string

  @column({ columnName: 'system' })
  public isSystem?: boolean

  @column({ columnName: 'created_by_user' })
  public createdByUser?: string

  @hasOne(() => UserModel, {
    foreignKey: 'roleId',
  })
  public user: HasOne<typeof UserModel>

  @manyToMany(() => PermissionModel, {
    pivotTable: 'role_permissions',
    localKey: 'id',
    pivotForeignKey: 'role_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'permission_id',
  })
  public permissions: ManyToMany<typeof PermissionModel>

  @column.dateTime()
  public deletedAt?: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async setId (role: RoleModel) {
    role.id = role.id || cuid()
  }

  @computed()
  public get isRoot (): boolean {
    return this.slug === 'root'
  }
}
