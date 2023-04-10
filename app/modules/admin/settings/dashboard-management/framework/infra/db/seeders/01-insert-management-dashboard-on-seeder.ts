import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { CoreMenuModel } from 'app/modules/@shared/framework/infra/db/models/core-menu-model'

export default class InsertManagementDashboardOnMenuSeeder extends BaseSeeder {
  public async run (): Promise<void> {
    await CoreMenuModel.create({
      permissionId: 'admin-dashboard-management-view',
      display: 'menu.admin.dashboard-management-view',
      slug: 'setting_dashboard_managment',
      belongsTo: 'group_settings',
      isGroup: false,
      icon: 'columns',
      order: 3,
      url: '/account/admin/settings/dashboard-management',
    })
  }
}
