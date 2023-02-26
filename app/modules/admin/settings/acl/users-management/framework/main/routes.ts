import Route from '@ioc:Adonis/Core/Route'
import {routeAdapter} from 'app/core/adapters/route-adapter'
import {
  makeListUsersFactory,
} from 'app/modules/admin/settings/acl/users-management/framework/main/factories/make-list-users-factory'
import {
  makeCreateUserFactory,
} from 'app/modules/admin/settings/acl/users-management/framework/main/factories/make-create-user-factory'
import { makeDeleteUserControllerFactory } from './factories/make-delete-user-controller-factory'
import { makeRedefineUserPasswordControllerFactory } from './factories/make-redefine-user-password-controller-factory'
import { makeUnblockUserControllerFactory } from './factories/make-unblock-user-controller-factory'
import { makeBlockUserControllerFactory } from './factories/make-block-user-controller-factory'
import { makeViewUserControllerFactory } from './factories/make-view-user-controller-factory'
import { makeUpdateUserControllerFactory } from './factories/make-update-user-controller-factory'

Route.group(() => {
  Route.get('/users', routeAdapter(makeListUsersFactory(), {
    operation: 'admin-acl-list-users',
    description: '[AdminRoute] List all users',
  }))
    .middleware('can:admin-acl-view-users')

  Route.get('/users/:username', routeAdapter(makeViewUserControllerFactory(), {
    operation: 'admin-acl-view-a-user-profile',
    description: '[AdminRoute] View a user profile',
  }))
    .middleware('can:admin-acl-view-users')

  Route.post('/user', routeAdapter(makeCreateUserFactory(), {
    operation: 'admin-acl-create-user',
    description: '[AdminRoute] Create a user',
  }, false))
    .middleware('can:admin-acl-create-user')

  Route.delete('/user', routeAdapter(makeDeleteUserControllerFactory(), {
    operation: 'admin-acl-delete-user',
    description: '[AdminRoute] Delete a user',
  }))
    .middleware(['can:admin-acl-delete-user'])

  Route.put('/user/redefine_password', routeAdapter(makeRedefineUserPasswordControllerFactory(), {
    operation: 'admin-acl-redefine-user',
    description: '[AdminRoute] Redefine password of a user',
  }))
    .middleware(['can:admin-acl-reset-user'])

  Route.put('/user/block', routeAdapter(makeBlockUserControllerFactory(), {
    operation: 'admin-acl-block-user',
    description: '[AdminRoute] Inactive a user',
  }))
    .middleware(['can:admin-acl-inactive-user'])

  Route.put('/user/unblock', routeAdapter(makeUnblockUserControllerFactory(), {
    operation: 'admin-acl-unblock-user',
    description: '[AdminRoute] Reactive a user',
  }))
    .middleware(['can:admin-acl-active-user'])

  Route.put('/user/:username', routeAdapter(makeUpdateUserControllerFactory(), {
    operation: 'admin-acl-update-a-user',
    description: '[AdminRoute] Update a user',
  }))
    .middleware('can:admin-acl-modify-user')
})
  .prefix('/account/admin/settings/acl')
  .middleware(['auth'])
