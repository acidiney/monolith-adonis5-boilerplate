import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { CorePermissionModel, CoreRoleModel, CoreRolePermissionModel }
  from 'app/modules/@shared/framework/infra/db/models'

export default class AssociateRoleWithPermissionSeed extends BaseSeeder {
  private async associateRootPermissions () {
    const role = await CoreRoleModel.findBy('slug', 'root')

    if (!role) {
      throw new Error('Role "root" not found!')
    }

    await CoreRolePermissionModel
      .query()
      .where({ roleId: role.id })
      .delete()

    const permissions = await CorePermissionModel.all()

    await CoreRolePermissionModel.createMany(
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
