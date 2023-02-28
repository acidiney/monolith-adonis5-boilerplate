import { cuid } from '@ioc:Adonis/Core/Helpers'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import {BaseModel, beforeSave, column, computed, manyToMany, ManyToMany, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { UserModel } from './user-model'
import { PermissionModel } from './permission-model'
import { softDelete } from '../adapters/soft-delete-adapter'

export class RoleModel extends BaseModel {
  public static table = 'core_roles'
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

  @hasMany(() => UserModel, {
    foreignKey: 'roleId',
  })
  public users: HasMany<typeof UserModel>

  @manyToMany(() => PermissionModel, {
    pivotTable: 'core_role_permissions',
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

  public async softDelete () {
    await softDelete(this)
  }
}
