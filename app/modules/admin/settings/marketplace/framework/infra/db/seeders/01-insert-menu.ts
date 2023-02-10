import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { MenuModel } from 'app/modules/shared/framework/infra/models/menu-model'

export default class InsertMarketplaceMenuSeed extends BaseSeeder {
  public async run () {
    await MenuModel
      .create({
        display: 'menu.admin.setting.setup.addons',
        slug: 'setup_addons',
        url: '/admin/settings/marketplace',
        icon: 'database',
        order: 4,
        permissionId: 'admin-view-marketplace',
        belongsTo: 'group_settings',
      })
  }
}
