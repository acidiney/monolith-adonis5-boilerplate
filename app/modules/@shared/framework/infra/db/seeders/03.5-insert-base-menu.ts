import { CoreMenuModel } from 'app/modules/@shared/framework/infra/db/models/core-menu-model'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class MenuSeedSeeder extends BaseSeeder {
  public async run () {
    await CoreMenuModel.createMany([
      {
        display: 'menu.main.dashboard',
        slug: 'main_dashboard',
        url: '/account/dashboard',
        icon: 'home',
        order: 1,
        belongsTo: 'group_main',
      },
      {
        display: 'menu.acl.view-users',
        slug: 'setting_acl_view_users',
        url: '/account/admin/settings/acl/users',
        icon: 'users',
        order: 1,
        permissionId: 'admin-acl-view-users',
        belongsTo: 'group_settings',
      },
      {
        display: 'menu.acl.view-roles',
        slug: 'setting_acl_view_roles',
        url: '/account/admin/settings/acl/roles',
        icon: 'user',
        order: 2,
        permissionId: 'admin-acl-view-roles',
        belongsTo: 'group_settings',
      },
    ])
  }
}
