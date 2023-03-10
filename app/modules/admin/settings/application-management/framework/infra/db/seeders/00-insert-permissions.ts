import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { CorePermissionModel } from 'app/modules/@shared/framework/infra/db/models'

export default class InsertPermissionSeed extends BaseSeeder {
  public async run () {
    await CorePermissionModel
      .createMany([
        {
          id: 'admin-setup-application',
          group: 'permission.group.admin.setup.application',
          display: 'permission.setup.application',
          description: 'permission.setup.application.description',
          internal: true,
        },
      ])
  }
}
