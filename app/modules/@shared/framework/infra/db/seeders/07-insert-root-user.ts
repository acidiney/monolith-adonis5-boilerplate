import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import {CoreRoleModel, CoreUserModel} from 'app/modules/@shared/framework/infra/db/models'
import {StatusEnum} from 'app/modules/@shared/domain/types'

export default class InsertRootUser extends BaseSeeder {
  public async run () {
    const role = await CoreRoleModel.findBy('slug', 'root')

    if (!role) {
      throw new Error('Role "root" not found!')
    }

    const rootUser = new CoreUserModel()

    rootUser.firstName = 'Root'
    rootUser.lastName = 'User'
    rootUser.email = 'root@itgest.co.ao'
    rootUser.password = '12345678'
    rootUser.statusId = StatusEnum.ACTIVE
    rootUser.roleId = role.id
    rootUser.avatar = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    await rootUser.save()
  }
}
