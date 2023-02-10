import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { PermissionModel } from 'app/modules/@shared/framework/infra/db/models'

export default class InsertPermissionSeed extends BaseSeeder {
  public async run () {
    await PermissionModel
      .createMany([
        {
          display: 'setting.marketplace.view-marketplace-display',
          description: 'setting.marketplace.view-marketplace-description',
          id: 'admin-view-marketplace',
          group: 'menu.marketplace',
        },
        {
          display: 'setting.marketplace.install-addon-display',
          description: 'setting.marketplace.install-addon-description',
          id: 'admin-install-marketplace-addon',
          group: 'menu.marketplace',
        },
        {
          display: 'setting.marketplace.update-addon-display',
          description: 'setting.marketplace.update-addon-description',
          id: 'admin-update-marketplace-addon',
          group: 'menu.marketplace',
        },
        {
          display: 'setting.marketplace.remove-addon-display',
          description: 'setting.marketplace.remove-addon-description',
          id: 'admin-remove-marketplace-addon',
          group: 'menu.marketplace',
        },
      ])
  }
}
