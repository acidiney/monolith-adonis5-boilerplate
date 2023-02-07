import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { RoleModel, UserModel } from 'app/infra/models'

export default class InsertRootUser extends BaseSeeder {
  public async run () {
    const role = await RoleModel.findBy('slug', 'root')

    if (!role) {
      throw new Error('Role "root" not found!')
    }

    await UserModel.firstOrCreate({
      firstName: 'Root',
      email: 'root@itgest.co.ao',
      slug: 'root-user',
      password: '12345678',
      statusId: 'active',
      roleId: role.id,
    })
  }
}
