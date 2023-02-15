import { cuid } from '@ioc:Adonis/Core/Helpers'
import { BaseModel, beforeCreate, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import { PermissionModel } from './permission-model'
import { RoleModel } from './role-model'

export class RolePermissionModel extends BaseModel {
  public static table = 'core_role_permissions'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'permission_id' })
  public permissionId: string

  @column({ columnName: 'role_id' })
  public roleId: string

  @hasOne(() => PermissionModel)
  public permissions: HasOne<typeof PermissionModel>

  @hasOne(() => RoleModel)
  public roles: HasOne<typeof RoleModel>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async setId (rolePermission: RolePermissionModel) {
    rolePermission.id = rolePermission.id || cuid()
  }
}
