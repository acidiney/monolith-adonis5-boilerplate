import Route from '@ioc:Adonis/Core/Route'
import {routeAdapter} from 'app/core/adapters/route-adapter'
import {
  makeListUsersFactory,
} from 'app/modules/admin/settings/acl/users-management/framework/main/factories/make-list-users-factory'

Route.group(() => {
  Route.get('/users', routeAdapter(makeListUsersFactory(), {
    operation: 'admin-acl-list-users',
    description: '[AdminRoute] List all users',
  }))
})
  .prefix('/admin/settings/acl')
  .middleware(['auth'])
