import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { CoreRoleModel } from 'app/modules/@shared/framework/infra/db/models'

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

    await CoreRoleModel.fetchOrCreateMany('slug', roles)
  }
}
