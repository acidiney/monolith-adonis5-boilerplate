import Route from '@ioc:Adonis/Core/Route'
import {routeAdapter} from 'app/core/adapters/route-adapter'
import {
  makeListUsersFactory,
} from 'app/modules/admin/settings/acl/users-management/framework/main/factories/make-list-users-factory'
import {
  makeCreateUserFactory,
} from 'app/modules/admin/settings/acl/users-management/framework/main/factories/make-create-user-factory'

Route.group(() => {
  Route.get('/users', routeAdapter(makeListUsersFactory(), {
    operation: 'admin-acl-list-users',
    description: '[AdminRoute] List all users',
  }))
    .middleware('can:admin-acl-view-users')

  Route.post('/user', routeAdapter(makeCreateUserFactory(), {
    operation: 'admin-acl-create-user',
    description: '[AdminRoute] Create a user',
  }))
    .middleware('can:admin-acl-create-user')
})
  .prefix('/admin/settings/acl')
  .middleware(['auth'])
