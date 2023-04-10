import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { CorePermissionModel } from 'app/modules/@shared/framework/infra'

export default class InsertManagementDashboardPermission extends BaseSeeder {
  public async run (): Promise<void> {
    await CorePermissionModel.createMany([
      {
        id: 'admin-dashboard-management-view',
        display: 'permission.dashboard-managment.view.dashboards',
        description: 'permission.dashboard-managment.view.dashboard.description',
        group: 'permission.group.manage.dashboard',
        internal: false,
      },
      {
        id: 'admin-dashboard-management-create-dashboard',
        display: 'permission.dashboard-managment.create.dashboard',
        description: 'permission.dashboard-managment.create.dashboard.description',
        group: 'permission.group.manage.dashboard',
        internal: false,
      },
      {
        id: 'admin-dashboard-management-modify-dashboard',
        display: 'permission.dashboard-managment.modify.dashboard',
        description: 'permission.dashboard-managment.modify.dashboard.description',
        group: 'permission.group.manage.dashboard',
        internal: false,
      },
      {
        id: 'admin-dashboard-management-delete-dashboard',
        display: 'permission.dashboard-managment.delete.dashboard',
        description: 'permission.dashboard-managment.delete.dashboard.description',
        group: 'permission.group.manage.dashboard',
        internal: false,
      },
    ])
  }
}
