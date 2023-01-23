import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { RoleModel } from 'app/infra/models'

export default class InsertBaseRolesSeed extends BaseSeeder {
  public async run () {
    const roles = [
      {
        name: 'shared.roles.root',
        description: 'shared.roles.root.description',
        slug: 'root',
        system: true,
      },
      {
        name: 'shared.roles.admin',
        description: 'shared.roles.admin.description',
        slug: 'admin',
        system: true,
      },
    ]

    await RoleModel.fetchOrCreateMany('slug', roles)
  }
}
