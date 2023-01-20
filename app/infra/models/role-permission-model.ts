import { cuid } from '@ioc:Adonis/Core/Helpers'
import { BaseModel, beforeCreate, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import { PermissionModel } from './permission-model'
import { RoleModel } from './role-model'

export class RolePermissionModel extends BaseModel {
  public static table = 'role_permissions'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @hasOne(() => PermissionModel)
  @column({ columnName: 'permission_id' })
  public permission: HasOne<typeof PermissionModel>

  @hasOne(() => RoleModel)
  @column({ columnName: 'role_id' })
  public role: HasOne<typeof RoleModel>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async setId(rolePermission: RolePermissionModel) {
    rolePermission.id = rolePermission.id || cuid()
  }
}
