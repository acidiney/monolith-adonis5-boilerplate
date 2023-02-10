import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { MenuModel } from 'app/modules/shared/framework/infra/db/models/menu-model'

export default class InsertMarketplaceMenuSeed extends BaseSeeder {
  public async run () {
    await MenuModel
      .create({
        display: 'menu.admin.setting.setup.application',
        slug: 'setup_application',
        url: '/admin/settings/application',
        icon: 'table',
        order: 3,
        permissionId: 'admin-setup-application',
        belongsTo: 'group_settings',
      })
  }
}
