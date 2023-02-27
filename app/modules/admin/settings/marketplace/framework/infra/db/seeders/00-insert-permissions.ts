import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { PermissionModel } from 'app/modules/@shared/framework/infra/db/models'

export default class InsertPermissionSeed extends BaseSeeder {
  public async run () {
    await PermissionModel
      .createMany([
        {
          display: 'permission.setting.marketplace.view-marketplace-display',
          description: 'permission.setting.marketplace.view-marketplace-description',
          id: 'admin-view-marketplace',
          group: 'permission.menu.marketplace',
          internal: true,
        },
        {
          display: 'permission.setting.marketplace.install-addon-display',
          description: 'permission.setting.marketplace.install-addon-description',
          id: 'admin-install-marketplace-addon',
          group: 'permission.menu.marketplace',
          internal: true,
        },
        {
          display: 'permission.setting.marketplace.update-addon-display',
          description: 'permission.setting.marketplace.update-addon-description',
          id: 'admin-update-marketplace-addon',
          group: 'permission.menu.marketplace',
          internal: true,
        },
        {
          display: 'permission.setting.marketplace.remove-addon-display',
          description: 'permission.setting.marketplace.remove-addon-description',
          id: 'admin-remove-marketplace-addon',
          group: 'permission.menu.marketplace',
          internal: true,
        },
      ])
  }
}
