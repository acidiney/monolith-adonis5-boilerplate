import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { PermissionModel } from 'app/infra/models'

export default class InsertBasePermissionsSeed extends BaseSeeder {
  public async run () {
    await PermissionModel.fetchOrCreateMany('id', [
      {
        id: 'view-dashboard',
        group: 'permission.group.common.main',
        display: 'permission.common.view.dashboard',
        description: 'permission.common.view.dashboard.description',
      },
      {
        id: 'admin-acl-view-users',
        group: 'permission.group.acl.manage.users',
        display: 'permission.acl.view.users',
        description: 'permission.acl.view.users.description',
      },
      {
        id: 'admin-acl-create-user',
        group: 'permission.group.acl.manage.users',
        display: 'permission.acl.create.user',
        description: 'permission.acl.create.user.description',
      },
      {
        id: 'admin-acl-inactive-user',
        group: 'permission.group.acl.manage.users',
        display: 'permission.acl.inactive.user',
        description: 'permission.acl.inactive.user.description',
      },
      {
        id: 'admin-acl-active-user',
        group: 'permission.group.acl.manage.users',
        display: 'permission.acl.active.user',
        description: 'permission.acl.active.user.description',
      },
      {
        id: 'admin-acl-reset-user',
        group: 'permission.group.acl.manage.users',
        display: 'permission.acl.reset.user',
        description: 'permission.acl.reset.user.description',
      },
      {
        id: 'admin-acl-modify-user',
        group: 'permission.group.acl.manage.users',
        display: 'permission.acl.modify.user',
        description: 'permission.acl.modify.user.description',
      },
      {
        id: 'admin-acl-delete-user',
        group: 'permission.group.acl.manage.users',
        display: 'permission.acl.delete.user',
        description: 'permission.acl.delete.user.description',
      },
      {
        id: 'admin-acl-view-roles',
        group: 'permission.group.acl.manage.roles',
        display: 'permission.acl.view.roles',
        description: 'permission.acl.view.roles.description',
      },
      {
        id: 'admin-acl-modify-role',
        group: 'permission.group.acl.manage.roles',
        display: 'permission.acl.modify.role',
        description: 'permission.acl.modify.role.description',
      },
      {
        id: 'admin-acl-create-role',
        group: 'permission.group.acl.manage.roles',
        display: 'permission.acl.create.role',
        description: 'permission.acl.create.role.description',
      },
      {
        id: 'admin-acl-delete-role',
        group: 'permission.group.acl.manage.roles',
        display: 'permission.acl.delete.role',
        description: 'permission.acl.delete.role.description',
      },
    ])
  }
}
