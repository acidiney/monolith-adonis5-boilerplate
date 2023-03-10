import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { CoreRoleModel, CoreRolePermissionModel } from 'app/modules/@shared/framework/infra/db/models'

export default class AssociateRoleWithPermissionSeed extends BaseSeeder {
  private async associateAdminPermissions () {
    const role = await CoreRoleModel.findBy('slug', 'admin')

    if (!role) {
      throw new Error('Role "admin" not found!')
    }

    await CoreRolePermissionModel.createMany([
      {
        roleId: role.id,
        permissionId: 'admin-acl-view-users',
      },
      {
        roleId: role.id,
        permissionId: 'admin-acl-create-user',
      },
      {
        roleId: role.id,
        permissionId: 'admin-acl-inactive-user',
      },
      {
        roleId: role.id,
        permissionId: 'admin-acl-active-user',
      },
      {
        roleId: role.id,
        permissionId: 'admin-acl-reset-user',
      },
      {
        roleId: role.id,
        permissionId: 'admin-acl-modify-user',
      },
      {
        roleId: role.id,
        permissionId: 'admin-acl-delete-user',
      },
      {
        roleId: role.id,
        permissionId: 'admin-acl-view-roles',
      },
      {
        roleId: role.id,
        permissionId: 'admin-acl-modify-role',
      },
      {
        roleId: role.id,
        permissionId: 'admin-acl-create-role',
      },
      {
        roleId: role.id,
        permissionId: 'admin-acl-delete-role',
      },
    ])
  }

  public async run () {
    await this.associateAdminPermissions()
  }
}
