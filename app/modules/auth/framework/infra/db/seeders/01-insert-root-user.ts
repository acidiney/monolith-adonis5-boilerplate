import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { RoleModel, UserModel } from 'app/infra/models'

export default class InsertRootUser extends BaseSeeder {
  public async run () {
    const role = await RoleModel.findBy('slug', 'root')

    if (!role) {
      throw new Error('Role "root" not found!')
    }

    const rootUser = new UserModel()

    rootUser.firstName = 'Root'
    rootUser.lastName = 'User'
    rootUser.email = 'root@itgest.co.ao'
    rootUser.password = '12345678'
    rootUser.statusId = 'active'
    rootUser.roleId = role.id
    await rootUser.save()
  }
}
