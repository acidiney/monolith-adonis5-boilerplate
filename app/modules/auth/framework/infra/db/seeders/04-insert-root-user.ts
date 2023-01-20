import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserModel } from 'app/infra/models/user-model'

export default class InsertRootUser extends BaseSeeder {
  public async run () {
    await UserModel.firstOrCreate({
      firstName: 'Root',
      lastName: '',
      email: 'root@itgest.co.ao',
      password: '12345678',
      statusId: 'active',
    })
  }
}
