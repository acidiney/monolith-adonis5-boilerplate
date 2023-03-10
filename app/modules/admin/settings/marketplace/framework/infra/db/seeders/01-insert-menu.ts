import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { CoreMenuModel } from 'app/modules/@shared/framework/infra/db/models/core-menu-model'

export default class InsertMarketplaceMenuSeed extends BaseSeeder {
  public async run () {
    await CoreMenuModel
      .create({
        display: 'menu.admin.setting.setup.addons',
        slug: 'setup_addons',
        url: '/account/admin/settings/marketplace',
        icon: 'database',
        order: 4,
        permissionId: 'admin-view-marketplace',
        belongsTo: 'group_settings',
      })
  }
}
