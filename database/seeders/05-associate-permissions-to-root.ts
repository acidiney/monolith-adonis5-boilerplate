import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { PermissionModel, RoleModel, RolePermissionModel } from 'app/modules/shared/framework/infra/models'

export default class AssociateRoleWithPermissionSeed extends BaseSeeder {
  private async associateRootPermissions () {
    const role = await RoleModel.findBy('slug', 'root')

    if (!role) {
      throw new Error('Role "root" not found!')
    }

    await RolePermissionModel
      .query()
      .where({ roleId: role.id })
      .delete()

    const permissions = await PermissionModel.all()

    await RolePermissionModel.createMany(
      permissions.map(p => ({
        permissionId: p.id,
        roleId: role.id,
      }))
    )
  }

  public async run () {
    await this.associateRootPermissions()
  }
}
