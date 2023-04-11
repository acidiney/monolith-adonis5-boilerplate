import { randomUUID } from 'node:crypto'
import { BaseModel, beforeCreate, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import { CorePermissionModel } from './core-permission-model'
import { CoreRoleModel } from './core-role-model'

export class CoreRolePermissionModel extends BaseModel {
  public static table = 'core_role_permissions'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'permission_id' })
  public permissionId: string

  @column({ columnName: 'role_id' })
  public roleId: string

  @hasOne(() => CorePermissionModel)
  public permissions: HasOne<typeof CorePermissionModel>

  @hasOne(() => CoreRoleModel)
  public roles: HasOne<typeof CoreRoleModel>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async setId (rolePermission: CoreRolePermissionModel) {
    rolePermission.id = rolePermission.id || randomUUID()
  }
}
